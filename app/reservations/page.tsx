"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AGENCIES, getCar } from "@/lib/cars";
import { cancelBooking, loadBookings, type Booking } from "@/lib/bookings";
import { eur, fmtDate, todayISO } from "@/lib/pricing";
import CarIllustration from "@/components/CarIllustration";

export default function MesReservations() {
  const [list, setList] = useState<Booking[] | null>(null);
  useEffect(() => { setList(loadBookings()); }, []);

  function cancel(ref: string) {
    if (!window.confirm("Annuler cette r\u00e9servation ?")) return;
    cancelBooking(ref);
    setList(loadBookings());
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="font-display text-4xl font-bold">Mes r&#xE9;servations</h1>
      {list === null ? (
        <p className="mt-8 text-muted">Chargement&#x2026;</p>
      ) : list.length === 0 ? (
        <div className="card mt-8 p-14 text-center">
          <p className="text-5xl">&#x1F5D3;&#xFE0F;</p>
          <p className="mt-3 text-lg font-semibold">Vous n&apos;avez pas encore de r&#xE9;servation</p>
          <Link href="/voitures" className="btn btn-primary mt-6">R&#xE9;server une voiture</Link>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {list.map((b) => {
            const car = getCar(b.carId);
            if (!car) return null;
            const upcoming = b.start >= todayISO();
            return (
              <article key={b.ref} className="card grid overflow-hidden sm:grid-cols-[220px_1fr]">
                <div className="bg-gradient-to-b from-[#efeadd] to-[#f8f5ee] p-4">
                  <CarIllustration color={car.color} category={car.category} className="w-full" />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="font-display text-2xl font-semibold">{car.brand} {car.model}</h2>
                      <p className="text-sm text-muted">R&#xE9;f. <b className="text-accent">{b.ref}</b></p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${upcoming ? "bg-emerald-100 text-emerald-700" : "bg-ink/10 text-muted"}`}>
                      {upcoming ? "\u00c0 venir" : "Termin\u00e9e"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm">{fmtDate(b.start)} &#x2192; {fmtDate(b.end)}</p>
                  <p className="text-sm text-muted">{AGENCIES.find((a) => a.id === b.pickup)?.city} &#x2192; {AGENCIES.find((a) => a.id === b.dropoff)?.city}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                    <span className="font-display text-xl font-bold">{eur(b.total)}</span>
                    {upcoming && <button onClick={() => cancel(b.ref)} className="text-sm font-semibold text-red-600 hover:underline">Annuler</button>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
