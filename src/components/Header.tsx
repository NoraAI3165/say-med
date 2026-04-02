'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const localeNames: Record<string, string> = {
  en: 'English',
  tr: 'Turkce',
  nl: 'Nederlands',
};

const localeFlags: Record<string, string> = {
  en: '\u{1F1EC}\u{1F1E7}',
  tr: '\u{1F1F9}\u{1F1F7}',
  nl: '\u{1F1F3}\u{1F1F1}',
};

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/regulations`, label: t('regulations') },
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  function switchLocale(newLocale: string) {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setLangOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
              <span className="text-gold font-bold text-lg">S</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Say<span className="text-gold">-Med</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
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
                <Globe className="w-4 h-4" />
                <span>{localeFlags[locale]} {localeNames[locale]}</span>
                <ChevronDown className={clsx('w-3 h-3 transition-transform', langOpen && 'rotate-180')} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-navy-light border border-gold/20 rounded-xl shadow-2xl overflow-hidden">
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
                      <span className="text-lg">{localeFlags[loc]}</span>
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/contact`}
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
                    pathname === link.href
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
                  onClick={() => { switchLocale(loc); setMobileOpen(false); }}
                  className={clsx(
                    'px-3 py-2 rounded-lg text-sm',
                    loc === locale ? 'text-gold bg-gold/10' : 'text-white/60 hover:text-white'
                  )}
                >
                  {localeFlags[loc]} {loc.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="mt-4 px-4">
              <Link
                href={`/${locale}/contact`}
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
