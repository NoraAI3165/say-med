'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import ScrollSection from '@/components/ScrollSection';
import {
  Anchor,
  ShieldCheck,
  Globe,
  Stethoscope,
  Ship,
  Clock,
  Award,
  ArrowRight,
  Phone,
  ChevronDown,
} from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale();

  const stats = [
    { value: '25+', labelKey: 'yearsExperience', icon: Award },
    { value: '120+', labelKey: 'countriesServed', icon: Globe },
    { value: '5000+', labelKey: 'vesselsSupplied', icon: Ship },
    { value: '24/7', labelKey: 'support', icon: Clock },
  ];

  const serviceHighlights = [
    {
      icon: Stethoscope,
      titleKey: 'serviceChests',
      descKey: 'serviceChestsDesc',
    },
    {
      icon: ShieldCheck,
      titleKey: 'serviceRecert',
      descKey: 'serviceRecertDesc',
    },
    {
      icon: Globe,
      titleKey: 'serviceGlobal',
      descKey: 'serviceGlobalDesc',
    },
    {
      icon: Phone,
      titleKey: 'serviceTele',
      descKey: 'serviceTeleDesc',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-ocean/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ocean-light/5 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(197,165,114,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,114,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8">
              <Anchor className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">{t('badge')}</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
              {t('heroTitle1')}
              <br />
              <span className="text-gold-gradient">{t('heroTitle2')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-all text-lg"
              >
                {t('heroCTA')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all text-lg"
              >
                {t('heroSecondary')}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gold/50" />
        </div>
      </section>

      {/* Stats Section */}
      <ScrollSection className="bg-navy-light py-20 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/50 text-sm">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Services Overview */}
      <ScrollSection className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-gold font-semibold text-sm uppercase tracking-wider">{t('servicesLabel')}</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy mt-4 mb-6">{t('servicesTitle')}</h2>
            <p className="text-lg text-gray-500 leading-relaxed">{t('servicesSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceHighlights.map((service, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="w-14 h-14 rounded-xl bg-navy/5 group-hover:bg-gold/10 flex items-center justify-center mb-6 transition-colors">
                  <service.icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{t(service.titleKey)}</h3>
                <p className="text-gray-500 leading-relaxed">{t(service.descKey)}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
            >
              {t('viewAllServices')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollSection>

      {/* Global Reach / Why Choose Us */}
      <ScrollSection className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold font-semibold text-sm uppercase tracking-wider">{t('whyLabel')}</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy mt-4 mb-8">{t('whyTitle')}</h2>

              <div className="space-y-6">
                {[
                  { title: t('why1Title'), desc: t('why1Desc') },
                  { title: t('why2Title'), desc: t('why2Desc') },
                  { title: t('why3Title'), desc: t('why3Desc') },
                  { title: t('why4Title'), desc: t('why4Desc') },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold font-bold text-sm">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy text-lg">{item.title}</h3>
                      <p className="text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual placeholder - maritime themed */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-navy overflow-hidden flex items-center justify-center">
                <div className="text-center p-12">
                  <Anchor className="w-24 h-24 text-gold/30 mx-auto mb-6" />
                  <div className="text-gold/50 text-6xl font-bold mb-2">120+</div>
                  <div className="text-white/40 text-lg">{t('countriesServed')}</div>
                  <div className="mt-8 flex justify-center gap-3 flex-wrap">
                    {['\u{1F1F5}\u{1F1E6}', '\u{1F1F1}\u{1F1F7}', '\u{1F1EC}\u{1F1E7}', '\u{1F1F3}\u{1F1F1}', '\u{1F1F3}\u{1F1F4}', '\u{1F1F2}\u{1F1F9}', '\u{1F1EC}\u{1F1F7}', '\u{1F1F8}\u{1F1EC}'].map((flag, i) => (
                      <span key={i} className="text-3xl">{flag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-ocean/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Regulations CTA */}
      <ScrollSection className="py-24 lg:py-32 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="w-16 h-16 text-gold mx-auto mb-8" />
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">{t('regTitle')}</h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12">{t('regSubtitle')}</p>
          <Link
            href={`/${locale}/regulations`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-all text-lg"
          >
            {t('regCTA')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </ScrollSection>

      {/* Testimonials */}
      <ScrollSection className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold font-semibold text-sm uppercase tracking-wider">{t('testimonialsLabel')}</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy mt-4">{t('testimonialsTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl bg-cream">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-gold text-lg">&#9733;</span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  &ldquo;{t(`testimonial${i}`)}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-navy">{t(`testimonialAuthor${i}`)}</div>
                  <div className="text-sm text-gray-400">{t(`testimonialRole${i}`)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* CTA Banner */}
      <ScrollSection className="py-24 lg:py-32 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">{t('ctaTitle')}</h2>
          <p className="text-xl text-white/50 mb-12">{t('ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-all text-lg"
            >
              {t('ctaButton')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+31000000000"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/5 transition-all text-lg"
            >
              <Phone className="w-5 h-5" />
              {t('ctaCall')}
            </a>
          </div>
        </div>
      </ScrollSection>
    </div>
  );
}
