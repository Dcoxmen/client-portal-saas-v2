import { useState } from 'react';
import Layout from '@/components/Layout';
import { siteConfig } from '@/config/site';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Import useAuth hook

export default function SignupPage({ lang }) {
  const router = useRouter();
  const { signup } = useAuth(); // Get signup function from context
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const data = await signup(name, email, password); // Use signup function from context

      // Signup successful
      console.log('Signup successful via context:', data);
      setSuccess('Account created successfully! Redirecting to login...');
      // Redirect to login page after a delay
      setTimeout(() => {
        router.push(`/${lang}/login`);
      }, 2000); // Redirect after 2 seconds

    } catch (err) {
      setError(err.message);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = `Sign Up - Client Portal (${lang.toUpperCase()})`;

  return (
    <Layout title={pageTitle} description="Create your Client Portal account.">
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md"> {/* Keep white card */}
        <h1 className="text-3xl font-bold mb-6 text-center text-neutral-dark">Create Account</h1> {/* Use neutral-dark text */}
        <form onSubmit={handleSubmit}>
          {error && <p className="mb-4 text-red-600 bg-red-100 p-3 rounded text-center">{error}</p>} {/* Keep error styling */}
          {success && <p className="mb-4 text-green-600 bg-green-100 p-3 rounded text-center">{success}</p>} {/* Keep success styling */}

          <div className="mb-4">
            <label htmlFor="name" className="block text-neutral-dark font-semibold mb-2">Full Name</label> {/* Use neutral-dark text */}
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" /* Use primary focus ring */
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-neutral-dark font-semibold mb-2">Email Address</label> {/* Use neutral-dark text */}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" /* Use primary focus ring */
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-neutral-dark font-semibold mb-2">Password</label> {/* Use neutral-dark text */}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" /* Use primary focus ring */
              placeholder="********"
            />
          </div>

           <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-neutral-dark font-semibold mb-2">Confirm Password</label> {/* Use neutral-dark text */}
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" /* Use primary focus ring */
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50" /* Use accent button */
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600"> {/* Keep lighter gray text */}
          Already have an account?{' '}
          <Link href={`/${lang}/login`} className="text-primary hover:underline"> {/* Use primary link */}
            Login
          </Link>
        </p>
      </div>
    </Layout>
  );
}

// Define paths for each language
export async function getStaticPaths() {
  const paths = siteConfig.languages.map(lang => ({
    params: { lang: lang.slug },
  }));
  return { paths, fallback: false };
}

// Fetch props for the page, including the language slug
export async function getStaticProps({ params }) {
  return {
    props: {
      lang: params.lang,
    },
  };
}
