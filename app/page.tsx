"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  BedDouble,
  Bath,
  Snowflake,
  Tv,
  Flame,
  Waves,
  MapPin,
  CalendarDays,
  Check,
  Users,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Phone,
  Globe,
  Star,
  ShieldCheck,
  Home,
  TreePalm,
  Car,
} from "lucide-react";

type Lang = "hr" | "en" | "de";

type CalendarDate = {
  date: string;
  price: number;
};

const PHONE_DISPLAY = "+386 31 555 512";
const PHONE_TEL = "+38631555512";
const WHATSAPP_URL = "https://wa.me/38631555512";

const APARTMENT_IMAGES = [
  "/apartman/slika3.jpeg",
  "/apartman/slika2.jpeg",
  "/apartman/slika1.jpeg",
  "/apartman/slika4.jpeg",
  "/apartman/slika5.jpeg",
];

const CAROUSEL_IMAGES = [
  "/apartman/slika6.jpeg",
  "/apartman/slika7.jpeg",
  "/apartman/slika8.jpeg",
  "/apartman/slika10.jpeg",
  "/apartman/slika11.jpeg",
  "/apartman/slika12.jpeg",
  "/apartman/slika13.jpeg",
  "/apartman/slika14.jpeg",
  "/apartman/slika15.jpeg",
  "/apartman/slika16.jpeg",
  "/apartman/slika17.jpeg",
  "/apartman/slika20.jpeg",
  "/apartman/slika21.jpeg",
  "/apartman/slika24.jpeg",
  "/apartman/slika25.jpeg",
];

