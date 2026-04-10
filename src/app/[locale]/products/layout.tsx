import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maritime Medical Products',
  description: 'Browse our complete range of maritime medical products: medical chests, first aid kits, medical equipment, pharmaceuticals, oxygen systems, and emergency supplies.',
  openGraph: {
    title: 'Maritime Medical Products | Say-Med',
    description: 'Complete range of maritime medical products: medical chests, first aid kits, equipment, pharmaceuticals, and oxygen systems.',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
