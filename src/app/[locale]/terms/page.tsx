'use client';

import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('terms');

  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-2">{t('title')}</h1>
        <p className="text-sm text-gray-400 mb-10">{t('lastUpdated')}</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-navy">{t('s1Title')}</h2>
            <p>{t('s1Text')}</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy">{t('s2Title')}</h2>
            <p>{t('s2Text')}</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy">{t('s3Title')}</h2>
            <p>{t('s3Text')}</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy">{t('s4Title')}</h2>
            <p>{t('s4Text')}</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy">{t('s5Title')}</h2>
            <p>{t('s5Text')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
