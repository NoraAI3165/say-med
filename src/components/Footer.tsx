'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Phone, Mail, MapPin, Anchor } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-navy-dark text-white/70">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                <Anchor className="w-5 h-5 text-gold" />
              </div>
              <span className="text-white font-bold text-xl">
                Say<span className="text-gold">-Med</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-3">
              {[
                { href: `/${locale}/services`, label: t('services') },
                { href: `/${locale}/regulations`, label: t('regulations') },
                { href: `/${locale}/products`, label: t('products') },
                { href: `/${locale}/about`, label: t('about') },
                { href: `/${locale}/contact`, label: t('contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
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

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              {t('contactTitle')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <div>
                  <div className="text-white font-medium">24/7 Emergency</div>
                  <a href="tel:+31000000000" className="hover:text-gold transition-colors">
                    +31 (0) 00 000 0000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <a href="mailto:info@say-med.com" className="hover:text-gold transition-colors">
                  info@say-med.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>Rotterdam, The Netherlands</span>
              </li>
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
            <Link href={`/${locale}/privacy`} className="hover:text-white/60 transition-colors">
              {t('privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-white/60 transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
