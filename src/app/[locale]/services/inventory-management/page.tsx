'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
import ScrollSection from '@/components/ScrollSection';
import { ArrowRight, CheckCircle, ClipboardList } from 'lucide-react';

export default function InventoryManagementPage() {
  const t = useTranslations('inventoryPage');

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-navy py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/medical-supplies.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-6">
            <ClipboardList className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('heroTitle')}
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            {t('heroDesc')}
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollSection className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-2/5">
              <div className="aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden relative">
                <Image
                  src="/images/medical-supplies.jpg"
                  alt={t('heroTitle')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="w-full lg:w-3/5">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-6">
                {t('overviewTitle')}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                {t('overviewDesc')}
              </p>
              <ul className="space-y-3">
                {['highlight1', 'highlight2', 'highlight3', 'highlight4'].map((key) => (
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

      {/* Features Grid */}
      <div className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">{t('featuresTitle')}</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">{t('featuresDesc')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {['tracking', 'expiry', 'reorder', 'visibility'].map((key) => (
                <div
                  key={key}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                >
                  <CheckCircle className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-xl font-semibold text-navy mb-3">{t(`${key}Title`)}</h3>
                  <p className="text-gray-500 mb-4">{t(`${key}Desc`)}</p>
                  <ul className="space-y-2">
                    {['1', '2', '3'].map((n) => (
                      <li key={n} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{t(`${key}Feature${n}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollSection>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollSection className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="w-full lg:w-2/5">
              <div className="aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden relative">
                <Image
                  src="/images/pharmaceuticals.jpg"
                  alt={t('benefitsTitle')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="w-full lg:w-3/5">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-6">
                {t('benefitsTitle')}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                {t('benefitsDesc')}
              </p>
              <ul className="space-y-3">
                {['benefit1', 'benefit2', 'benefit3', 'benefit4'].map((key) => (
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
