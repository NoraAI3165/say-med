import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maritime Medical Regulations by Flag State',
  description: 'Comprehensive guide to maritime medical regulations by flag state. Medical chest requirements for Panama, Liberia, Marshall Islands, Malta, UK, and 40+ flag states.',
  openGraph: {
    title: 'Maritime Medical Regulations by Flag State | Say-Med',
    description: 'Medical chest requirements for Panama, Liberia, Marshall Islands, Malta, UK, and 40+ flag states.',
  },
};

export default function RegulationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
