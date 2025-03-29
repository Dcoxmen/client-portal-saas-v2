"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import siteConfig from '@/config/site.mjs';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  
  // Extract locale from pathname (e.g., /en/about -> en)
  const currentLocale = pathname?.split('/')[1] || 'en';
  
  // Get current path without locale for active link detection
  const currentPath = pathname?.split('/').slice(2).join('/') || '';
  
  const changeLanguage = (newLocale: string) => {
    // Get the current path without the locale prefix
    const pathWithoutLocale = pathname?.split('/').slice(2).join('/') || '';
    // Navigate to the same path with the new locale
    router.push(`/${newLocale}/${pathWithoutLocale}`);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(`/${currentLocale}`);
  };
  
  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '') {
      return currentPath === '';
    }
    return currentPath.startsWith(path);
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-1">
        {/* Top bar with language switcher and auth */}
        <div className="flex justify-end items-center py-2 text-sm border-b border-white/10">
          {/* Language Switcher */}
          <div className="relative mr-6">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              value={currentLocale}
              className="bg-primary-dark border border-white/20 text-white text-sm rounded-md focus:ring-secondary focus:border-secondary block w-full py-1 px-2 appearance-none"
              aria-label="Select language"
            >
              {siteConfig.languages.map((lang) => (
                <option key={lang.slug} value={lang.slug}>
                  {lang.name} ({lang.slug.toUpperCase()})
                </option>
              ))}
            </select>
            {/* Basic dropdown arrow styling */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/70">
              <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
          
          {/* Auth Links */}
          {loading ? (
            <span className="text-white/70">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : session?.user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white/90">Hi, {session.user.name || 'User'}</span>
              <button
                onClick={handleLogout}
                className="bg-primary-dark hover:bg-primary-dark/80 px-3 py-1 rounded text-white text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link href={`/${currentLocale}/login`} className="text-white/90 hover:text-white transition-colors">
                Login
              </Link>
              <Link href={`/${currentLocale}/signup`} className="bg-secondary hover:bg-secondary-dark px-3 py-1 rounded text-white text-sm transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>
        
        {/* Main navigation */}
        <nav className="py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="text-2xl font-bold text-white hover:text-white/90 transition-colors">
            <span className="text-secondary">Client</span>Portal
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link 
              href={`/${currentLocale}`} 
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('') 
                  ? 'bg-primary-dark text-white' 
                  : 'text-white/80 hover:bg-primary-dark/50 hover:text-white'
              }`}
            >
              Home
            </Link>
            
            {session?.user && (
              <Link 
                href={`/${currentLocale}/dashboard`} 
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('dashboard') 
                    ? 'bg-primary-dark text-white' 
                    : 'text-white/80 hover:bg-primary-dark/50 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
            )}
            
            <Link 
              href={`/${currentLocale}/contact`} 
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('contact') 
                  ? 'bg-primary-dark text-white' 
                  : 'text-white/80 hover:bg-primary-dark/50 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
