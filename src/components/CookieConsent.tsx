'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function CookieConsent() {
  const t = useTranslations('cookie');
  const locale = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setShow(true);
  }, []);

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-navy border border-gold/20 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-white/70 text-sm flex-1 leading-relaxed">
          {t('message')}{' '}
          <a href={`/${locale}/privacy`} className="text-gold underline underline-offset-2 hover:text-gold-light">
            {t('privacyLink')}
          </a>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-colors"
          >
            {t('decline')}
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
