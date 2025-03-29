import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import siteConfig from './config/site.mjs';
import type { NextRequest } from 'next/server';

// Helper function to get the preferred locale from the request
const getLocale = (request: NextRequest): string => {
  // Get accept-language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Extract locales from the header (e.g., "en-US,en;q=0.9,fr;q=0.8")
  const headerLocales = acceptLanguage.split(',').map(locale => 
    locale.split(';')[0].trim()
  );
  
  // Get available locale slugs from config
  const availableLocales = siteConfig.languages.map(lang => lang.slug);
  
  // Find the first locale that matches our available locales
  for (const locale of headerLocales) {
    // Check for exact match (e.g., "en")
    if (availableLocales.includes(locale)) {
      return locale;
    }
    
    // Check for language match (e.g., "en-US" matches "en")
    const language = locale.split('-')[0];
    const matchingLocale = siteConfig.languages.find(lang => lang.code.startsWith(language))?.slug;
    if (matchingLocale) {
      return matchingLocale;
    }
  }
  
  // Default to the site's default language
  return siteConfig.languages.find(lang => 
    lang.code === siteConfig.defaultLanguage
  )?.slug || 'en';
};

// Middleware function that handles both authentication and internationalization
function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for API routes, Next.js internals, and static files
  if (
    pathname.startsWith('/api') || 
    pathname.startsWith('/_next') || 
    pathname.includes('/favicon.ico') ||
    pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }
  
  // Check if the path already has a locale prefix (e.g., /en/about)
  const pathnameIsMissingLocale = siteConfig.languages.every(
    (lang) => !pathname.startsWith(`/${lang.slug}/`) && pathname !== `/${lang.slug}`
  );
  
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // Construct the new URL with the locale prefix
    const newUrl = new URL(
      `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
      request.url
    );
    
    // Add search parameters if they exist
    if (request.nextUrl.search) {
      newUrl.search = request.nextUrl.search;
    }
    
    return NextResponse.redirect(newUrl);
  }
  
  // Continue processing if locale exists
  return NextResponse.next();
}

// Protected routes that require authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/settings',
  '/orders',
  '/invoices',
];

// Export the middleware with authentication
export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname;
      
      // Extract the path without the locale prefix
      const pathWithoutLocale = pathname.split('/').slice(2).join('/');
      
      // Check if the path is protected
      const isProtectedPath = protectedPaths.some(path => 
        pathWithoutLocale.startsWith(path.substring(1))
      );
      
      // Allow access if the path is not protected or if the user has a valid token
      return !isProtectedPath || !!token;
    },
  },
});

// Configure which routes this middleware applies to
export const config = {
  matcher: [
    // Skip static files, API routes, etc.
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
