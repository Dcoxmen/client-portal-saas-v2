import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Replace with your desired user details
  const email = 'test@example.com';
  const password = 'P@$$wOrd';
  const name = 'Test User';

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    console.log('Seeded User:', { id: newUser.id, email: newUser.email });
    res.status(200).json({ message: 'Database seeded successfully!', userId: newUser.id });

  } catch (error) {
    console.error('Seeding Error:', error);
    console.error('Seeding Error (details):', error.message, error.stack); // Log more details
    res.status(500).json({ message: 'Error seeding the database' });
  } finally {
    await prisma.$disconnect();
  }
}
