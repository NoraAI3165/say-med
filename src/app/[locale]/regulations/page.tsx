'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { flagStates, type FlagState } from '@/lib/regulations';
import ScrollSection from '@/components/ScrollSection';
import { Search, ExternalLink, ArrowRight, Globe } from 'lucide-react';

const GlobeComponent = dynamic(() => import('@/components/Globe'), { ssr: false });

export default function RegulationsPage() {
  const t = useTranslations('regulations');
  const locale = useLocale();
  const [selected, setSelected] = useState<FlagState | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return flagStates;
    const q = search.toLowerCase();
    return flagStates.filter(
      (fs) =>
        fs.name.toLowerCase().includes(q) ||
        fs.code.toLowerCase().includes(q) ||
        fs.authority.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="w-12 h-12 text-gold mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Globe Section */}
      <ScrollSection className="py-16 lg:py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <GlobeComponent onCountrySelect={setSelected} selectedCountry={selected} />

            <div>
              {selected ? (
                <div className="bg-navy border border-gold/20 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{selected.flag}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selected.name}</h3>
                      <span className="text-gold text-sm font-medium">{selected.standardKey}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-white/40 text-sm uppercase tracking-wider mb-1">{t('authority')}</div>
                      <div className="text-white">{selected.authority}</div>
                    </div>
                    <div>
                      <div className="text-white/40 text-sm uppercase tracking-wider mb-1">{t('requirements')}</div>
                      <div className="text-white/80">{selected.regulation}</div>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/contact`}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
                  >
                    {t('requestCompliance')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-white mb-4">{t('selectCountry')}</h3>
                  <p className="text-white/50 leading-relaxed">{t('selectCountryDesc')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* All Regulations Grid */}
      <ScrollSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">{t('allRegulations')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('allRegulationsDesc')}</p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((fs) => (
              <button
                key={fs.code}
                onClick={() => setSelected(fs)}
                className="group text-left p-6 rounded-xl border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all duration-200 bg-white"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{fs.flag}</span>
                  <div>
                    <div className="font-semibold text-navy group-hover:text-gold transition-colors">
                      {fs.name}
                    </div>
                    <div className="text-xs text-gray-400">{fs.standardKey}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{fs.authority}</p>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              {t('noResults')}
            </div>
          )}
        </div>
      </ScrollSection>

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
