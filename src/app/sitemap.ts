import { MetadataRoute } from 'next';

const baseUrl = 'https://say-med.com';
const locales = ['en', 'tr', 'nl'];

const pages = ['', '/services', '/regulations', '/products', '/about', '/contact'];

const marketPages = [
  '/markets',
  '/markets/offshore',
  '/markets/cruise',
  '/markets/commercial',
  '/markets/yachting',
  '/markets/aviation',
];

const serviceSubPages = [
  '/services/medical-oxygen',
  '/services/calibration',
  '/services/inventory-management',
];

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

    for (const page of marketPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '/markets' ? 0.8 : 0.6,
      });
    }

    for (const page of serviceSubPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
