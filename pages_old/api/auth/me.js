import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import prisma from '@/lib/prisma'; // Import shared Prisma client

// const prisma = new PrismaClient(); // Remove local instance
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Parse cookies from the request headers
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated: No token' });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Token is valid, now check if user exists in DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { // Select only necessary fields, exclude password
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      // User might have been deleted after token was issued
      return res.status(401).json({ message: 'Not authenticated: User not found' });
    }

    // User exists and token is valid, return user data
    res.status(200).json({ user });

  } catch (error) {
    // Handle errors like invalid token, expired token, etc.
    console.error('Auth Check Error:', error.message);
    // Clear potentially invalid cookie
    res.setHeader('Set-Cookie', 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.status(401).json({ message: 'Not authenticated: Invalid or expired token' });
  }
  // No finally block needed as the shared instance manages connection
}
