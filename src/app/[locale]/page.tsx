'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
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

const IMAGES = {
  hero: '/images/hero-ship.jpg',
  ship: '/images/cargo-ship.jpg',
  medical: '/images/medical-supplies.jpg',
  ocean: '/images/ocean.jpg',
  crew: '/images/ship-bridge.jpg',
  port: '/images/port.jpg',
};

export default function HomePage() {
  const t = useTranslations('home');

  const stats = [
    { value: '25+', labelKey: 'yearsExperience', icon: Award },
    { value: '120+', labelKey: 'countriesServed', icon: Globe },
    { value: '5000+', labelKey: 'vesselsSupplied', icon: Ship },
    { value: '24/7', labelKey: 'support', icon: Clock },
  ];

  const serviceHighlights = [
    { icon: Stethoscope, titleKey: 'serviceChests', descKey: 'serviceChestsDesc' },
    { icon: ShieldCheck, titleKey: 'serviceRecert', descKey: 'serviceRecertDesc' },
    { icon: Globe, titleKey: 'serviceGlobal', descKey: 'serviceGlobalDesc' },
    { icon: Phone, titleKey: 'serviceTele', descKey: 'serviceTeleDesc' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Full screen with background image */}
      <section className="relative min-h-screen flex items-center">
        <Image
          src={IMAGES.hero}
          alt="Maritime vessel at sea"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8">
              <Anchor className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">{t('badge')}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] mb-8">
              {t('heroTitle1')}
              <br />
              <span className="text-gold-gradient">{t('heroTitle2')}</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-all text-lg"
              >
                {t('heroCTA')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all text-lg"
              >
                {t('heroSecondary')}
              </Link>
            </div>
          </div>
        </div>

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

      {/* Services Overview - with images */}
      <ScrollSection className="py-24 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-gold font-semibold text-sm tracking-wider">{t('servicesLabel')}</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy mt-4 mb-6">{t('servicesTitle')}</h2>
            <p className="text-lg text-gray-500 leading-relaxed">{t('servicesSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceHighlights.map((service, i) => (
              <div
                key={i}
                className="group p-8 lg:p-10 rounded-3xl border border-gray-100 hover:border-gold/30 hover:shadow-2xl transition-all duration-500 bg-white"
              >
                <div className="w-16 h-16 rounded-2xl bg-navy/5 group-hover:bg-gold/10 flex items-center justify-center mb-8 transition-colors">
                  <service.icon className="w-8 h-8 text-navy group-hover:text-gold transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">{t(service.titleKey)}</h3>
                <p className="text-gray-500 leading-relaxed text-lg">{t(service.descKey)}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-gold font-semibold text-lg hover:gap-3 transition-all"
            >
              {t('viewAllServices')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </ScrollSection>

      {/* Full-width image break - Ship at port */}
      <section className="relative h-[50vh] lg:h-[60vh]">
        <Image
          src={IMAGES.port}
          alt="Container port operations"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-gold text-lg font-medium mb-4">{t('servicesLabel')}</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-4xl">
              {t('whyTitle')}
            </h2>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <ScrollSection className="py-24 lg:py-40 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold font-semibold text-sm tracking-wider">{t('whyLabel')}</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy mt-4 mb-10">{t('whyTitle')}</h2>

              <div className="space-y-8">
                {[
                  { title: t('why1Title'), desc: t('why1Desc') },
                  { title: t('why2Title'), desc: t('why2Desc') },
                  { title: t('why3Title'), desc: t('why3Desc') },
                  { title: t('why4Title'), desc: t('why4Desc') },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-xl mb-2">{item.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src={IMAGES.ship}
                  alt="Cargo vessel at sea"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gold/10 rounded-3xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-ocean/10 rounded-3xl -z-10" />
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Regulations CTA with background image */}
      <section className="relative py-32 lg:py-40">
        <Image
          src={IMAGES.ocean}
          alt="Open ocean"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="w-16 h-16 text-gold mx-auto mb-8" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">{t('regTitle')}</h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12">{t('regSubtitle')}</p>
          <Link
            href="/regulations"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-all text-lg"
          >
            {t('regCTA')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <ScrollSection className="py-24 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold font-semibold text-sm tracking-wider">{t('testimonialsLabel')}</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-navy mt-4">{t('testimonialsTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 lg:p-10 rounded-3xl bg-cream">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-gold text-xl">&#9733;</span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg italic">
                  &ldquo;{t(`testimonial${i}`)}&rdquo;
                </p>
                <div>
                  <div className="font-bold text-navy text-lg">{t(`testimonialAuthor${i}`)}</div>
                  <div className="text-sm text-gray-400 mt-1">{t(`testimonialRole${i}`)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* CTA Banner with medical image */}
      <section className="relative py-24 lg:py-32">
        <Image
          src={IMAGES.medical}
          alt="Medical supplies"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/90" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">{t('ctaTitle')}</h2>
          <p className="text-xl text-white/50 mb-12">{t('ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-all text-lg"
            >
              {t('ctaButton')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+902162322333"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/5 transition-all text-lg"
            >
              <Phone className="w-5 h-5" />
              {t('ctaCall')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
