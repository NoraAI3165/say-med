'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

import { flagStates, type FlagState } from '@/lib/regulations';
import { specialRegulations, regulationCategories } from '@/lib/regulation-categories';
import ScrollSection from '@/components/ScrollSection';
import { ArrowRight, Globe, FileText, Shield, Clock, ExternalLink, CheckCircle, Anchor, Plane, AlertTriangle, LifeBuoy } from 'lucide-react';

const GlobeComponent = dynamic(() => import('@/components/Globe'), { ssr: false });

export default function RegulationsPage() {
  const t = useTranslations('regulations');
  const [selected, setSelected] = useState<FlagState | null>(null);
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
      <section className="py-16 lg:py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* 3D Globe - desktop only */}
            <div>
              <div className="hidden md:block">
                <GlobeComponent onCountrySelect={setSelected} selectedCountry={selected} />
              </div>
              {/* Country quick-select grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 lg:mt-6">
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
                    <span
                      role="img"
                      aria-label={fs.name}
                      className="w-5 h-3.5 rounded-sm shrink-0 inline-block bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(/flags/${fs.code.toLowerCase()}.svg)` }}
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
                      <span
                        role="img"
                        aria-label={selected.name}
                        className="w-[60px] h-[40px] rounded shadow-lg inline-block bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(/flags/${selected.code.toLowerCase()}.svg)` }}
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

                    {/* Regulation - clickable link */}
                    <a
                      href={selected.keyDocuments[0]?.url || selected.authorityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 -mx-3 rounded-xl hover:bg-gold/10 transition-colors group cursor-pointer"
                    >
                      <FileText className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-white/40 text-xs font-medium mb-1">{t('regulationName')}</div>
                        <div className="text-gold group-hover:text-gold-light text-sm font-medium underline underline-offset-2">
                          {selected.regulation}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gold/50 group-hover:text-gold shrink-0 mt-1" />
                    </a>

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

                    {/* Key Documents - Big clickable buttons */}
                    <div>
                      <div className="text-gold text-xs font-bold uppercase tracking-wider mb-3">{t('keyDocuments')}</div>
                      <div className="space-y-2">
                        {selected.keyDocuments.map((doc, i) => (
                          <a
                            key={i}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold/50 transition-all group cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5 text-gold" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white font-medium text-sm truncate">{doc.name}</div>
                              <div className="text-gold/60 text-xs truncate">{doc.url}</div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gold shrink-0" />
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
      </section>

      {/* Special Regulations: Offshore, Aviation, Dangerous Goods, Safety */}
      <ScrollSection className="py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">{t('specialTitle')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('specialDesc')}</p>
          </div>

          <div className="space-y-6">
            {specialRegulations.map((reg) => {
              const iconMap: Record<string, React.ReactNode> = {
                offshore: <Anchor className="w-6 h-6 text-gold" />,
                aviation: <Plane className="w-6 h-6 text-gold" />,
                'dangerous-goods': <AlertTriangle className="w-6 h-6 text-gold" />,
                safety: <LifeBuoy className="w-6 h-6 text-gold" />,
              };
              return (
                <div key={reg.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6 lg:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        {iconMap[reg.category]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-navy">{reg.name}</h3>
                          <span className="px-2 py-0.5 bg-navy/5 rounded text-xs font-medium text-navy/60">{reg.code}</span>
                        </div>
                        <p className="text-sm text-gray-400">{reg.applicableTo}</p>
                      </div>
                    </div>
                    <p className="text-gray-500 mb-4">{reg.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {reg.keyRequirements.slice(0, 4).map((req, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                          {req}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {reg.documents.map((doc, i) => (
                        <a
                          key={i}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy/5 hover:bg-gold/10 rounded-lg text-sm text-navy/70 hover:text-gold transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          {doc.name}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
