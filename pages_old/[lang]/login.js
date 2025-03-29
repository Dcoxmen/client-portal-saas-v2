import { useState } from 'react';
import Layout from '@/components/Layout';
import { siteConfig } from '@/config/site';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Import useAuth hook

export default function LoginPage({ lang }) {
  const router = useRouter();
  const { login } = useAuth(); // Get login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password); // Use login function from context
      console.log('Login successful via context:', user);
      // Redirect to a protected page (e.g., dashboard)
      router.push(`/${lang}/dashboard`);

    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = `Login - Client Portal (${lang.toUpperCase()})`;

  return (
    <Layout title={pageTitle} description="Log in to your Client Portal account.">
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md"> {/* Keep white card */}
        <h1 className="text-3xl font-bold mb-6 text-center text-neutral-dark">Login</h1> {/* Use neutral-dark text */}
        <form onSubmit={handleSubmit}>
          {error && <p className="mb-4 text-red-600 bg-red-100 p-3 rounded text-center">{error}</p>} {/* Keep error styling */}

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

          <div className="mb-6">
            <label htmlFor="password" className="block text-neutral-dark font-semibold mb-2">Password</label> {/* Use neutral-dark text */}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" /* Use primary focus ring */
              placeholder="********"
            />
            {/* TODO: Add Forgot Password link */}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50" /* Use primary button */
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600"> {/* Keep lighter gray text */}
          Don't have an account?{' '}
          <Link href={`/${lang}/signup`} className="text-primary hover:underline"> {/* Use primary link */}
            Sign Up
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
