import { redirect } from 'next/navigation';
import siteConfig from '@/config/site.mjs';

export default function RootPage() {
  // Get the default locale from the site config
  const defaultLocale = siteConfig.languages.find(
    (lang) => lang.code === siteConfig.defaultLanguage
  )?.slug || 'en';
  
  // Redirect to the default locale
  redirect(`/${defaultLocale}`);
  
  // This return is never reached due to the redirect,
  // but is needed to satisfy TypeScript
  return null;
}
