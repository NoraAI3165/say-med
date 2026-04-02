export interface SpecialRegulation {
  id: string;
  category: 'offshore' | 'aviation' | 'dangerous-goods' | 'safety';
  name: string;
  code: string;
  description: string;
  scope: string;
  keyRequirements: string[];
  documents: { name: string; url: string }[];
  applicableTo: string;
}

export const specialRegulations: SpecialRegulation[] = [
  // OFFSHORE
  {
    id: 'dmac-diving',
    category: 'offshore',
    name: 'DMAC Diving Medical',
    code: 'DMAC',
    description: 'Diving Medical Advisory Committee guidelines for medical equipment and supplies on diving support vessels and saturation diving systems.',
    scope: 'Offshore diving operations worldwide',
    keyRequirements: [
      'Diving bell medical kit',
      'Saturation chamber medical supplies',
      'Surface-supplied diving medical equipment',
      'Hyperbaric treatment capability',
      'Emergency evacuation medical supplies',
    ],
    documents: [
      { name: 'DMAC Guidance Documents', url: 'https://www.dmac-diving.org/guidance/' },
    ],
    applicableTo: 'Diving support vessels, saturation diving systems, offshore diving operations',
  },
  {
    id: 'nogepa-installations',
    category: 'offshore',
    name: 'NOGEPA Mining Installations',
    code: 'NOGEPA-MI',
    description: 'Netherlands Oil and Gas Exploration and Production Association standards for medical equipment on offshore mining installations in the Dutch sector.',
    scope: 'Dutch continental shelf offshore installations',
    keyRequirements: [
      'Offshore installation medical room requirements',
      'Emergency medical equipment specifications',
      'Pharmaceutical supply for remote platforms',
      'Medic qualification requirements',
      'Helicopter evacuation medical support',
    ],
    documents: [
      { name: 'NOGEPA Industry Standards', url: 'https://www.nogepa.nl/en/standards/' },
    ],
    applicableTo: 'Offshore platforms, FPSOs, drilling rigs on Dutch continental shelf',
  },
  {
    id: 'nogepa-ssv',
    category: 'offshore',
    name: 'NOGEPA Safety Standby Vessels',
    code: 'NOGEPA-SSV',
    description: 'Medical requirements for safety standby vessels operating in the Dutch sector of the North Sea, including rescue and first response capabilities.',
    scope: 'Safety standby vessels in Dutch North Sea sector',
    keyRequirements: [
      'Rescue vessel medical kit',
      'Hypothermia treatment equipment',
      'Mass casualty supplies',
      'Burns treatment capability',
      'Stretcher and immobilization equipment',
    ],
    documents: [
      { name: 'NOGEPA Safety Standards', url: 'https://www.nogepa.nl/en/standards/' },
    ],
    applicableTo: 'Safety standby vessels, emergency response vessels, offshore rescue craft',
  },
  {
    id: 'errva-rescue',
    category: 'offshore',
    name: 'ERRVA Response & Rescue Vessels',
    code: 'ERRVA',
    description: 'European Rescue & Recovery Vessel Association medical equipment standards for emergency response and rescue vessels operating in European waters.',
    scope: 'Emergency response vessels in European waters',
    keyRequirements: [
      'Mass rescue operation medical supplies',
      'Triage equipment for multiple casualties',
      'Advanced life support capability',
      'Decontamination medical supplies',
      'Thermal protection and treatment',
    ],
    documents: [
      { name: 'ERRVA Standards Overview', url: 'https://www.errva.org/' },
    ],
    applicableTo: 'Emergency response & rescue vessels (ERRVs), standby vessels',
  },
  {
    id: 'eerva-offshore',
    category: 'offshore',
    name: 'EERVA Offshore Installations',
    code: 'EERVA-OI',
    description: 'Medical equipment and medication requirements specifically for offshore installations, covering both permanent platforms and mobile units.',
    scope: 'Offshore installations in European waters',
    keyRequirements: [
      'Sickbay/medical room equipment standards',
      'Controlled drug storage requirements',
      'Telemedicine equipment specifications',
      'Emergency trauma management supplies',
      'Occupational health monitoring equipment',
    ],
    documents: [
      { name: 'EERVA Guidelines', url: 'https://www.errva.org/' },
    ],
    applicableTo: 'Fixed platforms, semi-submersibles, jack-up rigs, FPSOs',
  },

  // DANGEROUS GOODS
  {
    id: 'imdg-mfag',
    category: 'dangerous-goods',
    name: 'IMDG Code / MFAG',
    code: 'IMDG-MFAG',
    description: 'International Maritime Dangerous Goods Code and Medical First Aid Guide requirements for vessels carrying dangerous goods. MFAG provides treatment protocols for chemical exposure incidents.',
    scope: 'All vessels carrying dangerous goods internationally',
    keyRequirements: [
      'MFAG-compliant antidote kit',
      'Chemical exposure treatment supplies',
      'Eye wash stations and decontamination supplies',
      'Specific antidotes per IMDG cargo classification',
      'Emergency shower and wash-down equipment',
    ],
    documents: [
      { name: 'IMO IMDG Code', url: 'https://www.imo.org/en/ourwork/safety/pages/dangerousgoods-default.aspx' },
      { name: 'MFAG Guide (IMO)', url: 'https://www.imo.org/en/publications/Pages/IMDGCode.aspx' },
    ],
    applicableTo: 'Chemical tankers, container ships carrying DG, LPG/LNG carriers',
  },

  // SAFETY
  {
    id: 'lsa-code',
    category: 'safety',
    name: 'Life-Saving Appliances Code',
    code: 'LSA-CODE',
    description: 'IMO International Life-Saving Appliance Code requirements for medical supplies in lifeboats, life rafts, and rescue boats.',
    scope: 'All SOLAS vessels - lifeboat and life raft medical kits',
    keyRequirements: [
      'Lifeboat first aid kit contents',
      'Life raft medical supplies',
      'Rescue boat medical equipment',
      'Anti-seasickness medication',
      'Waterproof medical supply containers',
    ],
    documents: [
      { name: 'IMO LSA Code', url: 'https://www.imo.org/en/ourwork/safety/pages/lifesavingappliances-default.aspx' },
    ],
    applicableTo: 'All SOLAS vessels - lifeboats, life rafts, rescue boats',
  },

  // AVIATION
  {
    id: 'easa-aviation',
    category: 'aviation',
    name: 'EASA Aviation Medical Kits',
    code: 'EASA-MED',
    description: 'European Aviation Safety Agency requirements for medical kits, first aid kits, and emergency medical equipment on commercial aircraft.',
    scope: 'Commercial aircraft operating in European airspace',
    keyRequirements: [
      'First aid kit per EU OPS regulations',
      'Emergency medical kit (EMK) for long-haul flights',
      'Universal precaution kit (UPK)',
      'Automated external defibrillator (AED)',
      'Medication for in-flight medical emergencies',
    ],
    documents: [
      { name: 'EASA Easy Access Rules', url: 'https://www.easa.europa.eu/en/document-library/easy-access-rules' },
      { name: 'EU Regulation 965/2012 (Air Ops)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32012R0965' },
    ],
    applicableTo: 'Commercial airlines, charter operators, helicopter operators in EU',
  },
  {
    id: 'faa-aviation',
    category: 'aviation',
    name: 'FAA Aviation Medical Kits',
    code: 'FAA-MED',
    description: 'Federal Aviation Administration requirements for emergency medical kits on US-registered commercial aircraft.',
    scope: 'US-registered commercial aircraft',
    keyRequirements: [
      'Emergency medical kit per 14 CFR 121.309',
      'First aid kit requirements',
      'AED requirement for large aircraft',
      'Universal precaution kit',
      'Enhanced emergency medical kit for international flights',
    ],
    documents: [
      { name: 'FAA 14 CFR Part 121', url: 'https://www.ecfr.gov/current/title-14/chapter-I/subchapter-G/part-121' },
      { name: 'FAA Advisory Circular 121-33B', url: 'https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC121-33B.pdf' },
    ],
    applicableTo: 'US-registered commercial aircraft, Part 121 carriers',
  },
];

export const regulationCategories = [
  {
    id: 'european',
    nameKey: 'catEuropean',
    description: 'EU Directive 92/29/EEC national implementations',
  },
  {
    id: 'international',
    nameKey: 'catInternational',
    description: 'WHO/ILO based international flag state regulations',
  },
  {
    id: 'offshore',
    nameKey: 'catOffshore',
    description: 'Offshore-specific: DMAC, NOGEPA, ERRVA/EERVA',
  },
  {
    id: 'dangerous-goods',
    nameKey: 'catDangerousGoods',
    description: 'IMDG/MFAG dangerous goods vessel requirements',
  },
  {
    id: 'aviation',
    nameKey: 'catAviation',
    description: 'EASA and FAA aviation medical kit requirements',
  },
  {
    id: 'safety',
    nameKey: 'catSafety',
    description: 'LSA Code lifeboat and life raft medical supplies',
  },
];
