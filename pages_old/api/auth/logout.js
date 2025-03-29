import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Clear the authentication cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0), // Set expiry date to the past
    path: '/',
  };

  res.setHeader('Set-Cookie', serialize('authToken', '', cookieOptions));

  res.status(200).json({ message: 'Logout successful' });
}
