import React from 'react';
import Link from 'next/link';
import siteConfig from '@/config/site.mjs';

// Hero section component with gradient background
const HeroBlock = ({ locale }: { locale: string }) => (
  <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white py-24 px-4 rounded-lg shadow-lg mb-12">
    {/* Decorative elements */}
    <div className="absolute top-0 left-0 w-full h-full opacity-10">
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-secondary"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-secondary"></div>
    </div>
    
    <div className="relative z-10 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        Welcome to the <span className="text-neutral-light">Client Asset Portal</span>
      </h1>
      <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
        {siteConfig.serviceInfo.description} Manage your assets, track orders, and access invoices all in one secure location.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link 
          href={`/${locale}/signup`} 
          className="btn bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
        >
          Get Started
        </Link>
        <Link 
          href={`/${locale}/login`} 
          className="btn bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-md text-lg font-medium transition-colors"
        >
          Log In
        </Link>
      </div>
    </div>
  </div>
);

// Feature block component with improved styling
const FeatureBlock = ({ 
  title, 
  description, 
  icon,
  color = "primary"
}: { 
  title: string; 
  description: string; 
  icon: string;
  color?: "primary" | "secondary";
}) => (
  <div className="bg-white rounded-lg shadow-md p-8 transition-transform hover:translate-y-[-5px] duration-300">
    <div className={`text-4xl mb-5 ${color === "primary" ? "text-primary" : "text-secondary"}`}>{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-neutral-dark">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Call-to-action component with improved styling
const CtaBlock = ({ locale }: { locale: string }) => (
  <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-10 rounded-lg shadow-md text-center mb-12">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">Ready to Streamline Your Assets?</h2>
    <p className="text-gray-700 mb-8 max-w-2xl mx-auto">Log in or sign up to access your dedicated portal and start managing your client assets efficiently.</p>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link 
        href={`/${locale}/login`} 
        className="btn bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition-colors"
      >
        Login
      </Link>
      <Link 
        href={`/${locale}/signup`} 
        className="btn bg-secondary hover:bg-secondary-dark text-white px-6 py-2 rounded-md transition-colors"
      >
        Sign Up
      </Link>
    </div>
  </div>
);

// Main page component
export default function HomePage({
  params
}: {
  params: { locale: string }
}) {
  const { locale } = params;
  
  return (
    <>
      {/* Hero Section */}
      <HeroBlock locale={locale} />

      {/* Features Section with heading */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureBlock 
            title="View Invoices" 
            description="Access and download your invoices anytime with our secure document management system." 
            icon="📄" 
          />
          <FeatureBlock 
            title="Order Products" 
            description="Easily reorder rugged tablets and accessories with our streamlined ordering process." 
            icon="🛒"
            color="secondary" 
          />
          <FeatureBlock 
            title="Track Rewards" 
            description="Check your loyalty points and available rewards in our comprehensive rewards program." 
            icon="⭐" 
          />
        </div>
      </div>

      {/* Industry Focus Section with improved layout */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-primary">Industry Focus</h3>
          <p className="text-gray-600 mb-6">Providing rugged solutions for Oil & Gas, Manufacturing, and Energy sectors with specialized hardware and software tailored to your industry needs.</p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Ruggedized hardware for harsh environments
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Specialized software solutions
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              24/7 technical support
            </li>
          </ul>
        </div>
        <div className="bg-neutral-light rounded-lg shadow-md flex items-center justify-center">
          <div className="p-8 text-center">
            <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-primary">Industry-Leading Solutions</h4>
            <p className="text-gray-600">Trusted by over 500 companies across multiple industries</p>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard Preview with improved styling */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-lg shadow-md mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Analytics Dashboard</h3>
            <p className="text-gray-600 mb-4">Gain insights into your usage and orders with our comprehensive analytics dashboard.</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Real-time order tracking
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Usage statistics and trends
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Customizable reports and exports
              </li>
            </ul>
            <div className="mt-6">
              <Link 
                href={`/${locale}/dashboard`} 
                className="text-primary hover:text-primary-dark font-medium flex items-center"
              >
                Preview Dashboard
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-inner">
            <div className="h-64 bg-neutral-light rounded flex items-center justify-center text-primary/60 border border-gray-200">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-secondary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <p className="text-gray-500">Analytics Dashboard Preview</p>
                <p className="text-sm text-gray-400">(Coming Soon)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <CtaBlock locale={locale} />
    </>
  );
}
