'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
import ScrollSection from '@/components/ScrollSection';
import { ArrowRight, CheckCircle, Sailboat } from 'lucide-react';

export default function YachtingMarketPage() {
  const t = useTranslations('markets.yachting');

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-navy py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-ship.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-6">
            <Sailboat className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('heroTitle')}
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            {t('heroDesc')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollSection className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-2/5">
              <div className="aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden relative">
                <Image
                  src="/images/hero-ship.jpg"
                  alt={t('heroTitle')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="w-full lg:w-3/5">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-6">
                {t('needsTitle')}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                {t('needsDesc')}
              </p>
              <ul className="space-y-3">
                {['need1', 'need2', 'need3', 'need4'].map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-gray-600">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollSection>
        </div>
      </div>

      {/* Services for this market */}
      <div className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">{t('servicesTitle')}</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">{t('servicesDesc')}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['service1', 'service2', 'service3', 'service4', 'service5', 'service6'].map((key) => (
                <div
                  key={key}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <CheckCircle className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-lg font-semibold text-navy mb-2">{t(`${key}Title`)}</h3>
                  <p className="text-gray-500 text-sm">{t(`${key}Desc`)}</p>
                </div>
              ))}
            </div>
          </ScrollSection>
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
