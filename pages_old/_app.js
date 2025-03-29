import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Inter, Poppins } from 'next/font/google'; // Import font functions

// Configure fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // CSS variable for Inter
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Include needed weights
  variable: '--font-poppins', // CSS variable for Poppins
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    // Add font variables to the main html tag for Tailwind to use
    <AuthProvider>
      <div className={`${inter.variable} ${poppins.variable} font-body`}> {/* Apply body font globally */}
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
