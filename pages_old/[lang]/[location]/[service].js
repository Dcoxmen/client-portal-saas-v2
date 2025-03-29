import Layout from '@/components/Layout';
import { siteConfig } from '@/config/site';
import { useRouter } from 'next/router';

// Placeholder component for service page content
const ServicePageContent = ({ lang, location, service }) => {
  // In a real app, fetch/display content based on lang, location, service
  // For now, just display the parameters

  // Find full names from slugs for display
  const langName = siteConfig.languages.find(l => l.slug === lang)?.name || lang;
  const locationName = siteConfig.locations.find(l => l.slug === location)?.name || location;
  const serviceName = siteConfig.services.find(s => s.slug === service)?.name || service;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md"> {/* Keep white card background */}
      <h1 className="text-3xl font-bold mb-4 capitalize text-primary">{serviceName}</h1> {/* Use primary color for title */}
      <p className="text-lg mb-2 text-neutral-dark"> {/* Use neutral-dark text */}
        <span className="font-semibold">Location:</span> {locationName}
      </p>
      <p className="text-lg mb-4 text-neutral-dark"> {/* Use neutral-dark text */}
        <span className="font-semibold">Language:</span> {langName} ({lang})
      </p>
      <hr className="my-4 border-gray-200" /> {/* Lighter hr */}
      <div className="mt-4 text-neutral-dark"> {/* Use neutral-dark text */}
        <p>This is the dynamically generated page for the '{serviceName}' service in {locationName}, displayed in {langName}.</p>
        <p className="mt-2">Content specific to this combination will be displayed here.</p>
        {/* Placeholder for unique service template content */}
        <div className="mt-6 h-64 bg-neutral-light rounded flex items-center justify-center text-gray-500"> {/* Use neutral-light for placeholder bg */}
          Unique Service Template Area ({serviceName})
        </div>
      </div>
    </div>
  );
};

// Main Service Page Component
export default function ServiceLocationPage({ lang, location, service }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>; // Handle fallback state if needed
  }

  const serviceName = siteConfig.services.find(s => s.slug === service)?.name || service;
  const locationName = siteConfig.locations.find(l => l.slug === location)?.name || location;
  const pageTitle = `${serviceName} - ${locationName} | Client Portal (${lang.toUpperCase()})`;
  const pageDescription = `Details for the ${serviceName} service available in ${locationName}.`;

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <ServicePageContent lang={lang} location={location} service={service} />
    </Layout>
  );
}

// Generate all possible paths
export async function getStaticPaths() {
  const paths = [];
  siteConfig.languages.forEach(lang => {
    siteConfig.locations.forEach(location => {
      siteConfig.services.forEach(service => {
        paths.push({
          params: {
            lang: lang.slug,
            location: location.slug,
            service: service.slug,
          },
        });
      });
    });
  });

  return { paths, fallback: false }; // fallback: false means pages not generated at build time will 404
}

// Fetch props for the page
export async function getStaticProps({ params }) {
  const { lang, location, service } = params;

  // Optional: Validate slugs exist in config, return 404 if not
  const isValidLang = siteConfig.languages.some(l => l.slug === lang);
  const isValidLocation = siteConfig.locations.some(l => l.slug === location);
  const isValidService = siteConfig.services.some(s => s.slug === service);

  if (!isValidLang || !isValidLocation || !isValidService) {
    return { notFound: true };
  }

  // Pass slugs to the page component
  // In a real app, fetch data specific to this lang/location/service combination here
  return {
    props: {
      lang,
      location,
      service,
      // Add any fetched data here
    },
    // Enable ISR: Re-generate the page in the background after 60 seconds
    revalidate: 60,
  };
}
