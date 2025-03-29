import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

// Mock the next/navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the next-auth/react hooks
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  signOut: jest.fn(),
}));

describe('Header Component', () => {
  it('renders the logo', () => {
    render(<Header />);
    
    // Check if the logo text is rendered
    expect(screen.getByText('ClientPortal')).toBeInTheDocument();
  });
  
  it('renders navigation links', () => {
    render(<Header />);
    
    // Check if the navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
  
  it('renders login and signup links when not authenticated', () => {
    render(<Header />);
    
    // Check if the login and signup links are rendered
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
