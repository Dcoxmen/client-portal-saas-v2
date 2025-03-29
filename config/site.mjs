const siteConfig = {
  languages: [
    { code: 'en-US', name: 'American English', slug: 'en' },
    { code: 'zh-TW', name: 'Traditional Chinese', slug: 'tw' },
  ],
  defaultLanguage: 'en-US',
  locations: [
    { name: 'Irvine, CA USA', slug: 'irvine-ca-usa' },
    { name: 'Taipei, Taiwan', slug: 'taipei-taiwan' },
  ],
  services: [
    { name: 'View Invoices', slug: 'view-invoices' },
    { name: 'Order Products', slug: 'order-products' },
    { name: 'Rewards', slug: 'rewards' },
    { name: 'Hubspot', slug: 'hubspot' }, // Assuming Hubspot integration is a service offered
    { name: 'Analytics', slug: 'analytics' },
  ],
  serviceInfo: {
    title: 'Client Asset Portal',
    description: 'Order products, get invoices, Client discounts, etc.',
  },
  // Placeholder for contact details
  contactDetails: {
    address: '123 Placeholder St, Suite 100',
    city: 'Placeholder City',
    state: 'PS',
    zip: '00000',
    country: 'Placeholder Country',
    phone: '+1 (000) 000-0000',
    email: 'contact@placeholder.com',
  },
};

// Helper function to generate URL-friendly slugs
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

// Pre-generate slugs if not provided
siteConfig.locations.forEach(loc => {
  if (!loc.slug) {
    loc.slug = slugify(loc.name);
  }
});

siteConfig.services.forEach(svc => {
  if (!svc.slug) {
    svc.slug = slugify(svc.name);
  }
});

export default siteConfig;
