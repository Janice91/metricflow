"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CARS, CATEGORIES, FUELS, AGENCIES, type Category, type Fuel } from "@/lib/cars";
import { daysBetween, eur } from "@/lib/pricing";
import CarCard from "@/components/CarCard";
import SearchForm from "@/components/SearchForm";

export default function Catalogue() {
  const sp = useSearchParams();
  const initialCat = sp.get("cat") as Category | null;
  const [cat, setCat] = useState<Category | "">(initialCat && CATEGORIES.includes(initialCat) ? initialCat : "");
  const [fuel, setFuel] = useState<Fuel | "">("");
  const [gearbox, setGearbox] = useState("");
  const [seats, setSeats] = useState(0);
  const [max, setMax] = useState(1600);
  const [sort, setSort] = useState("price-asc");

  const agence = sp.get("agence");
  const du = sp.get("du") ?? "";
  const au = sp.get("au") ?? "";
  const days = daysBetween(du, au);
  const agencyName = AGENCIES.find((a) => a.id === agence)?.city;
  const qs = agence && du && au ? `?agence=${agence}&du=${du}&au=${au}` : "";

  const list = useMemo(() => {
    const l = CARS.filter(
      (c) =>
        (!cat || c.category === cat) &&
        (!fuel || c.fuel === fuel) &&
        (!gearbox || c.gearbox === gearbox) &&
        c.seats >= seats &&
        c.pricePerDay <= max
    );
    const s = { "price-asc": (a: typeof CARS[0], b: typeof CARS[0]) => a.pricePerDay - b.pricePerDay,
      "price-desc": (a: typeof CARS[0], b: typeof CARS[0]) => b.pricePerDay - a.pricePerDay,
      rating: (a: typeof CARS[0], b: typeof CARS[0]) => b.rating - a.rating }[sort]!;
    return [...l].sort(s);
  }, [cat, fuel, gearbox, seats, max, sort]);

  function reset() { setCat(""); setFuel(""); setGearbox(""); setSeats(0); setMax(1600); }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="font-display text-4xl font-bold">Nos voitures</h1>
      {days > 0 ? (
        <p className="mt-2 text-muted">
          Retrait &#xE0; <b className="text-ink">{agencyName}</b> &#xB7; {days} jour{days > 1 ? "s" : ""} &#xB7; prix affich&#xE9;s par jour
        </p>
      ) : (
        <p className="mt-2 text-muted">Choisissez vos dates pour voir le prix total.</p>
      )}

      <div className="mt-6"><SearchForm /></div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="card h-fit space-y-5 p-5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Filtres</h2>
            <button onClick={reset} className="text-sm text-accent hover:underline">R&#xE9;initialiser</button>
          </div>
          <div>
            <label className="label">Cat&#xE9;gorie</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCat(cat === c ? "" : c)}
                  className={`rounded-full border px-3 py-1 text-sm transition ${cat === c ? "border-ink bg-ink text-white" : "border-line hover:border-ink"}`}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="label" htmlFor="fuel">Carburant</label>
            <select id="fuel" className="field" value={fuel} onChange={(e) => setFuel(e.target.value as Fuel | "")}>
              <option value="">Tous</option>
              {FUELS.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="gb">Bo&#xEE;te</label>
            <select id="gb" className="field" value={gearbox} onChange={(e) => setGearbox(e.target.value)}>
              <option value="">Toutes</option><option>Auto</option><option>Manuelle</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="seats">Places minimum</label>
            <select id="seats" className="field" value={seats} onChange={(e) => setSeats(Number(e.target.value))}>
              <option value={0}>Peu importe</option><option value={4}>4+</option><option value={5}>5+</option><option value={6}>6</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="max">Prix max : {eur(max)} / jour</label>
            <input id="max" type="range" min={300} max={1600} step={50} value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full accent-[#b98a2e]" />
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted"><b className="text-ink">{list.length}</b> voiture{list.length > 1 ? "s" : ""} disponible{list.length > 1 ? "s" : ""}</p>
            <select aria-label="Trier" className="field !w-auto" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix d&#xE9;croissant</option>
              <option value="rating">Mieux not&#xE9;es</option>
            </select>
          </div>
          {list.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-4xl">&#x1F50D;</p>
              <p className="mt-3 font-semibold">Aucune voiture ne correspond</p>
              <button onClick={reset} className="btn btn-dark mt-5">R&#xE9;initialiser les filtres</button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
              {list.map((c) => <CarCard key={c.id} car={c} qs={qs} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
