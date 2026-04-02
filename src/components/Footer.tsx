'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

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
                src="/logos/logo-white.svg"
                alt="Say-Med"
                width={160}
                height={50}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
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

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider mb-6">
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
