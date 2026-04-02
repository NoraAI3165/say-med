'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { services } from '@/lib/services';
import ScrollSection from '@/components/ScrollSection';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">{t('title')}</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Services Grid */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, i) => (
              <ScrollSection
                key={service.id}
                id={service.id}
                className={`flex flex-col lg:flex-row gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Icon/Visual */}
                <div className="w-full lg:w-2/5">
                  <div className="aspect-square max-w-sm mx-auto rounded-3xl bg-cream flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-gold/40" strokeWidth={1} />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-3/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-navy">
                      {t(service.titleKey)}
                    </h2>
                  </div>
                  <p className="text-gray-500 text-lg leading-relaxed mb-6">
                    {t(service.descKey)}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((fKey) => (
                      <li key={fKey} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span className="text-gray-600">{t(fKey)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
                  >
                    {t('inquire')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
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
            href={`/${locale}/contact`}
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
