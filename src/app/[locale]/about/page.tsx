'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
import ScrollSection from '@/components/ScrollSection';
import { ArrowRight, Award, Users, Globe, Shield, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('about');

  const values = [
    { icon: Shield, titleKey: 'value1Title', descKey: 'value1Desc' },
    { icon: Globe, titleKey: 'value2Title', descKey: 'value2Desc' },
    { icon: Users, titleKey: 'value3Title', descKey: 'value3Desc' },
    { icon: Award, titleKey: 'value4Title', descKey: 'value4Desc' },
  ];

  return (
    <div className="pt-20">
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">{t('title')}</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Story */}
      <ScrollSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold font-semibold text-sm uppercase tracking-wider">{t('storyLabel')}</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-4 mb-6">{t('storyTitle')}</h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>{t('storyP1')}</p>
                <p>{t('storyP2')}</p>
                <p>{t('storyP3')}</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative">
                <Image
                  src="/images/about-story.jpg"
                  alt={t('storyTitle')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Mission & Vision */}
      <ScrollSection className="py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-gray-100">
              <Target className="w-10 h-10 text-gold mb-6" />
              <h3 className="text-2xl font-bold text-navy mb-4">{t('missionTitle')}</h3>
              <p className="text-gray-500 leading-relaxed">{t('missionDesc')}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-gray-100">
              <Eye className="w-10 h-10 text-gold mb-6" />
              <h3 className="text-2xl font-bold text-navy mb-4">{t('visionTitle')}</h3>
              <p className="text-gray-500 leading-relaxed">{t('visionDesc')}</p>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Values */}
      <ScrollSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">{t('valuesTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <v.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-3">{t(v.titleKey)}</h3>
                <p className="text-gray-500 text-sm">{t(v.descKey)}</p>
              </div>
            ))}
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
