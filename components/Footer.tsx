"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';

  // Footer navigation links
  const footerLinks = [
    { name: 'Home', href: `/${currentLocale}` },
    { name: 'Dashboard', href: `/${currentLocale}/dashboard` },
    { name: 'Contact', href: `/${currentLocale}/contact` },
    { name: 'Privacy Policy', href: `/${currentLocale}/privacy` },
    { name: 'Terms of Service', href: `/${currentLocale}/terms` },
  ];

  return (
    <footer className="bg-secondary text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        {/* Footer content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-neutral-light">Client</span>Portal
            </h3>
            <p className="text-white/80 mb-4">
              Your secure portal for managing client assets, invoices, and orders.
            </p>
            <p className="text-white/80">
              <strong>Email:</strong> support@clientportal.com
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter signup */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-l-md focus:outline-none focus:ring-1 focus:ring-neutral-light text-white w-full"
              />
              <button className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-r-md text-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-6 border-t border-white/10 text-center text-white/70">
          <p>&copy; {currentYear} ClientPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
