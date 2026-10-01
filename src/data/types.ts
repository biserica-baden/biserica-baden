export const languages = ['de', 'ro', 'en', 'fr'] as const;
export type Language = (typeof languages)[number];

export type ServiceKind = 'vespersLitia' | 'matins' | 'liturgy';
export type FeastKey = 'protection';

export interface Copy {
  languageName: string;
  locale: string;
  pageTitle: string;
  description: string;
  skipLink: string;
  parishName: string;
  brandLineOne: string;
  brandLineTwo: string;
  patronsTitle: string;
  patronSaints: string[];
  jurisdiction: string;
  moreomAlt: string;
  languageNav: string;
  mainNav: string;
  navSchedule: string;
  navAddress: string;
  navContact: string;
  scheduleTitle: string;
  nextService: string;
  today: string;
  differentTime: string;
  services: Record<ServiceKind, string>;
  feasts: Record<FeastKey, string>;
  vigil: string;
  sundayAfterPentecost: (number: number) => string;
  scheduleEmpty: string;
  addressTitle: string;
  venueName: string;
  country: string;
  locationText: string;
  mapTitle: string;
  priestName: string;
  phoneLabel: string;
  socialsLabel: string;
  photoAlt: string;
  rights: string;
}
