import { MetadataRoute } from 'next';

const baseUrl = 'https://say-med.com.tr';
const locales = ['en', 'tr', 'nl'];
const pages = ['', '/services', '/regulations', '/products', '/about', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/services' ? 0.9 : page === '/regulations' ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
