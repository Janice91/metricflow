"use client";
import { useEffect, useMemo, useState } from "react";
import { cancelBooking } from "@/lib/bookings";
import { eur, fmtDate, todayISO } from "@/lib/pricing";
import { useCatalog } from "@/lib/catalog";
import { loadAllBookings, type AdminBooking } from "@/lib/admin";

export default function ReservationsTab() {
  const { allAgencies, getCar } = useCatalog();
  const [list, setList] = useState<AdminBooking[] | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  useEffect(() => {
    loadAllBookings().then(setList);
  }, []);

  const shown = useMemo(() => {
    const t = todayISO();
    const s = q.trim().toLowerCase();
    return (list ?? []).filter((b) => {
      if (filter === "upcoming" && b.end < t) return false;
      if (filter === "past" && b.end >= t) return false;
      if (!s) return true;
      const car = getCar(b.carId);
      return [b.ref, b.name, b.email, b.phone, car ? `${car.brand} ${car.model}` : b.carId].join(" ").toLowerCase().includes(s);
    });
  }, [list, q, filter, getCar]);

  async function cancel(ref: string) {
    if (!window.confirm("Annuler définitivement la réservation " + ref + " ?")) return;
    await cancelBooking(ref);
    setList(await loadAllBookings());
  }

  const all = list ?? [];
  const t = todayISO();
  const revenue = all.reduce((sum, b) => sum + b.total, 0);
  const upcoming = all.filter((b) => b.end >= t).length;
  const clients = new Set(all.map((b) => b.userId)).size;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Réservations", v: String(all.length) },
          { l: "À venir ou en cours", v: String(upcoming) },
          { l: "Clients", v: String(clients) },
          { l: "Chiffre d'affaires", v: eur(revenue) },
        ].map((s) => (
          <div key={s.l} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">{s.l}</p>
            <p className="font-display mt-1 text-3xl font-bold text-accent">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <input className="field max-w-sm" placeholder="Rechercher (client, e-mail, voiture, n&deg;)" value={q} onChange={(e) => setQ(e.target.value)} />
        {(["all", "upcoming", "past"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`btn !py-2 ${filter === f ? "btn-dark" : "btn-ghost"}`}>
            {f === "all" ? "Toutes" : f === "upcoming" ? "À venir" : "Terminées"}
          </button>
        ))}
      </div>

      {list === null ? (
        <p className="mt-8 text-muted">Chargement&#x2026;</p>
      ) : shown.length === 0 ? (
        <div className="card mt-6 p-10 text-center text-muted">Aucune r&eacute;servation.</div>
      ) : (
        <div className="card mt-6 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="p-4">N&deg;</th>
                <th className="p-4">Client</th>
                <th className="p-4">Voiture</th>
                <th className="p-4">Dates</th>
                <th className="p-4">Retrait</th>
                <th className="p-4 text-right">Total</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {shown.map((b) => {
                const car = getCar(b.carId);
                const ag = allAgencies.find((a) => a.id === b.pickup);
                return (
                  <tr key={b.ref} className="border-b border-line last:border-0">
                    <td className="p-4 font-semibold">{b.ref}</td>
                    <td className="p-4">
                      <div className="font-medium">{b.name}</div>
                      <div className="text-muted">{b.email}</div>
                      <div className="text-muted">{b.phone}</div>
                    </td>
                    <td className="p-4">{car ? `${car.brand} ${car.model}` : b.carId}</td>
                    <td className="p-4">{fmtDate(b.start)} &rarr; {fmtDate(b.end)}</td>
                    <td className="p-4">{ag?.city ?? b.pickup}</td>
                    <td className="p-4 text-right font-semibold">{eur(b.total)}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => cancel(b.ref)} className="rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50">Annuler</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
