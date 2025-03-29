"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage({
  params
}: {
  params: { locale: string }
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { locale } = params;
  
  // If loading, show loading state
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  // This should be handled by middleware, but adding as a fallback
  if (status === 'unauthenticated') {
    router.push(`/${locale}/login`);
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {session?.user?.name || 'User'}!</h1>
        <p className="text-gray-600">
          This is your personal dashboard where you can manage your account and access client resources.
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
          <h3 className="text-lg font-semibold mb-2">Invoices</h3>
          <p className="text-3xl font-bold text-primary">3</p>
          <p className="text-sm text-gray-500 mt-1">2 pending payment</p>
          <Link href={`/${locale}/invoices`} className="text-primary hover:text-primary-dark text-sm mt-4 inline-block">
            View all invoices →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary">
          <h3 className="text-lg font-semibold mb-2">Orders</h3>
          <p className="text-3xl font-bold text-secondary">5</p>
          <p className="text-sm text-gray-500 mt-1">1 in progress</p>
          <Link href={`/${locale}/orders`} className="text-primary hover:text-primary-dark text-sm mt-4 inline-block">
            View all orders →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-accent">
          <h3 className="text-lg font-semibold mb-2">Rewards</h3>
          <p className="text-3xl font-bold text-accent">250</p>
          <p className="text-sm text-gray-500 mt-1">points available</p>
          <Link href={`/${locale}/rewards`} className="text-primary hover:text-primary-dark text-sm mt-4 inline-block">
            View rewards program →
          </Link>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Order #12345 placed</p>
              <p className="text-sm text-gray-500">March 25, 2025</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-secondary/10 p-2 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Invoice #INV-2025-001 paid</p>
              <p className="text-sm text-gray-500">March 20, 2025</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-accent/10 p-2 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Earned 50 reward points</p>
              <p className="text-sm text-gray-500">March 15, 2025</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <Link href={`/${locale}/activity`} className="text-primary hover:text-primary-dark text-sm">
            View all activity →
          </Link>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href={`/${locale}/orders/new`} className="flex flex-col items-center p-4 bg-neutral-light rounded-lg hover:bg-neutral transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mb-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">New Order</span>
          </Link>
          
          <Link href={`/${locale}/invoices`} className="flex flex-col items-center p-4 bg-neutral-light rounded-lg hover:bg-neutral transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mb-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">View Invoices</span>
          </Link>
          
          <Link href={`/${locale}/support`} className="flex flex-col items-center p-4 bg-neutral-light rounded-lg hover:bg-neutral transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mb-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Get Support</span>
          </Link>
          
          <Link href={`/${locale}/profile`} className="flex flex-col items-center p-4 bg-neutral-light rounded-lg hover:bg-neutral transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mb-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">My Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
