import type { FeastKey, ServiceKind } from './types';

const mapPlace =
  '!1m18!1m12!1m3!1d2695.9691128742124!2d8.252084077510897!3d47.49051507117945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47906b00609b4fa1:0xd5babf3ae73e4368!2zQmlzZXJpY2EgT3J0b2RveMSDIFJvbcOibsSDIEJhZGVuIEVsdmXIm2lh!5e0';

export const parish = {
  officialName: 'Biserica Ortodoxă Română Baden',
  venueLocalName: 'Katholische Kirche Turgi',
  street: 'Weichlenstrasse',
  postcode: '5300',
  town: 'Turgi',
  telephone: '+41789097998',
  telephoneDisplay: '+41 78 909 79 98',
  email: 'biserica.baden@gmail.com',
  website: 'https://bisericabaden.ch/',
  source: 'https://sway.cloud.microsoft/X37U2Yn8EICzXBw4',
  instagram: 'https://www.instagram.com/biserica.baden/',
  facebook: 'https://www.facebook.com/biserica.baden/',
  whatsapp: 'https://wa.me/41789097998',
  // Same Google Maps place that the parish embeds in its Sway page.
  mapEmbed: (language: string) =>
    `https://www.google.com/maps/embed?pb=${mapPlace}!3m2!1s${language}!2sch!4v1736632069342!5m2!1s${language}!2sch`,
  mapLink: 'https://maps.google.com/?cid=15400832135455458152',
  photoSource:
    'https://eus-cdn.sway.static.microsoft/s/X37U2Yn8EICzXBw4/images/BQrP1ognp2oO3W?quality=1600&allowAnimation=false',
  photoPublicationApproved: true,
  metropolisWebsite: 'https://www.mitropolia.eu/',
  metropolisCrestSource:
    'https://www.mitropolia.eu/uploads/image/Logouri/STEMA%20MOREOM%202018.jpg',
  metropolisCrestPublicationApproved: true,
  saintIconSource:
    'https://commons.wikimedia.org/wiki/File:Ikone_Athanasius_von_Alexandria.jpg',
} as const;

type Occasion =
  | { type: 'sundayAfterPentecost'; number: number }
  | { type: 'feast'; feast: FeastKey; vigil: boolean };

interface ScheduleEntry {
  date: string;
  occasion: Occasion;
  changedTime?: boolean;
  services: { kind: ServiceKind; time: string }[];
}

// Source: the parish Sway, "Programul slujbelor pentru luna octombrie".
// Sunday numbering cross-checked with doxologia.ro/calendar-ortodox/202610.
export const schedule: {
  timeZone: string;
  month: number;
  year: number;
  serviceDurationMinutes: number;
  entries: ScheduleEntry[];
} = {
  timeZone: 'Europe/Zurich',
  month: 10,
  year: 2026,
  serviceDurationMinutes: 150,
  entries: [
    {
      date: '2026-09-30',
      occasion: { type: 'feast', feast: 'protection', vigil: true },
      services: [
        { kind: 'vespersLitia', time: '18:00' },
        { kind: 'matins', time: '19:30' },
        { kind: 'liturgy', time: '21:00' },
      ],
    },
    {
      date: '2026-10-04',
      occasion: { type: 'sundayAfterPentecost', number: 19 },
      services: [
        { kind: 'matins', time: '08:30' },
        { kind: 'liturgy', time: '10:30' },
      ],
    },
    {
      date: '2026-10-11',
      occasion: { type: 'sundayAfterPentecost', number: 21 },
      changedTime: true,
      services: [{ kind: 'liturgy', time: '12:00' }],
    },
    {
      date: '2026-10-18',
      occasion: { type: 'sundayAfterPentecost', number: 20 },
      services: [
        { kind: 'matins', time: '08:30' },
        { kind: 'liturgy', time: '10:30' },
      ],
    },
    {
      date: '2026-10-25',
      occasion: { type: 'sundayAfterPentecost', number: 23 },
      services: [
        { kind: 'matins', time: '08:30' },
        { kind: 'liturgy', time: '10:30' },
      ],
    },
  ],
};

function zonedTimeToUtc(date: string, time: string, timeZone: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const wallClock = Date.UTC(year, month - 1, day, hour, minute);
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const offsetAt = (instant: number) => {
    const parts = Object.fromEntries(
      formatter.formatToParts(new Date(instant)).map((part) => [part.type, part.value]),
    );
    const asUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );
    return asUtc - instant;
  };
  const firstPass = wallClock - offsetAt(wallClock);
  return new Date(wallClock - offsetAt(firstPass));
}

const weekdayIn = (instant: Date, timeZone: string) =>
  new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long' }).format(instant);

export const scheduleEntries = schedule.entries.map((entry) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
    throw new Error(`Invalid service date: ${entry.date}`);
  }
  for (const service of entry.services) {
    if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(service.time)) {
      throw new Error(`Invalid service time on ${entry.date}: ${service.time}`);
    }
  }
  const starts = entry.services.map((service) =>
    zonedTimeToUtc(entry.date, service.time, schedule.timeZone),
  );
  const start = starts[0];
  const end = new Date(starts[starts.length - 1].getTime() + schedule.serviceDurationMinutes * 60_000);
  if (entry.occasion.type === 'sundayAfterPentecost' && weekdayIn(start, schedule.timeZone) !== 'Sunday') {
    throw new Error(`${entry.date} is labelled as a Sunday but is not one.`);
  }
  return { ...entry, start, end };
});

for (let index = 1; index < scheduleEntries.length; index += 1) {
  if (scheduleEntries[index].start <= scheduleEntries[index - 1].start) {
    throw new Error('Schedule entries must be in chronological order.');
  }
}
