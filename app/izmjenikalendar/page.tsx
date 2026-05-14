"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  BedDouble,
  CalendarDays,
  Check,
  ChevronRight,
  Save,
  ShieldCheck,
  X,
} from "lucide-react";

type CalendarDate = {
  date: string;
  price: number;
};

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

export default function IzmjeniKalendarPage() {
  const [availableDates, setAvailableDates] = useState<CalendarDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

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

  function toggleDate(date: string) {
    setSavedMessage("");

    const exists = getDateData(date);

    if (exists) {
      setAvailableDates((prev) => prev.filter((item) => item.date !== date));

      if (selectedDate === date) {
        setSelectedDate(null);
        setPriceInput("");
      }

      return;
    }

    setAvailableDates((prev) =>
      [...prev, { date, price: 100 }].sort((a, b) =>
        a.date.localeCompare(b.date)
      )
    );

    setSelectedDate(date);
    setPriceInput("100");
  }

  function selectDate(date: string) {
    const item = getDateData(date);

    if (!item) return;

    setSelectedDate(date);
    setPriceInput(String(item.price));
    setSavedMessage("");
  }

  function updatePrice() {
    if (!selectedDate) return;

    const price = Number(priceInput);

    if (!price || price <= 0) {
      alert("Unesi ispravnu cijenu.");
      return;
    }

    setAvailableDates((prev) =>
      prev.map((item) =>
        item.date === selectedDate ? { ...item, price } : item
      )
    );

    setSavedMessage("");
  }

  async function saveCalendar() {
    if (!passwordInput) {
      alert("Unesi šifru.");
      return;
    }

    setIsSaving(true);
    setSavedMessage("");

    const response = await fetch("/api/calendar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        availableDates,
        password: passwordInput,
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      alert("Pogrešna šifra.");
      return;
    }

    setSavedMessage("Kalendar je spremljen.");
    setPasswordInput("");
  }

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

  const days = getDaysInMonth(year, month);

  const monthName = new Date(year, month).toLocaleDateString("hr-HR", {
    month: "long",
    year: "numeric",
  });

  const availableThisMonth = days.filter((date) =>
    availableDates.some((item) => item.date === formatDate(date))
  ).length;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f7fb] text-slate-900">
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-emerald-400/20 blur-[120px]" />
          <div className="absolute right-[-40px] top-[90px] h-[280px] w-[280px] rounded-full bg-cyan-400/20 blur-[110px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:38px_38px]" />
        </div>

        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-black shadow-lg shadow-emerald-500/25">
              <BedDouble size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900">
                Villa Lina Sea Breeze
              </div>
              <div className="text-xs text-slate-500">
                Put za Puntice 9A, Ližnjan
              </div>
            </div>
          </a>

          <a
            href="/"
            className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 md:inline-flex"
          >
            Pogledaj stranicu
            <ChevronRight size={16} />
          </a>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-10 pt-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 shadow-sm backdrop-blur">
              <BadgeCheck size={14} />
              Administracija dostupnosti i cijena
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              Izmjena kalendara dostupnosti.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              Klikni na sivi datum da ga dodaš kao dostupan. Klikni na zeleni
              datum za izmjenu cijene. Zeleni datumi i cijene prikazuju se
              gostima na javnoj stranici.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <CalendarDays size={20} />
                </div>
                <div className="mt-4 text-3xl font-bold text-slate-900">
                  {availableThisMonth}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  dostupnih dana ovaj mjesec
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <ShieldCheck size={20} />
                </div>
                <div className="mt-4 text-3xl font-bold text-slate-900">
                  {availableDates.length}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  ukupno označenih termina
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.10)]">
            <div className="border-b border-slate-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                    <CalendarDays size={16} />
                    Kalendar
                  </div>
                  <h2 className="mt-3 text-2xl font-bold capitalize text-slate-900 md:text-3xl">
                    {monthName}
                  </h2>
                </div>

                <div className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700">
                  {availableThisMonth} dostupno
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={prevMonth}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Nazad
                </button>

                <button
                  onClick={nextMonth}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Dalje
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400">
                {["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-7 gap-2">
                {days.map((date) => {
                  const key = formatDate(date);
                  const dateData = getDateData(key);
                  const available = Boolean(dateData);
                  const selected = selectedDate === key;

                  return (
                    <button
                      key={key}
                      onClick={() => {
                        if (available) {
                          selectDate(key);
                        } else {
                          toggleDate(key);
                        }
                      }}
                      className={`group flex h-16 flex-col items-center justify-center rounded-2xl text-sm font-bold transition ${
                        available
                          ? selected
                            ? "bg-slate-900 text-white shadow-[0_14px_30px_rgba(15,23,42,0.22)]"
                            : "bg-emerald-500 text-white shadow-[0_14px_30px_rgba(16,185,129,0.28)] hover:bg-emerald-600"
                          : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                      }`}
                    >
                      <span>{date.getDate()}</span>

                      {available && (
                        <span className="mt-0.5 text-[10px] font-semibold opacity-90">
                          {dateData?.price}€
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Cijena termina
                </div>

                {selectedDate ? (
                  <>
                    <div className="mt-3 text-lg font-bold text-slate-900">
                      {new Date(selectedDate).toLocaleDateString("hr-HR")}
                    </div>

                    <div className="mt-4 flex gap-3">
                      <input
                        type="number"
                        min="1"
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400"
                        placeholder="Cijena u €"
                      />

                      <button
                        onClick={updatePrice}
                        className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Ažuriraj
                      </button>
                    </div>

                    <button
                      onClick={() => toggleDate(selectedDate)}
                      className="mt-3 w-full rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Ukloni datum iz dostupnosti
                    </button>
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Odaberi zeleni datum za izmjenu cijene. Klik na sivi datum
                    dodaje novi termin s početnom cijenom od 100€.
                  </p>
                )}
              </div>

              <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Šifra za spremanje
                </div>

                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="mt-4 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400"
                  placeholder="Unesi šifru"
                />
              </div>

              {savedMessage && (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  {savedMessage}
                </div>
              )}

              <button
                onClick={saveCalendar}
                disabled={isSaving}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(16,185,129,0.25)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />
                {isSaving ? "Spremanje..." : "Spremi kalendar"}
              </button>

              <a
                href="/"
                className="mt-4 flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Pogledaj javnu stranicu
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}