const text = {
  hr: {
    nav: {
      about: "Vila",
      gallery: "Galerija",
      availability: "Dostupnost",
      location: "Lokacija",
      contact: "Kontakt",
    },
    badge: "Privatna vila · Bazen · Istra · Ližnjan",
    title: "Villa Lina Sea Breeze za opušten odmor u Ližnjanu.",
    subtitle:
      "Moderna vila s privatnim bazenom, vrtom, terasom, dvije spavaće sobe, tri kupaonice i potpuno opremljenom kuhinjom.",
    ctaPrimary: "Pogledaj dostupnost",
    ctaSecondary: "Kontaktiraj domaćina",
    address: "Put za Puntice 9A, Ližnjan",
    stats: ["6 osoba", "107 m²", "2 spavaće sobe", "3 kupaonice"],
    galleryBadge: "Galerija",
    galleryTitle: "Villa Lina Sea Breeze kroz fotografije.",
    aboutBadge: "O vili",
    aboutTitle: "Privatna vila za miran i udoban boravak.",
    aboutText:
      "Villa Lina Sea Breeze nalazi se u Ližnjanu, na adresi Put za Puntice 9A. Vila je idealna za obitelj ili grupu do 6 osoba te nudi privatni bazen, vrt, terasu, besplatan WiFi, klimu, dnevni boravak, TV ravnog ekrana i potpuno opremljenu kuhinju s pećnicom i perilicom posuđa. More je udaljeno oko 800 m, plaža oko 1 km, restoran 200 m, trgovina 600 m, ljekarna 500 m, a marina oko 800 m.",
    amenities: [
      "Privatni bazen",
      "Vrt 70 m²",
      "2 spavaće sobe",
      "3 kupaonice",
      "Kapacitet do 6 osoba",
      "Besplatan WiFi i TV",
      "Klima",
      "Kuhinja s pećnicom",
      "Perilica posuđa",
      "Privatni parking",
    ],
    availabilityBadge: "Kalendar",
    availabilityTitle: "Dostupni termini",
    prev: "Nazad",
    next: "Dalje",
    days: ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"],
    availabilityNote:
      "Zeleni datumi su trenutno dostupni. Cijena je prikazana po noćenju.",
    whatsapp: "Kontaktiraj na WhatsApp",
    call: "Nazovi sada",
    locationBadge: "Lokacija",
    locationTitle: "Lokacija vile",
    reviewsBadge: "Recenzije",
    reviewsTitle: "Iskustva gostiju.",
    reviews: [
      {
        name: "Ivana M.",
        text: "Prekrasna vila, mirna lokacija i odličan bazen. Sve je bilo uredno i spremno za dolazak.",
      },
      {
        name: "Thomas R.",
        text: "Beautiful villa, quiet area and very easy communication with the host.",
      },
      {
        name: "Ana i Luka",
        text: "Odličan izbor za obiteljski odmor. Prostrano, moderno i blizu svega što treba.",
      },
    ],
    carouselBadge: "Fotografije",
    carouselTitle: "Još fotografija vile",
    contactBadge: "Upiti",
    contactTitle: "Želite provjeriti termin ili cijenu?",
    contactText:
      "Za dostupnost, cijene za 2026. i dodatna pitanja kontaktirajte domaćina direktno putem poziva ili WhatsAppa.",
    footerText: "Premium prezentacija privatne vile u Ližnjanu.",
    madeBy: "Napravljeno od",
  },
  en: {
    nav: {
      about: "Villa",
      gallery: "Gallery",
      availability: "Availability",
      location: "Location",
      contact: "Contact",
    },
    badge: "Private villa · Pool · Istria · Ližnjan",
    title: "Villa Lina Sea Breeze for a relaxing stay in Ližnjan.",
    subtitle:
      "A modern villa with a private pool, garden, terrace, two bedrooms, three bathrooms and a fully equipped kitchen.",
    ctaPrimary: "Check availability",
    ctaSecondary: "Contact the host",
    address: "Put za Puntice 9A, Ližnjan",
    stats: ["6 guests", "107 m²", "2 bedrooms", "3 bathrooms"],
    galleryBadge: "Gallery",
    galleryTitle: "Discover Villa Lina Sea Breeze through photos.",
    aboutBadge: "About the villa",
    aboutTitle: "A private villa for a peaceful and comfortable stay.",
    aboutText:
      "Villa Lina Sea Breeze is located in Ližnjan, at Put za Puntice 9A. The villa is ideal for a family or a group of up to 6 guests and offers a private pool, garden, terrace, free WiFi, air conditioning, a living room, flat-screen TV and a fully equipped kitchen with an oven and dishwasher. The sea is around 800 m away, the beach around 1 km, restaurant 200 m, grocery store 600 m, pharmacy 500 m and marina around 800 m.",
    amenities: [
      "Private pool",
      "70 m² garden",
      "2 bedrooms",
      "3 bathrooms",
      "Up to 6 guests",
      "Free WiFi and TV",
      "Air conditioning",
      "Kitchen with oven",
      "Dishwasher",
      "Private parking",
    ],
    availabilityBadge: "Calendar",
    availabilityTitle: "Available dates",
    prev: "Previous",
    next: "Next",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    availabilityNote:
      "Green dates are currently available. The price is shown per night.",
    whatsapp: "Contact on WhatsApp",
    call: "Call now",
    locationBadge: "Location",
    locationTitle: "Villa location",
    reviewsBadge: "Reviews",
    reviewsTitle: "Guest experiences.",
    reviews: [
      {
        name: "Ivana M.",
        text: "A beautiful villa, quiet location and a great pool. Everything was clean and ready for our arrival.",
      },
      {
        name: "Thomas R.",
        text: "Beautiful villa, quiet area and very easy communication with the host.",
      },
      {
        name: "Anna & Luke",
        text: "A great choice for a family holiday. Spacious, modern and close to everything you need.",
      },
    ],
    carouselBadge: "Photos",
    carouselTitle: "More villa photos",
    contactBadge: "Inquiries",
    contactTitle: "Want to check dates or prices?",
    contactText:
      "For availability, 2026 prices and additional questions, contact the host directly by phone or WhatsApp.",
    footerText: "Premium presentation for a private villa in Ližnjan.",
    madeBy: "Made by",
  },
  de: {
    nav: {
      about: "Villa",
      gallery: "Galerie",
      availability: "Verfügbarkeit",
      location: "Lage",
      contact: "Kontakt",
    },
    badge: "Private Villa · Pool · Istrien · Ližnjan",
    title: "Villa Lina Sea Breeze für einen entspannten Urlaub in Ližnjan.",
    subtitle:
      "Eine moderne Villa mit privatem Pool, Garten, Terrasse, zwei Schlafzimmern, drei Badezimmern und voll ausgestatteter Küche.",
    ctaPrimary: "Verfügbarkeit prüfen",
    ctaSecondary: "Gastgeber kontaktieren",
    address: "Put za Puntice 9A, Ližnjan",
    stats: ["6 Gäste", "107 m²", "2 Schlafzimmer", "3 Badezimmer"],
    galleryBadge: "Galerie",
    galleryTitle: "Entdecken Sie Villa Lina Sea Breeze in Bildern.",
    aboutBadge: "Über die Villa",
    aboutTitle: "Eine private Villa für einen ruhigen und komfortablen Aufenthalt.",
    aboutText:
      "Villa Lina Sea Breeze befindet sich in Ližnjan, Put za Puntice 9A. Die Villa ist ideal für Familien oder Gruppen bis zu 6 Personen und bietet einen privaten Pool, Garten, Terrasse, kostenloses WLAN, Klimaanlage, Wohnzimmer, Flachbild-TV und eine voll ausgestattete Küche mit Backofen und Geschirrspüler. Das Meer ist ca. 800 m entfernt, der Strand ca. 1 km, ein Restaurant 200 m, ein Geschäft 600 m, eine Apotheke 500 m und die Marina ca. 800 m.",
    amenities: [
      "Privater Pool",
      "70 m² Garten",
      "2 Schlafzimmer",
      "3 Badezimmer",
      "Bis zu 6 Gäste",
      "Kostenloses WLAN und TV",
      "Klimaanlage",
      "Küche mit Backofen",
      "Geschirrspüler",
      "Privater Parkplatz",
    ],
    availabilityBadge: "Kalender",
    availabilityTitle: "Verfügbare Termine",
    prev: "Zurück",
    next: "Weiter",
    days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    availabilityNote:
      "Grüne Daten sind derzeit verfügbar. Der Preis wird pro Nacht angezeigt.",
    whatsapp: "Über WhatsApp kontaktieren",
    call: "Jetzt anrufen",
    locationBadge: "Lage",
    locationTitle: "Lage der Villa",
    reviewsBadge: "Bewertungen",
    reviewsTitle: "Erfahrungen unserer Gäste.",
    reviews: [
      {
        name: "Ivana M.",
        text: "Eine wunderschöne Villa, ruhige Lage und ein toller Pool. Alles war sauber und vorbereitet.",
      },
      {
        name: "Thomas R.",
        text: "Beautiful villa, quiet area and very easy communication with the host.",
      },
      {
        name: "Anna & Luka",
        text: "Eine tolle Wahl für einen Familienurlaub. Geräumig, modern und in der Nähe von allem, was man braucht.",
      },
    ],
    carouselBadge: "Fotos",
    carouselTitle: "Weitere Fotos der Villa",
    contactBadge: "Anfragen",
    contactTitle: "Möchten Sie Termine oder Preise prüfen?",
    contactText:
      "Für Verfügbarkeit, Preise für 2026 und weitere Fragen kontaktieren Sie den Gastgeber direkt per Telefon oder WhatsApp.",
    footerText: "Premium-Präsentation einer privaten Villa in Ližnjan.",
    madeBy: "Erstellt von",
  },
} as const;

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function getDaysInMonth(year: number, month: number) {
  const days = [];
  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
}

