import {
  Stethoscope,
  ShieldCheck,
  Pill,
  Activity,
  Wind,
  HeartPulse,
  TestTube,
  Brain,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  features: string[];
}

export const services: ServiceItem[] = [
  {
    id: 'medical-chests',
    icon: Stethoscope,
    titleKey: 'medicalChests',
    descKey: 'medicalChestsDesc',
    features: ['supplyFeature1', 'supplyFeature2', 'supplyFeature3'],
  },
  {
    id: 'recertification',
    icon: ShieldCheck,
    titleKey: 'recertification',
    descKey: 'recertificationDesc',
    features: ['recertFeature1', 'recertFeature2', 'recertFeature3'],
  },
  {
    id: 'pharmaceuticals',
    icon: Pill,
    titleKey: 'pharmaceuticals',
    descKey: 'pharmaceuticalsDesc',
    features: ['pharmaFeature1', 'pharmaFeature2', 'pharmaFeature3'],
  },
  {
    id: 'medical-equipment',
    icon: Activity,
    titleKey: 'medicalEquipment',
    descKey: 'medicalEquipmentDesc',
    features: ['equipFeature1', 'equipFeature2', 'equipFeature3'],
  },
  {
    id: 'oxygen-services',
    icon: Wind,
    titleKey: 'oxygenServices',
    descKey: 'oxygenServicesDesc',
    features: ['oxyFeature1', 'oxyFeature2', 'oxyFeature3'],
  },
  {
    id: 'telemedical',
    icon: HeartPulse,
    titleKey: 'telemedical',
    descKey: 'telemedicalDesc',
    features: ['teleFeature1', 'teleFeature2', 'teleFeature3'],
  },
  {
    id: 'drug-alcohol',
    icon: TestTube,
    titleKey: 'drugAlcohol',
    descKey: 'drugAlcoholDesc',
    features: ['drugFeature1', 'drugFeature2', 'drugFeature3'],
  },
  {
    id: 'mental-health',
    icon: Brain,
    titleKey: 'mentalHealth',
    descKey: 'mentalHealthDesc',
    features: ['mentalFeature1', 'mentalFeature2', 'mentalFeature3'],
  },
  {
    id: 'reflagging',
    icon: RefreshCw,
    titleKey: 'reflagging',
    descKey: 'reflaggingDesc',
    features: ['reflagFeature1', 'reflagFeature2', 'reflagFeature3'],
  },
];
