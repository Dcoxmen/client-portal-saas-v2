import React from 'react';
import Link from 'next/link';
import siteConfig from '@/config/site';

export default function NotFound() {
  // Get the default locale from the site config
  const defaultLocale = siteConfig.languages.find(
    (lang) => lang.code === siteConfig.defaultLanguage
  )?.slug || 'en';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-dark mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link href={`/${defaultLocale}`} className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
