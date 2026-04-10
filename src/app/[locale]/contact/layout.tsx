import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Say-Med for maritime medical supply inquiries. Offices in Istanbul, Rotterdam, Virginia, and Singapore. Get a quote for your vessel medical needs.',
  openGraph: {
    title: 'Contact Say-Med | Maritime Medical Supplies',
    description: 'Contact Say-Med for maritime medical supply inquiries. Offices in Istanbul, Rotterdam, Virginia, and Singapore.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
