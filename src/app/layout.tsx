import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Say-Med | Maritime Medical Supply Solutions',
  description: 'Global maritime medical supply company providing medical chests, pharmaceuticals, equipment, and regulatory compliance services for vessels worldwide.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
