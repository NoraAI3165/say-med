'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
import { flagStates, type FlagState } from '@/lib/regulations';
import ScrollSection from '@/components/ScrollSection';
import { Search, ArrowRight, Globe, FileText, Shield, Clock, ExternalLink, CheckCircle, Download } from 'lucide-react';

const GlobeComponent = dynamic(() => import('@/components/Globe'), { ssr: false });

export default function RegulationsPage() {
  const t = useTranslations('regulations');
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
      <section className="relative bg-navy py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, #1a4a7a 0%, transparent 50%), radial-gradient(circle at 70% 50%, #C5A572 0%, transparent 50%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="w-16 h-16 text-gold mx-auto mb-6" />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* 3D Globe */}
            <div>
              <GlobeComponent onCountrySelect={setSelected} selectedCountry={selected} />
              {/* Country quick-select grid below globe */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-6">
                {flagStates.map((fs) => (
                  <button
                    key={fs.code}
                    onClick={() => setSelected(fs)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all text-xs ${
                      selected?.code === fs.code
                        ? 'bg-gold/20 border border-gold/40'
                        : 'bg-navy/50 border border-white/5 hover:border-white/20'
                    }`}
                  >
                    <Image
                      src={`/flags/${fs.code.toLowerCase()}.png`}
                      alt={fs.name}
                      width={20}
                      height={14}
                      className="rounded-sm shrink-0"
                    />
                    <span className={selected?.code === fs.code ? 'text-gold font-medium' : 'text-white/60'}>
                      {fs.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              {selected ? (
                <div className="bg-navy border border-gold/20 rounded-2xl overflow-hidden">
                  {/* Country header */}
                  <div className="p-6 bg-gold/5 border-b border-gold/10">
                    <div className="flex items-center gap-4">
                      <Image
                        src={`/flags/${selected.code.toLowerCase()}.png`}
                        alt={selected.name}
                        width={60}
                        height={40}
                        className="rounded shadow-lg"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-white">{selected.name}</h3>
                        <span className="text-gold text-sm font-medium">{selected.standardKey}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Authority */}
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white/40 text-xs font-medium mb-1">{t('authority')}</div>
                        <div className="text-white text-sm">{selected.authority}</div>
                      </div>
                    </div>

                    {/* Regulation */}
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white/40 text-xs font-medium mb-1">{t('regulationName')}</div>
                        <div className="text-white text-sm">{selected.regulation}</div>
                      </div>
                    </div>

                    {/* Inspection */}
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white/40 text-xs font-medium mb-1">{t('inspectionInterval')}</div>
                        <div className="text-white text-sm">{selected.inspectionInterval}</div>
                      </div>
                    </div>

                    {/* Chest Categories */}
                    <div>
                      <div className="text-white/40 text-xs font-medium mb-2">{t('chestCategories')}</div>
                      <div className="space-y-1.5">
                        {selected.chestCategories.map((cat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                            <span className="text-white/80 text-sm">{cat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div>
                      <div className="text-white/40 text-xs font-medium mb-2">{t('details')}</div>
                      <p className="text-white/70 text-sm leading-relaxed">{selected.details}</p>
                    </div>

                    {/* Key Documents - Clickable */}
                    <div>
                      <div className="text-white/40 text-xs font-medium mb-2">{t('keyDocuments')}</div>
                      <div className="space-y-2">
                        {selected.keyDocuments.map((doc, i) => (
                          <a
                            key={i}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-gold/10 border border-white/5 hover:border-gold/20 transition-all group"
                          >
                            <FileText className="w-4 h-4 text-gold/60 group-hover:text-gold shrink-0" />
                            <span className="text-white/70 text-sm group-hover:text-white flex-1">{doc.name}</span>
                            <Download className="w-3.5 h-3.5 text-white/30 group-hover:text-gold shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Official Website */}
                    <a
                      href={selected.authorityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold/70 text-sm hover:text-gold transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('visitAuthority')}
                    </a>

                    {/* CTA */}
                    <div className="pt-2">
                      <Link
                        href="/contact"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
                      >
                        {t('requestCompliance')}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-navy/50 border border-white/10 rounded-2xl p-12 text-center">
                  <Globe className="w-16 h-16 text-white/20 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">{t('selectCountry')}</h3>
                  <p className="text-white/40 leading-relaxed">{t('selectCountryDesc')}</p>
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
                onClick={() => { setSelected(fs); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                className="group text-left p-6 rounded-xl border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all duration-200 bg-white"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={`/flags/${fs.code.toLowerCase()}.png`}
                    alt={fs.name}
                    width={32}
                    height={22}
                    className="rounded-sm shadow"
                  />
                  <div>
                    <div className="font-semibold text-navy group-hover:text-gold transition-colors">
                      {fs.name}
                    </div>
                    <div className="text-xs text-gray-400">{fs.standardKey}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{fs.regulation}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-gold/70">
                  <FileText className="w-3 h-3" />
                  <span>{fs.keyDocuments.length} documents</span>
                </div>
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
