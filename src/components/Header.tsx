'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
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

  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/';

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/services' as const, label: t('services') },
    { href: '/regulations' as const, label: t('regulations') },
    { href: '/products' as const, label: t('products') },
    { href: '/markets' as const, label: t('markets') },
    { href: '/about' as const, label: t('about') },
    { href: '/contact' as const, label: t('contact') },
  ];

  function localeUrl(loc: string) {
    return `/${loc}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  }

  const currentFlag = locales.find((l) => l.code === locale) || locales[0];
  const otherLocales = locales.filter((l) => l.code !== locale);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
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

          {/* Right: Flag dropdown + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Flag-only dropdown using <details> - pure HTML, no JS */}
            <details className="relative group">
              <summary className="flex items-center cursor-pointer list-none px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                <img
                  src={`/flags/${currentFlag.flag}.svg`}
                  alt={currentFlag.label}
                  className="w-8 h-6 rounded shadow-sm"
                />
                <svg className="w-3 h-3 ml-1.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="absolute right-0 mt-2 bg-navy-light border border-gold/20 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[120px]">
                {otherLocales.map((loc) => (
                  <a
                    key={loc.code}
                    href={localeUrl(loc.code)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <img src={`/flags/${loc.flag}.svg`} alt="" className="w-7 h-5 rounded shadow-sm" />
                    <span className="font-medium">{loc.label}</span>
                  </a>
                ))}
              </div>
            </details>

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
            {/* Mobile language - flag buttons */}
            <div className="flex items-center gap-3 mt-4 px-4">
              {locales.map((loc) => (
                <a
                  key={loc.code}
                  href={localeUrl(loc.code)}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors',
                    loc.code === locale
                      ? 'border-gold/40 bg-gold/10'
                      : 'border-white/10 hover:border-white/30'
                  )}
                >
                  <img src={`/flags/${loc.flag}.svg`} alt="" className="w-6 h-4 rounded" />
                  <span className={loc.code === locale ? 'text-gold font-medium' : 'text-white/60'}>{loc.label}</span>
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
