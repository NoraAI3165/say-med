'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Phone, Mail, MapPin, Building2 } from 'lucide-react';

const offices = [
  { name: 'Say-Med Turkey', city: 'Istanbul, Turkey', flag: 'tr' },
  { name: 'Say-Med Rotterdam', city: 'Rotterdam, Netherlands', flag: 'nl' },
  { name: 'Say-Med Virginia', city: 'Virginia, United States', flag: 'us' },
  { name: 'Say-Med Singapore', city: 'Singapore', flag: 'sg' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Image
                src="/logos/logo-wide-white.svg"
                alt="Say-Med"
                width={768}
                height={248}
                className="w-full max-w-[260px] h-auto"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            {/* Contact */}
            <div className="space-y-3">
              <a href="tel:+902162322333" className="flex items-center gap-2 text-sm hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                +90 216 232 23 33
              </a>
              <a href="mailto:info@say-med.com" className="flex items-center gap-2 text-sm hover:text-gold transition-colors">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                info@say-med.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider mb-6">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/services' as const, label: t('services') },
                { href: '/regulations' as const, label: t('regulations') },
                { href: '/products' as const, label: t('products') },
                { href: '/markets' as const, label: t('markets') },
                { href: '/about' as const, label: t('about') },
                { href: '/contact' as const, label: t('contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Offices */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider mb-6">
              {t('offices')}
            </h3>
            <ul className="space-y-4">
              {offices.map((office) => (
                <li key={office.name} className="flex items-start gap-3 text-sm">
                  <img src={`/flags/${office.flag}.svg`} alt="" className="w-5 h-3.5 rounded-sm mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-medium">{office.name}</div>
                    <div className="text-white/50 text-xs">{office.city}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider mb-6">
              {t('servicesTitle')}
            </h3>
            <ul className="space-y-3">
              {['medicalChests', 'recertification', 'pharmaceuticals', 'medicalEquipment', 'oxygenServices'].map(
                (key) => (
                  <li key={key} className="text-sm">
                    {t(key)}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Say-Med. {t('rights')}
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link href="/" className="hover:text-white/60 transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/" className="hover:text-white/60 transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
