import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma'; // Import shared Prisma client

// const prisma = new PrismaClient(); // Remove local instance

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password, name } = req.body;

  // Basic validation
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Missing required fields (email, password, name)' });
  }
  if (password.length < 6) {
     return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    // Check if user already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user to the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword, // Store the hashed password
      },
    });

    console.log('User Created:', { id: newUser.id, email: newUser.email });

    // Respond successfully (don't send back the password hash)
    res.status(201).json({ message: 'User created successfully', userId: newUser.id });

  } catch (error) {
    console.error('Signup Error:', error);
    // Check for Prisma specific errors, like unique constraint violation
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
       return res.status(409).json({ message: 'User already exists with this email' });
    }
    res.status(500).json({ message: 'Internal Server Error during signup' });
  }
  // No finally block needed as the shared instance manages connection
}
