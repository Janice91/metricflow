"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AGENCIES } from "@/lib/cars";
import { OPTIONS, daysBetween, eur, quote, todayISO } from "@/lib/pricing";

function Widget({ carId, pricePerDay }: { carId: string; pricePerDay: number }) {
  const sp = useSearchParams();
  const router = useRouter();
  const [agence, setAgence] = useState(sp.get("agence") ?? AGENCIES[0].id);
  const [du, setDu] = useState(sp.get("du") ?? todayISO(1));
  const [au, setAu] = useState(sp.get("au") ?? todayISO(4));
  const [opts, setOpts] = useState<string[]>([]);

  const days = daysBetween(du, au);
  const q = quote(pricePerDay, days, opts);
  const toggle = (id: string) => setOpts((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  function go() {
    if (days < 1) return;
    router.push(`/reservation?car=${carId}&agence=${agence}&du=${du}&au=${au}&opts=${opts.join(",")}`);
  }

  return (
    <aside className="card h-fit space-y-5 p-6 shadow-xl shadow-ink/5 lg:sticky lg:top-24">
      <p>
        <span className="font-display text-4xl font-bold">{eur(pricePerDay)}</span>
        <span className="text-muted"> / jour</span>
      </p>
      <div>
        <label className="label" htmlFor="w-ag">Agence</label>
        <select id="w-ag" className="field" value={agence} onChange={(e) => setAgence(e.target.value)}>
          {AGENCIES.map((a) => <option key={a.id} value={a.id}>{a.city}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="w-du">D&#xE9;but</label>
          <input id="w-du" type="date" className="field" min={todayISO()} value={du} onChange={(e) => setDu(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="w-au">Fin</label>
          <input id="w-au" type="date" className="field" min={du} value={au} onChange={(e) => setAu(e.target.value)} />
        </div>
      </div>
      <div>
        <p className="label">Options</p>
        <div className="space-y-2">
          {OPTIONS.map((o) => (
            <label key={o.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${opts.includes(o.id) ? "border-accent bg-accent/5" : "border-line hover:border-ink/40"}`}>
              <input type="checkbox" checked={opts.includes(o.id)} onChange={() => toggle(o.id)} className="h-4 w-4 accent-[#ff5a1f]" />
              <span className="flex-1 text-sm"><b className="block">{o.label}</b><span className="text-muted">{o.desc}</span></span>
              <span className="text-sm font-semibold">+{eur(o.price)}/j</span>
            </label>
          ))}
        </div>
      </div>

      {days > 0 ? (
        <div className="space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between"><span>{eur(pricePerDay)} &#xD7; {days} jour{days > 1 ? "s" : ""}</span><span>{eur(q.base)}</span></div>
          {q.discount > 0 && <div className="flex justify-between text-emerald-600"><span>Remise longue dur&#xE9;e &#x2212;{q.discountPct}%</span><span>&#x2212;{eur(q.discount)}</span></div>}
          {q.options > 0 && <div className="flex justify-between"><span>Options</span><span>{eur(q.options)}</span></div>}
          <div className="flex justify-between border-t border-line pt-3 text-lg font-bold"><span>Total</span><span>{eur(q.total)}</span></div>
        </div>
      ) : (
        <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">La date de fin doit &#xEA;tre apr&#xE8;s la date de d&#xE9;but.</p>
      )}
      <button onClick={go} disabled={days < 1} className="btn btn-primary w-full disabled:opacity-50">R&#xE9;server maintenant</button>
      <p className="text-center text-xs text-muted">Annulation gratuite jusqu&apos;&#xE0; 48h avant &#xB7; Aucun paiement maintenant</p>
    </aside>
  );
}

export default function BookingWidget(props: { carId: string; pricePerDay: number }) {
  return (
    <Suspense fallback={<div className="card h-96 animate-pulse" />}>
      <Widget {...props} />
    </Suspense>
  );
}
