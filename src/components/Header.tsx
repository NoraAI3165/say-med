'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const locales = [
  { code: 'en', label: 'EN', flag: 'gb' },
  { code: 'tr', label: 'TR', flag: 'tr' },
  { code: 'nl', label: 'NL', flag: 'nl' },
];

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Path without locale for matching and switching
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/';

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/services' as const, label: t('services') },
    { href: '/regulations' as const, label: t('regulations') },
    { href: '/products' as const, label: t('products') },
    { href: '/about' as const, label: t('about') },
    { href: '/contact' as const, label: t('contact') },
  ];

  // Build locale switch URL
  function localeUrl(loc: string) {
    return `/${loc}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo - use wide format */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/logos/logo-wide-white.svg"
              alt="Say-Med"
              className="h-14 sm:h-16 lg:h-20 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathWithoutLocale === link.href
                    ? 'text-gold bg-gold/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Language flags + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language flags - always visible, no dropdown */}
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
              {locales.map((loc) => (
                <a
                  key={loc.code}
                  href={localeUrl(loc.code)}
                  className={clsx(
                    'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all',
                    loc.code === locale
                      ? 'bg-gold/20 text-gold'
                      : 'text-white/50 hover:text-white hover:bg-white/10'
                  )}
                >
                  <img src={`/flags/${loc.flag}.svg`} alt="" className="w-5 h-3.5 rounded-sm" />
                  {loc.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-gold text-navy font-semibold text-sm rounded-lg hover:bg-gold-light transition-colors"
            >
              {t('getQuote')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t border-gold/10 mt-2 pt-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'px-4 py-3 rounded-lg text-sm font-medium',
                    pathWithoutLocale === link.href
                      ? 'text-gold bg-gold/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* Mobile language flags */}
            <div className="flex items-center gap-2 mt-4 px-4">
              {locales.map((loc) => (
                <a
                  key={loc.code}
                  href={localeUrl(loc.code)}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                    loc.code === locale ? 'text-gold bg-gold/10' : 'text-white/60 hover:text-white'
                  )}
                >
                  <img src={`/flags/${loc.flag}.svg`} alt="" className="w-5 h-3.5 rounded-sm" />
                  {loc.label}
                </a>
              ))}
            </div>
            <div className="mt-4 px-4">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-5 py-3 bg-gold text-navy font-semibold text-sm rounded-lg"
              >
                {t('getQuote')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
