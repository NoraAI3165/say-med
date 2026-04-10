import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markets We Serve',
  description: 'Say-Med serves offshore, cruise, commercial shipping, yachting, and aviation markets with tailored maritime medical supply solutions.',
  openGraph: {
    title: 'Markets We Serve | Say-Med',
    description: 'Offshore, cruise, commercial shipping, yachting, and aviation maritime medical supply solutions.',
  },
};

export default function MarketsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
