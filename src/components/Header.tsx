'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname as useNextPathname, useRouter as useNextRouter } from 'next/navigation';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const localeNames: Record<string, string> = {
  en: 'English',
  tr: 'Turkce',
  nl: 'Nederlands',
};

const localeFlagCodes: Record<string, string> = {
  en: 'gb',
  tr: 'tr',
  nl: 'nl',
};

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const nextRouter = useNextRouter();
  const nextPathname = useNextPathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Get path without locale prefix for nav link matching
  const pathWithoutLocale = nextPathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/';

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/services' as const, label: t('services') },
    { href: '/regulations' as const, label: t('regulations') },
    { href: '/products' as const, label: t('products') },
    { href: '/about' as const, label: t('about') },
    { href: '/contact' as const, label: t('contact') },
  ];

  function switchLocale(newLocale: string) {
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    window.location.href = newPath;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/logo-white.svg"
              alt="Say-Med"
              width={240}
              height={80}
              className="h-16 lg:h-20 w-auto"
              priority
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

          {/* Right side: Language + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm"
              >
                <img src={`/flags/${localeFlagCodes[locale]}.svg`} alt="" className="w-5 h-3.5 rounded-sm object-cover" />
                <span>{localeNames[locale]}</span>
                <ChevronDown className={clsx('w-3 h-3 transition-transform', langOpen && 'rotate-180')} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-navy-light border border-gold/20 rounded-xl shadow-2xl overflow-hidden z-50">
                  {(['en', 'tr', 'nl'] as const).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={clsx(
                        'w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors',
                        loc === locale
                          ? 'text-gold bg-gold/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <img src={`/flags/${localeFlagCodes[loc]}.svg`} alt="" className="w-6 h-4 rounded-sm object-cover" />
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
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
            <div className="flex items-center gap-2 mt-4 px-4">
              {(['en', 'tr', 'nl'] as const).map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
                    loc === locale ? 'text-gold bg-gold/10' : 'text-white/60 hover:text-white'
                  )}
                >
                  <img src={`/flags/${localeFlagCodes[loc]}.svg`} alt="" className="w-5 h-3.5 rounded-sm object-cover" />
                  {loc.toUpperCase()}
                </button>
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
