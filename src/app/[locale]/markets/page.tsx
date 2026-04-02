'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
import ScrollSection from '@/components/ScrollSection';
import { ArrowRight, Anchor, Ship, Waves, Sailboat, Plane } from 'lucide-react';

const marketSegments = [
  {
    id: 'offshore',
    href: '/markets/offshore' as const,
    icon: Anchor,
    image: '/images/port.jpg',
    titleKey: 'offshoreTitle',
    descKey: 'offshoreDesc',
  },
  {
    id: 'cruise',
    href: '/markets/cruise' as const,
    icon: Ship,
    image: '/images/ocean.jpg',
    titleKey: 'cruiseTitle',
    descKey: 'cruiseDesc',
  },
  {
    id: 'commercial',
    href: '/markets/commercial' as const,
    icon: Waves,
    image: '/images/cargo-ship.jpg',
    titleKey: 'commercialTitle',
    descKey: 'commercialDesc',
  },
  {
    id: 'yachting',
    href: '/markets/yachting' as const,
    icon: Sailboat,
    image: '/images/hero-ship.jpg',
    titleKey: 'yachtingTitle',
    descKey: 'yachtingDesc',
  },
  {
    id: 'aviation',
    href: '/markets/aviation' as const,
    icon: Plane,
    image: '/images/medical-equipment.jpg',
    titleKey: 'aviationTitle',
    descKey: 'aviationDesc',
  },
];

export default function MarketsPage() {
  const t = useTranslations('markets');

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Market Segments Grid */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketSegments.map((segment) => (
              <ScrollSection key={segment.id}>
                <Link
                  href={segment.href}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={segment.image}
                      alt={t(segment.titleKey)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/30 transition-colors" />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-gold/90 flex items-center justify-center">
                      <segment.icon className="w-6 h-6 text-navy" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                      {t(segment.titleKey)}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {t(segment.descKey)}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all">
                      {t('learnMore')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </ScrollSection>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('ctaTitle')}</h2>
          <p className="text-white/50 mb-8">{t('ctaDesc')}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-all"
          >
            {t('ctaButton')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
