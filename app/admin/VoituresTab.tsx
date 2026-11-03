"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, FUELS, type Car } from "@/lib/cars";
import { useCatalog } from "@/lib/catalog";
import { deleteCar, importDefaultCars, saveCar, slugify } from "@/lib/catalogAdmin";
import { eur } from "@/lib/pricing";
import CarPhoto from "@/components/CarPhoto";

const EMPTY: Car = {
  id: "", brand: "", model: "", category: "Sport", year: new Date().getFullYear(), pricePerDay: 300,
  seats: 4, doors: 4, gearbox: "Auto", fuel: "Essence", luggage: 2, color: "#475569",
  rating: 4.8, reviews: 0, badge: "", imageUrl: "", description: "", features: [], active: true,
};

export default function VoituresTab() {
  const { allCars, carsFromDb } = useCatalog();
  const router = useRouter();
  const [form, setForm] = useState<Car | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [featuresText, setFeaturesText] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function run(fn: () => Promise<string | null>): Promise<boolean> {
    setBusy(true);
    setError("");
    const err = await fn();
    setBusy(false);
    if (err) {
      setError(err);
      return false;
    }
    router.refresh();
    return true;
  }

  function openNew() {
    setForm({ ...EMPTY });
    setIsNew(true);
    setFeaturesText("");
    setError("");
  }
  function openEdit(c: Car) {
    setForm({ ...c });
    setIsNew(false);
    setFeaturesText(c.features.join(", "));
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const set = <K extends keyof Car>(k: K, v: Car[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const car: Car = { ...form, features: featuresText.split(/[,\n]/).map((s) => s.trim()).filter(Boolean) };
    let position = allCars.findIndex((c) => c.id === car.id);
    if (isNew) {
      const base = slugify(car.brand + " " + car.model) || "voiture";
      let id = base;
      let n = 2;
      while (allCars.some((c) => c.id === id)) id = base + "-" + n++;
      car.id = id;
      position = allCars.length;
    }
    if (await run(() => saveCar(car, position))) setForm(null);
  }

  async function toggle(c: Car) {
    await run(() => saveCar({ ...c, active: c.active === false }, allCars.findIndex((x) => x.id === c.id)));
  }

  async function remove(c: Car) {
    if (!window.confirm("Supprimer " + c.brand + " " + c.model + " ? Les réservations déjà faites restent enregistrées. (Pour juste la cacher, utilise le bouton Masquer.)")) return;
    await run(() => deleteCar(c.id));
  }

  if (!carsFromDb) {
    return (
      <div className="card p-8">
        <h2 className="font-display text-2xl font-semibold">Voitures</h2>
        <p className="mt-2 text-muted">
          Pour l&apos;instant, les {allCars.length} voitures viennent du code du site. Pour pouvoir les modifier, il faut d&apos;abord les copier dans la base de donn&eacute;es. C&apos;est &agrave; faire une seule fois.
        </p>
        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={busy} onClick={() => run(importDefaultCars)} className="btn btn-primary mt-5 disabled:opacity-60">
          Importer les {allCars.length} voitures dans la base
        </button>
        <p className="mt-3 text-xs text-muted">Si &ccedil;a affiche une erreur, v&eacute;rifie que le SQL des tables a bien &eacute;t&eacute; ex&eacute;cut&eacute; dans Supabase.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted">{allCars.length} voitures &middot; {allCars.filter((c) => c.active !== false).length} visibles sur le site</p>
        <button onClick={openNew} className="btn btn-primary !py-2">+ Ajouter une voiture</button>
      </div>

      {form && (
        <form onSubmit={submit} className="card mt-6 space-y-5 p-6">
          <h2 className="font-display text-2xl font-semibold">{isNew ? "Nouvelle voiture" : "Modifier " + form.brand + " " + form.model}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div><label className="label">Marque</label><input required className="field" value={form.brand} onChange={(e) => set("brand", e.target.value)} /></div>
            <div><label className="label">Mod&egrave;le</label><input required className="field" value={form.model} onChange={(e) => set("model", e.target.value)} /></div>
            <div>
              <label className="label">Cat&eacute;gorie</label>
              <select className="field" value={form.category} onChange={(e) => set("category", e.target.value as Car["category"])}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="label">Prix par jour (&euro;)</label><input required type="number" min={1} className="field" value={form.pricePerDay} onChange={(e) => set("pricePerDay", Number(e.target.value))} /></div>
            <div><label className="label">Ann&eacute;e</label><input required type="number" min={1990} className="field" value={form.year} onChange={(e) => set("year", Number(e.target.value))} /></div>
            <div>
              <label className="label">Carburant</label>
              <select className="field" value={form.fuel} onChange={(e) => set("fuel", e.target.value as Car["fuel"])}>
                {FUELS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Bo&icirc;te</label>
              <select className="field" value={form.gearbox} onChange={(e) => set("gearbox", e.target.value as Car["gearbox"])}>
                <option>Auto</option>
                <option>Manuelle</option>
              </select>
            </div>
            <div><label className="label">Places</label><input type="number" min={1} className="field" value={form.seats} onChange={(e) => set("seats", Number(e.target.value))} /></div>
            <div><label className="label">Portes</label><input type="number" min={1} className="field" value={form.doors} onChange={(e) => set("doors", Number(e.target.value))} /></div>
            <div><label className="label">Valises</label><input type="number" min={0} className="field" value={form.luggage} onChange={(e) => set("luggage", Number(e.target.value))} /></div>
            <div><label className="label">&Eacute;tiquette (optionnel)</label><input className="field" placeholder="Nouveau, Populaire..." value={form.badge ?? ""} onChange={(e) => set("badge", e.target.value)} /></div>
            <div><label className="label">Couleur du dessin de secours</label><input type="color" className="field !p-1" value={form.color} onChange={(e) => set("color", e.target.value)} /></div>
          </div>
          <div><label className="label">Lien de la photo (optionnel)</label><input className="field" placeholder="https://..." value={form.imageUrl ?? ""} onChange={(e) => set("imageUrl", e.target.value)} /></div>
          <div><label className="label">Description</label><textarea rows={3} className="field" value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
          <div><label className="label">&Eacute;quipements (s&eacute;par&eacute;s par des virgules)</label><input className="field" placeholder="GPS, Toit ouvrant, Cuir" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} /></div>
          {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <div className="flex gap-3">
            <button disabled={busy} type="submit" className="btn btn-primary disabled:opacity-60">Enregistrer</button>
            <button type="button" onClick={() => setForm(null)} className="btn btn-ghost">Annuler</button>
          </div>
        </form>
      )}

      {!form && error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="p-4">Voiture</th>
              <th className="p-4">Cat&eacute;gorie</th>
              <th className="p-4 text-right">Prix / jour</th>
              <th className="p-4">&Eacute;tat</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {allCars.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-20 overflow-hidden rounded-lg bg-[#efeadd]"><CarPhoto car={c} className="h-12 w-20" /></div>
                    <div>
                      <div className="font-semibold">{c.brand} {c.model}</div>
                      <div className="text-xs text-muted">{c.year} &middot; {c.fuel} &middot; {c.seats} places</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">{c.category}</td>
                <td className="p-4 text-right font-semibold">{eur(c.pricePerDay)}</td>
                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.active === false ? "bg-ink/10 text-muted" : "bg-emerald-100 text-emerald-700"}`}>
                    {c.active === false ? "Masquée" : "Visible"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button disabled={busy} onClick={() => openEdit(c)} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:bg-ink/5">Modifier</button>
                    <button disabled={busy} onClick={() => toggle(c)} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:bg-ink/5">{c.active === false ? "Afficher" : "Masquer"}</button>
                    <button disabled={busy} onClick={() => remove(c)} className="rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50">Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
