'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
import ScrollSection from '@/components/ScrollSection';
import { ArrowRight, Package, Pill, Stethoscope, Wind, Heart, ShieldPlus } from 'lucide-react';

const categories = [
  { icon: Package, titleKey: 'catChests', descKey: 'catChestsDesc', items: ['catChestsItem1', 'catChestsItem2', 'catChestsItem3', 'catChestsItem4'] },
  { icon: ShieldPlus, titleKey: 'catFirstAid', descKey: 'catFirstAidDesc', items: ['catFirstAidItem1', 'catFirstAidItem2', 'catFirstAidItem3'] },
  { icon: Stethoscope, titleKey: 'catEquipment', descKey: 'catEquipmentDesc', items: ['catEquipmentItem1', 'catEquipmentItem2', 'catEquipmentItem3', 'catEquipmentItem4'] },
  { icon: Pill, titleKey: 'catPharma', descKey: 'catPharmaDesc', items: ['catPharmaItem1', 'catPharmaItem2', 'catPharmaItem3'] },
  { icon: Wind, titleKey: 'catOxygen', descKey: 'catOxygenDesc', items: ['catOxygenItem1', 'catOxygenItem2', 'catOxygenItem3'] },
  { icon: Heart, titleKey: 'catEmergency', descKey: 'catEmergencyDesc', items: ['catEmergencyItem1', 'catEmergencyItem2', 'catEmergencyItem3'] },
];

export default function ProductsPage() {
  const t = useTranslations('products');

  return (
    <div className="pt-20">
      <section className="relative bg-navy py-20 lg:py-28 overflow-hidden">
        <Image
          src="/images/medical-supplies.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">{t('title')}</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <ScrollSection key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-xl transition-all duration-300 bg-white">
                <div className="w-14 h-14 rounded-xl bg-navy/5 group-hover:bg-gold/10 flex items-center justify-center mb-6 transition-colors">
                  <cat.icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{t(cat.titleKey)}</h3>
                <p className="text-gray-500 mb-6">{t(cat.descKey)}</p>
                <ul className="space-y-2 mb-6">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-3 transition-all"
                >
                  {t('requestQuote')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </ScrollSection>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">{t('customTitle')}</h2>
          <p className="text-gray-500 mb-8">{t('customDesc')}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-light transition-all"
          >
            {t('contactUs')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