function AmenityIcon({ index }: { index: number }) {
  const icons = [
    Waves,
    TreePalm,
    BedDouble,
    Bath,
    Users,
    Tv,
    Snowflake,
    Utensils,
    Home,
    Car,
  ];

  const Icon = icons[index] ?? Check;

  return <Icon size={20} />;
}

export default function ApartmanPage() {
  const [lang, setLang] = useState<Lang>("hr");
  const [availableDates, setAvailableDates] = useState<CalendarDate[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const t = text[lang];

  useEffect(() => {
    async function loadCalendar() {
      const response = await fetch("/api/calendar", {
        cache: "no-store",
      });

      const data = await response.json();

      setAvailableDates(data.availableDates ?? []);
    }

    loadCalendar();
  }, []);

  function getDateData(date: string) {
    return availableDates.find((item) => item.date === date);
  }

  const days = getDaysInMonth(year, month);

  const monthName = new Date(year, month).toLocaleDateString(
    lang === "hr" ? "hr-HR" : lang === "de" ? "de-DE" : "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function nextSlide() {
    setCarouselIndex((prev) =>
      prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1
    );
  }

  function prevSlide() {
    setCarouselIndex((prev) =>
      prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f7fb] text-slate-900">
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-emerald-400/20 blur-[120px]" />
          <div className="absolute right-[-40px] top-[90px] h-[280px] w-[280px] rounded-full bg-cyan-400/20 blur-[110px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:38px_38px]" />
        </div>

        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/25">
              <Home size={20} strokeWidth={2.4} />
            </div>

            <div>
              <div className="text-lg font-semibold text-slate-900">
                Villa Lina Sea Breeze
              </div>
              <div className="text-xs text-slate-500">Private Villa & Pool</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#about" className="hover:text-slate-900">
              {t.nav.about}
            </a>
            <a href="#gallery" className="hover:text-slate-900">
              {t.nav.gallery}
            </a>
            <a href="#availability" className="hover:text-slate-900">
              {t.nav.availability}
            </a>
            <a href="#location" className="hover:text-slate-900">
              {t.nav.location}
            </a>
            <a href="#contact" className="hover:text-slate-900">
              {t.nav.contact}
            </a>
          </nav>

          <div className="flex shrink-0 items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            {(["hr", "en", "de"] as Lang[]).map((item) => (
              <button
                key={item}
                onClick={() => setLang(item)}
                className={`rounded-xl px-2 py-1.5 text-[11px] font-semibold transition md:px-3 md:py-2 md:text-xs ${
                  lang === item
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-10 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 shadow-sm backdrop-blur">
              <BadgeCheck size={14} />
              {t.badge}
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              {t.title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              {t.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#availability"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(15,23,42,0.18)] transition hover:bg-slate-800"
              >
                {t.ctaPrimary}
                <ChevronRight size={16} />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                {t.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.10)]">
              <img
                src={APARTMENT_IMAGES[0]}
                alt="Villa Lina Sea Breeze"
                className="h-[520px] w-full object-cover"
              />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-slate-900">
                      Villa Lina Sea Breeze
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      {t.address}
                    </div>
                  </div>

                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Villa
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {t.stats.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              {t.galleryBadge}
            </div>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
              {t.galleryTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {APARTMENT_IMAGES.map((src, index) => {
              let spanClass = "";

              if (index === 0) spanClass = "md:col-span-2";

              return (
                <div
                  key={src}
                  className={`group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm ${spanClass}`}
                >
                  <img
                    src={src}
                    alt={`Villa Lina Sea Breeze ${index + 1}`}
                    className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#f8fbfd] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              {t.aboutBadge}
            </div>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
              {t.aboutTitle}
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
              {t.aboutText}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {t.amenities.map((label, index) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <AmenityIcon index={index} />
                  </div>

                  <span className="font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside
            id="availability"
            className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
          >
            <div className="flex items-center gap-3">
              <CalendarDays className="text-emerald-600" />
              <h3 className="text-2xl font-bold">{t.availabilityTitle}</h3>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={prevMonth}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold"
              >
                {t.prev}
              </button>

              <div className="text-center text-lg font-bold capitalize">
                {monthName}
              </div>

              <button
                onClick={nextMonth}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold"
              >
                {t.next}
              </button>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400">
              {t.days.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-7 gap-2">
              {days.map((date) => {
                const key = formatDate(date);
                const dateData = getDateData(key);
                const available = Boolean(dateData);

                return (
                  <div
                    key={key}
                    className={`flex h-14 flex-col items-center justify-center rounded-xl text-sm font-bold ${
                      available
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <span>{date.getDate()}</span>

                    {available && (
                      <span className="mt-0.5 text-[10px] font-semibold opacity-90">
                        {dateData?.price}€
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-600">
              <Check size={16} className="text-emerald-600" />
              {t.availabilityNote}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-bold text-white shadow-[0_18px_40px_rgba(16,185,129,0.25)] transition hover:opacity-95"
            >
              {t.whatsapp}
            </a>
          </aside>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  {t.carouselBadge}
                </div>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {t.carouselTitle}
                </h2>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={nextSlide}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                src={CAROUSEL_IMAGES[carouselIndex]}
                alt="Galerija vile"
                className="h-[650px] w-full object-cover transition-all duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 flex gap-2">
                {CAROUSEL_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCarouselIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      carouselIndex === index
                        ? "w-10 bg-white"
                        : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-7">
              {CAROUSEL_IMAGES.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setCarouselIndex(index)}
                  className={`hidden overflow-hidden rounded-[22px] border-2 transition-all md:grid ${
                    carouselIndex === index
                      ? "border-emerald-500"
                      : "border-transparent hover:border-slate-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="hidden h-24 w-full object-cover md:grid"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fbfd] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              {t.reviewsBadge}
            </div>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
              {t.reviewsTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.reviews.map((item) => (
              <div
                key={item.name}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-1 text-emerald-600">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  “{item.text}”
                </p>

                <div className="mt-5 font-semibold text-slate-900">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin className="text-emerald-600" />
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  {t.locationBadge}
                </div>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {t.locationTitle}
                </h2>
              </div>
            </div>

            <p className="mt-4 text-slate-600">{t.address}</p>

            <iframe
              className="mt-6 h-[380px] w-full rounded-[24px]"
              src="https://www.google.com/maps?q=Put%20za%20Puntice%209A%20Li%C5%BEnjan&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              {t.contactBadge}
            </div>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              {t.contactTitle}
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
              {t.contactText}
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Phone size={16} />
                {PHONE_DISPLAY}
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white">
                <MapPin size={16} />
                {t.address}
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white">
                <Globe size={16} />
                HR / EN / DE / SLO
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="rounded-[24px] bg-white/5 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                <ShieldCheck size={22} />
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                Villa Lina Sea Breeze
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/70">
                {t.address}
              </p>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-bold text-white shadow-[0_18px_40px_rgba(16,185,129,0.25)] transition hover:opacity-95"
              >
                {t.whatsapp}
              </a>

              <a
                href={`tel:${PHONE_TEL}`}
                className="mt-3 flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-bold text-white transition hover:bg-white/15"
              >
                {t.call}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Villa Lina Sea Breeze</div>

          <div>{t.footerText}</div>

          <div>
            {t.madeBy}{" "}
            <a
              href="https://snipet.hr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-700 transition hover:text-emerald-600"
            >
              snipet.hr
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}