import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maritime Medical Services',
  description: 'Complete maritime medical services including medical chest supply, recertification, pharmaceuticals, medical equipment, and oxygen services for vessels worldwide.',
  openGraph: {
    title: 'Maritime Medical Services | Say-Med',
    description: 'Complete maritime medical services including medical chest supply, recertification, pharmaceuticals, and equipment.',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
