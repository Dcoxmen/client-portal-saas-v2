import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import prisma from '@/lib/prisma'; // Import shared Prisma client

// const prisma = new PrismaClient(); // Remove local instance

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set!');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields (email, password)' });
  }

  try {
    // Find user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); // User not found
    }

    // Compare password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Incorrect password
    }

    // Passwords match - Generate JWT
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      // Add other relevant non-sensitive user info if needed
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
    });

    // Set token in an HTTP-only cookie
    const cookieOptions = {
      httpOnly: true, // Prevents client-side JS access
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      sameSite: 'strict', // Mitigates CSRF attacks
      maxAge: 60 * 60, // 1 hour in seconds (matches token expiry)
      path: '/', // Cookie available across the site
    };

    res.setHeader('Set-Cookie', serialize('authToken', token, cookieOptions));

    // Respond with success and user info (excluding password)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error during login' });
  }
  // No finally block needed as the shared instance manages connection
}
