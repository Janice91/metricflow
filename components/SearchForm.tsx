"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AGENCIES } from "@/lib/cars";
import { daysBetween, todayISO } from "@/lib/pricing";

export default function SearchForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [agence, setAgence] = useState(AGENCIES[0].id);
  const [du, setDu] = useState(todayISO(1));
  const [au, setAu] = useState(todayISO(4));
  const days = daysBetween(du, au);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (days < 1) return;
    router.push(`/voitures?agence=${agence}&du=${du}&au=${au}`);
  }

  return (
    <form onSubmit={submit} className={`card grid gap-4 p-5 shadow-xl shadow-ink/5 ${compact ? "" : "md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end"}`}>
      <div>
        <label className="label" htmlFor="agence">Agence de retrait</label>
        <select id="agence" className="field" value={agence} onChange={(e) => setAgence(e.target.value)}>
          {AGENCIES.map((a) => (
            <option key={a.id} value={a.id}>{a.city}{a.airport ? " \u2708" : ""}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="du">D&#xE9;but</label>
        <input id="du" type="date" className="field" min={todayISO()} value={du} onChange={(e) => { setDu(e.target.value); if (e.target.value >= au) { const d = new Date(e.target.value + "T00:00:00"); d.setDate(d.getDate() + 1); setAu(d.toISOString().slice(0, 10)); } }} />
      </div>
      <div>
        <label className="label" htmlFor="au">Fin</label>
        <input id="au" type="date" className="field" min={du} value={au} onChange={(e) => setAu(e.target.value)} />
      </div>
      <button type="submit" disabled={days < 1} className="btn btn-primary h-[46px] disabled:opacity-50">
        Rechercher
      </button>
      {days > 0 && <p className="text-sm text-muted md:col-span-4">{days} jour{days > 1 ? "s" : ""} de location</p>}
    </form>
  );
}
