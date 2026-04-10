import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Say-Med | Maritime Medical Supply Solutions',
    template: '%s | Say-Med',
  },
  description: 'Global maritime medical supply company providing medical chests, pharmaceuticals, equipment, and regulatory compliance services for vessels worldwide.',
  metadataBase: new URL('https://say-med.com'),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://say-med.com',
    siteName: 'Say-Med',
    title: 'Say-Med | Maritime Medical Supply Solutions',
    description: 'Global maritime medical supply company providing medical chests, pharmaceuticals, equipment, and regulatory compliance services for vessels worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Say-Med Maritime Medical Supplies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Say-Med | Maritime Medical Supply Solutions',
    description: 'Global maritime medical supply company providing medical chests, pharmaceuticals, and regulatory compliance services.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://say-med.com',
    languages: {
      'en': 'https://say-med.com/en',
      'tr': 'https://say-med.com/tr',
      'nl': 'https://say-med.com/nl',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
