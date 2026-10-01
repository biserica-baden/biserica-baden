import type { Copy, Language } from './types';

const roman = (value: number) => {
  const numerals: [number, string][] = [
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let rest = value;
  let result = '';
  for (const [amount, numeral] of numerals) {
    while (rest >= amount) {
      result += numeral;
      rest -= amount;
    }
  }
  return result;
};

const englishOrdinal = (value: number) => {
  const lastTwo = value % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${value}th`;
  return `${value}${{ 1: 'st', 2: 'nd', 3: 'rd' }[value % 10] ?? 'th'}`;
};

export const copy: Record<Language, Copy> = {
  ro: {
    languageName: 'Română',
    locale: 'ro-RO',
    pageTitle: 'Biserica Ortodoxă Română Baden · Programul Slujbelor',
    description:
      'Biserica Ortodoxă Română Baden, Elveția: programul slujbelor din biserica catolică din Turgi, adresa, harta și datele de contact ale Părintelui Adrian.',
    skipLink: 'Sari la conținut',
    parishName: 'Biserica Ortodoxă Română Baden',
    brandLineOne: 'Biserica Ortodoxă',
    brandLineTwo: 'Română Baden',
    patronsTitle: 'Hramurile parohiei',
    patronSaints: [
      'Sfinții Apostoli Petru și Pavel',
      'Sfântul Atanasie cel Mare',
      'Sfântul Sofian de la Antim',
    ],
    jurisdiction: 'Mitropolia Ortodoxă Română a Europei Occidentale și Meridionale',
    moreomAlt:
      'Stema Mitropoliei Ortodoxe Române a Europei Occidentale și Meridionale (MOREOM).',
    languageNav: 'Alege limba',
    mainNav: 'Navigare principală',
    navSchedule: 'Program',
    navAddress: 'Adresa',
    navContact: 'Contact',
    scheduleTitle: 'Programul Slujbelor',
    nextService: 'Următoarea slujbă',
    today: 'Astăzi',
    differentTime: 'Oră diferită',
    services: {
      vespersLitia: 'Vecernia cu Litie',
      matins: 'Utrenia',
      liturgy: 'Sfânta Liturghie',
    },
    feasts: { protection: 'Acoperământul Maicii Domnului' },
    vigil: 'Priveghere',
    sundayAfterPentecost: (number) =>
      number === 1 ? 'Duminica I după Rusalii' : `Duminica a ${roman(number)}-a după Rusalii`,
    scheduleEmpty:
      'Programul pentru perioada următoare va fi publicat în curând. Pentru informații, îl puteți suna pe Părintele Adrian.',
    addressTitle: 'Adresa',
    venueName: 'Biserica Catolică din Turgi',
    country: 'Elveția',
    locationText: 'Slujbele parohiei noastre au loc în biserica catolică din Turgi.',
    mapTitle: 'Harta Google: Biserica Ortodoxă Română Baden, Turgi',
    priestName: 'Părintele Adrian',
    phoneLabel: 'Telefon',
    socialsLabel: 'Parohia pe rețelele sociale',
    photoAlt: 'Comunitatea Bisericii Ortodoxe Române Baden, împreună cu preoții, în biserică.',
    rights: 'Toate drepturile rezervate.',
  },
  de: {
    languageName: 'Deutsch',
    locale: 'de-CH',
    pageTitle: 'Rumänisch-Orthodoxe Kirche Baden · Gottesdienstplan',
    description:
      'Rumänisch-Orthodoxe Kirche Baden, Schweiz: Gottesdienste in der katholischen Kirche Turgi, Adresse, Karte und Kontakt zu Pfarrer Adrian.',
    skipLink: 'Zum Inhalt springen',
    parishName: 'Rumänisch-Orthodoxe Kirche Baden',
    brandLineOne: 'Rumänisch-Orthodoxe',
    brandLineTwo: 'Kirche Baden',
    patronsTitle: 'Schutzheilige der Gemeinde',
    patronSaints: [
      'Heilige Apostel Petrus und Paulus',
      'Heiliger Athanasius der Grosse',
      'Heiliger Sofian von Antim',
    ],
    jurisdiction: 'Rumänisch-Orthodoxe Metropolie für West- und Südeuropa',
    moreomAlt:
      'Wappen der Rumänisch-Orthodoxen Metropolie für West- und Südeuropa (MOREOM).',
    languageNav: 'Sprache wählen',
    mainNav: 'Hauptnavigation',
    navSchedule: 'Gottesdienste',
    navAddress: 'Adresse',
    navContact: 'Kontakt',
    scheduleTitle: 'Gottesdienstplan',
    nextService: 'Nächster Gottesdienst',
    today: 'Heute',
    differentTime: 'Andere Uhrzeit',
    services: {
      vespersLitia: 'Vesper mit Litija',
      matins: 'Morgengottesdienst (Utrenie)',
      liturgy: 'Göttliche Liturgie',
    },
    feasts: { protection: 'Schutz der Gottesgebärerin' },
    vigil: 'Vigil',
    sundayAfterPentecost: (number) => `${number}. Sonntag nach Pfingsten`,
    scheduleEmpty:
      'Der Gottesdienstplan für die nächste Zeit wird in Kürze veröffentlicht. Für Auskünfte können Sie Pfarrer Adrian anrufen.',
    addressTitle: 'Adresse',
    venueName: 'Katholische Kirche Turgi',
    country: 'Schweiz',
    locationText: 'Die Gottesdienste unserer Gemeinde finden in der katholischen Kirche Turgi statt.',
    mapTitle: 'Google-Karte: Rumänisch-Orthodoxe Kirche Baden, Turgi',
    priestName: 'Pfarrer Adrian',
    phoneLabel: 'Telefon',
    socialsLabel: 'Die Gemeinde in den sozialen Medien',
    photoAlt: 'Die Gemeinde der Rumänisch-Orthodoxen Kirche Baden mit den Priestern in der Kirche.',
    rights: 'Alle Rechte vorbehalten.',
  },
  en: {
    languageName: 'English',
    locale: 'en-GB',
    pageTitle: 'Romanian Orthodox Church Baden · Service Schedule',
    description:
      'Romanian Orthodox Church Baden, Switzerland: services in the Catholic church in Turgi, address, map and contact details for Father Adrian.',
    skipLink: 'Skip to content',
    parishName: 'Romanian Orthodox Church Baden',
    brandLineOne: 'Romanian Orthodox',
    brandLineTwo: 'Church Baden',
    patronsTitle: 'Patron saints of the parish',
    patronSaints: [
      'Holy Apostles Peter and Paul',
      'Saint Athanasius the Great',
      'Saint Sofian of Antim',
    ],
    jurisdiction: 'Romanian Orthodox Metropolis of Western and Southern Europe',
    moreomAlt:
      'Coat of arms of the Romanian Orthodox Metropolis of Western and Southern Europe (MOREOM).',
    languageNav: 'Choose a language',
    mainNav: 'Main navigation',
    navSchedule: 'Services',
    navAddress: 'Address',
    navContact: 'Contact',
    scheduleTitle: 'Service Schedule',
    nextService: 'Next service',
    today: 'Today',
    differentTime: 'Different time',
    services: {
      vespersLitia: 'Vespers with Litiya',
      matins: 'Matins',
      liturgy: 'Divine Liturgy',
    },
    feasts: { protection: 'Protection of the Mother of God' },
    vigil: 'Vigil',
    sundayAfterPentecost: (number) => `${englishOrdinal(number)} Sunday after Pentecost`,
    scheduleEmpty:
      'The schedule for the coming period will be published soon. For information, please call Father Adrian.',
    addressTitle: 'Address',
    venueName: 'Catholic Church of Turgi',
    country: 'Switzerland',
    locationText: 'Our parish services are held in the Catholic church in Turgi.',
    mapTitle: 'Google map: Romanian Orthodox Church Baden, Turgi',
    priestName: 'Father Adrian',
    phoneLabel: 'Telephone',
    socialsLabel: 'The parish on social media',
    photoAlt: 'The community of the Romanian Orthodox Church Baden with the clergy inside the church.',
    rights: 'All rights reserved.',
  },
  fr: {
    languageName: 'Français',
    locale: 'fr-CH',
    pageTitle: 'Église orthodoxe roumaine de Baden · Horaires des offices',
    description:
      'Église orthodoxe roumaine de Baden, Suisse : offices dans l’église catholique de Turgi, adresse, carte et coordonnées du père Adrian.',
    skipLink: 'Aller au contenu',
    parishName: 'Église orthodoxe roumaine de Baden',
    brandLineOne: 'Église orthodoxe',
    brandLineTwo: 'roumaine de Baden',
    patronsTitle: 'Saints patrons de la paroisse',
    patronSaints: [
      'Saints Apôtres Pierre et Paul',
      'Saint Athanase le Grand',
      'Saint Sofian d’Antim',
    ],
    jurisdiction: 'Métropole orthodoxe roumaine d’Europe occidentale et méridionale',
    moreomAlt:
      'Armoiries de la Métropole orthodoxe roumaine d’Europe occidentale et méridionale (MOREOM).',
    languageNav: 'Choisir la langue',
    mainNav: 'Navigation principale',
    navSchedule: 'Offices',
    navAddress: 'Adresse',
    navContact: 'Contact',
    scheduleTitle: 'Horaires des offices',
    nextService: 'Prochain office',
    today: 'Aujourd’hui',
    differentTime: 'Horaire différent',
    services: {
      vespersLitia: 'Vêpres avec litie',
      matins: 'Matines',
      liturgy: 'Divine Liturgie',
    },
    feasts: { protection: 'Protection de la Mère de Dieu' },
    vigil: 'Vigile',
    sundayAfterPentecost: (number) =>
      number === 1 ? '1er dimanche après la Pentecôte' : `${number}e dimanche après la Pentecôte`,
    scheduleEmpty:
      'Le programme de la période suivante sera publié prochainement. Pour tout renseignement, vous pouvez appeler le père Adrian.',
    addressTitle: 'Adresse',
    venueName: 'Église catholique de Turgi',
    country: 'Suisse',
    locationText: 'Les offices de notre paroisse ont lieu dans l’église catholique de Turgi.',
    mapTitle: 'Carte Google : Église orthodoxe roumaine de Baden, Turgi',
    priestName: 'Père Adrian',
    phoneLabel: 'Téléphone',
    socialsLabel: 'La paroisse sur les réseaux sociaux',
    photoAlt: 'La communauté de l’Église orthodoxe roumaine de Baden avec le clergé dans l’église.',
    rights: 'Tous droits réservés.',
  },
};
