'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ScrollSection from '@/components/ScrollSection';
import { Send, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="pt-20">
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">{t('title')}</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <ScrollSection>
                <h2 className="text-2xl font-bold text-navy mb-6">{t('infoTitle')}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy">{t('phone')}</div>
                      <a href="tel:+31000000000" className="text-gray-500 hover:text-gold transition-colors">
                        +31 (0) 00 000 0000
                      </a>
                      <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {t('available247')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy">{t('email')}</div>
                      <a href="mailto:info@say-med.com" className="text-gray-500 hover:text-gold transition-colors">
                        info@say-med.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy">WhatsApp</div>
                      <a href="https://wa.me/31000000000" className="text-gray-500 hover:text-gold transition-colors">
                        +31 (0) 00 000 0000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy">{t('office')}</div>
                      <p className="text-gray-500">Rotterdam, The Netherlands</p>
                    </div>
                  </div>
                </div>
              </ScrollSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ScrollSection>
                <form onSubmit={handleSubmit} className="bg-cream rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-navy mb-6">{t('formTitle')}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">{t('name')}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">{t('emailLabel')}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none bg-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">{t('company')}</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">{t('subject')}</label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none bg-white"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-navy mb-2">{t('message')}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none bg-white resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-all disabled:opacity-50"
                  >
                    {status === 'sending' ? t('sending') : t('send')}
                    <Send className="w-4 h-4" />
                  </button>
                  {status === 'sent' && (
                    <p className="mt-4 text-green-600 font-medium">{t('success')}</p>
                  )}
                  {status === 'error' && (
                    <p className="mt-4 text-red-500 font-medium">{t('error')}</p>
                  )}
                </form>
              </ScrollSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
