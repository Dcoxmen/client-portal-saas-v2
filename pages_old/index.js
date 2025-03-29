import Layout from '@/components/Layout';
import siteConfig from '../config/site.js'; // Use relative path
import Link from 'next/link'; // Import Link for CTA buttons

// --- Copied Homepage Components ---
// Note: Moved defaultLang definition inside RootIndexPage

const HeroBlock = ({ lang }) => ( // Accept lang as a prop
  <div className="bg-primary text-white py-20 px-4 text-center rounded-lg shadow-lg mb-8"> {/* Use primary background */}
    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to the Client Asset Portal</h1>
    <p className="text-lg md:text-xl mb-6 text-gray-200">{siteConfig.serviceInfo.description}</p> {/* Lighter text for contrast */}
    {/* Link the button to the default language signup page */}
    <Link href={`/${lang}/signup`}> {/* Use passed lang prop */}
      <button className="bg-accent hover:opacity-90 text-white font-bold py-2 px-6 rounded"> {/* Use accent color */}
        Get Started
      </button>
    </Link>
  </div>
);

// Removed duplicated HeroBlock definition

const FeatureBlock = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center mb-6"> {/* Keep white background for cards */}
    {/* Placeholder for icon */}
    <div className="text-4xl mb-4 text-primary">{icon || '⚙️'}</div> {/* Use primary color for icon */}
    <h3 className="text-xl font-semibold mb-2 text-neutral-dark">{title}</h3> {/* Use neutral-dark text */}
    <p className="text-gray-600">{description}</p> {/* Keep slightly lighter gray for body text */}
  </div>
);

const CtaBlock = ({ lang }) => ( // Accept lang as a prop
  <div className="bg-neutral-light p-8 rounded-lg shadow text-center mb-8"> {/* Use neutral-light background */}
    <h2 className="text-2xl font-semibold mb-4 text-neutral-dark">Ready to Streamline Your Assets?</h2> {/* Use neutral-dark text */}
    <p className="text-gray-700 mb-6">Log in or sign up to access your dedicated portal.</p> {/* Keep slightly lighter gray */}
    <div className="space-x-4">
      <Link href={`/${lang}/login`}> {/* Use passed lang prop */}
        <button className="bg-primary hover:opacity-90 text-white font-bold py-2 px-6 rounded"> {/* Use primary color */}
          Login
        </button>
      </Link>
      <Link href={`/${lang}/signup`}> {/* Use passed lang prop */}
        <button className="bg-accent hover:opacity-90 text-white font-bold py-2 px-6 rounded"> {/* Use accent color */}
          Sign Up
        </button>
      </Link>
    </div>
  </div>
);

// --- Main Root Homepage Component ---
export default function RootIndexPage() {
  // Define defaultLang inside the component
  const defaultLang = siteConfig.languages.find(l => l.code === siteConfig.defaultLanguage)?.slug || 'en';
  // Set title for the default language
  const pageTitle = `Client Portal - ${defaultLang.toUpperCase()}`;

  return (
    <Layout title={pageTitle} description={siteConfig.serviceInfo.description}>
      {/* Block 1: Hero */}
      <HeroBlock lang={defaultLang} /> {/* Pass lang to HeroBlock */}

      {/* Block 2, 3, 4: Features (Example) */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <FeatureBlock title="View Invoices" description="Access and download your invoices anytime." icon="📄" />
        <FeatureBlock title="Order Products" description="Easily reorder rugged tablets and accessories." icon="🛒" />
        <FeatureBlock title="Track Rewards" description="Check your loyalty points and available rewards." icon="⭐" />
      </div>

      {/* Block 5: Placeholder Content Block */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8"> {/* Keep white background */}
        <h3 className="text-xl font-semibold mb-2 text-neutral-dark">Industry Focus</h3> {/* Use neutral-dark text */}
        <p className="text-gray-600">Providing rugged solutions for Oil & Gas, Manufacturing, and Energy sectors.</p> {/* Keep lighter gray */}
        {/* Placeholder image could go here */}
        <div className="mt-4 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500">Placeholder Image Area</div> {/* Keep placeholder style for now */}
      </div>

       {/* Block 6: Placeholder Content Block */}
       <div className="bg-primary/10 p-6 rounded-lg shadow-md mb-8"> {/* Use light primary tint */}
        <h3 className="text-xl font-semibold mb-2 text-primary">Analytics Dashboard</h3> {/* Use primary text */}
        <p className="text-primary/80">Gain insights into your usage and orders (Coming Soon!).</p> {/* Use lighter primary text */}
         <div className="mt-4 h-32 bg-primary/20 rounded flex items-center justify-center text-primary/60">Placeholder Graph Area</div> {/* Use primary tint for placeholder */}
      </div>

      {/* Block 7: Call to Action */}
      <CtaBlock lang={defaultLang} /> {/* Pass lang to CtaBlock */}

    </Layout>
  );
}

// No getStaticPaths or getStaticProps needed for the root index page
