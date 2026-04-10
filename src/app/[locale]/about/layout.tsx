import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Say-Med',
  description: 'Learn about Say-Med, a global maritime medical supply company with offices in Turkey, Netherlands, USA, and Singapore. Our mission, vision, and values.',
  openGraph: {
    title: 'About Say-Med | Maritime Medical Supply Company',
    description: 'Global maritime medical supply company with offices in Turkey, Netherlands, USA, and Singapore.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
