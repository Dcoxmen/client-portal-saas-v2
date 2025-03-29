import Layout from '@/components/Layout';
import { siteConfig } from '@/config/site';
import { useRouter } from 'next/router';

// Contact Page Component
export default function ContactPage({ lang }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // In a real app, fetch locale-specific text here based on 'lang'
  const pageTitle = `Contact Us - Client Portal (${lang.toUpperCase()})`;
  const pageDescription = 'Get in touch with us.';
  const contact = siteConfig.contactDetails; // Using placeholder details

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-2xl mx-auto"> {/* Keep white background */}
        <h1 className="text-3xl font-bold mb-6 text-center text-neutral-dark">Contact Us</h1> {/* Use neutral-dark text */}

        <div className="space-y-4 text-lg text-neutral-dark"> {/* Use neutral-dark text */}
          <p>
            If you have any questions or need assistance, please feel free to reach out to us using the information below.
          </p>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary">Address:</h2> {/* Use primary color */}
            <p>{contact.address}</p>
            <p>{contact.city}, {contact.state} {contact.zip}</p>
            <p>{contact.country}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary">Phone:</h2> {/* Use primary color */}
            <p><a href={`tel:${contact.phone}`} className="text-primary hover:underline">{contact.phone}</a></p> {/* Use primary color */}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary">Email:</h2> {/* Use primary color */}
            <p><a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a></p> {/* Use primary color */}
          </div>
        </div>

        {/* Optional: Add a contact form component later */}
        {/* <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-center">Send us a Message</h2>
          {/* <ContactForm /> */}
        {/* </div> */}
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

  // Pass lang slug to the page
  // Fetch locale-specific text if needed
  return {
    props: {
      lang: params.lang,
      // Add locale-specific text/data here
    },
    // Optional: Enable ISR if contact details might change frequently
    // revalidate: 3600, // Re-generate every hour
  };
}
