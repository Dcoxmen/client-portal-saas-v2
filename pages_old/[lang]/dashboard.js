import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { siteConfig } from '@/config/site';
import { useRouter } from 'next/router';

function DashboardPage({ lang }) {
  const { user } = useAuth(); // Get user info from context

  // Should not happen if ProtectedRoute works, but good practice
  if (!user) {
    return <Layout title="Loading..."><div>Loading user data...</div></Layout>;
  }

  const pageTitle = `Dashboard - Client Portal (${lang.toUpperCase()})`;
  const pageDescription = `Welcome to your dashboard, ${user.name}.`;

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
        <p className="text-lg mb-2">This is your protected dashboard area.</p>
        <p className="text-gray-600 mb-4">Your email: {user.email}</p>
        <hr className="my-4" />
        <h2 className="text-2xl font-semibold mb-3">Portal Features</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {/* Link to actual service pages */}
          {siteConfig.services.map(service => (
             <li key={service.slug}>
               {/* TODO: Add links to specific location/service pages relevant to the user */}
               {service.name} (Placeholder)
             </li>
          ))}
        </ul>
         {/* Add more dashboard widgets/content here */}
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
  // Validate lang slug
  const isValidLang = siteConfig.languages.some(l => l.slug === params.lang);
  if (!isValidLang) {
    return { notFound: true };
  }
  return {
    props: {
      lang: params.lang,
    },
  };
}


// Wrap the page component with the ProtectedRoute HOC
export default ProtectedRoute(DashboardPage);
