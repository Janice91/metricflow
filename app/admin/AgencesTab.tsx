"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Agency } from "@/lib/cars";
import { useCatalog } from "@/lib/catalog";
import { deleteAgency, importDefaultAgencies, saveAgency, slugify } from "@/lib/catalogAdmin";

const EMPTY: Agency = { id: "", city: "", address: "", phone: "", hours: "8h – 20h, 7j/7", airport: false, active: true };

export default function AgencesTab() {
  const { allAgencies, agenciesFromDb } = useCatalog();
  const router = useRouter();
  const [form, setForm] = useState<Agency | null>(null);
  const [isNew, setIsNew] = useState(false);
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
    setError("");
  }
  function openEdit(a: Agency) {
    setForm({ ...a });
    setIsNew(false);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const set = <K extends keyof Agency>(k: K, v: Agency[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const ag: Agency = { ...form };
    let position = allAgencies.findIndex((a) => a.id === ag.id);
    if (isNew) {
      const base = slugify(ag.city) || "agence";
      let id = base;
      let n = 2;
      while (allAgencies.some((a) => a.id === id)) id = base + "-" + n++;
      ag.id = id;
      position = allAgencies.length;
    }
    if (await run(() => saveAgency(ag, position))) setForm(null);
  }

  async function toggle(a: Agency) {
    await run(() => saveAgency({ ...a, active: a.active === false }, allAgencies.findIndex((x) => x.id === a.id)));
  }

  async function remove(a: Agency) {
    if (!window.confirm("Supprimer l'agence " + a.city + " ? (Pour juste la cacher, utilise le bouton Masquer.)")) return;
    await run(() => deleteAgency(a.id));
  }

  if (!agenciesFromDb) {
    return (
      <div className="card p-8">
        <h2 className="font-display text-2xl font-semibold">Agences</h2>
        <p className="mt-2 text-muted">
          Pour l&apos;instant, les {allAgencies.length} agences viennent du code du site. Pour pouvoir les modifier, il faut d&apos;abord les copier dans la base de donn&eacute;es. C&apos;est &agrave; faire une seule fois.
        </p>
        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={busy} onClick={() => run(importDefaultAgencies)} className="btn btn-primary mt-5 disabled:opacity-60">
          Importer les {allAgencies.length} agences dans la base
        </button>
        <p className="mt-3 text-xs text-muted">Si &ccedil;a affiche une erreur, v&eacute;rifie que le SQL des tables a bien &eacute;t&eacute; ex&eacute;cut&eacute; dans Supabase.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted">{allAgencies.length} agences &middot; {allAgencies.filter((a) => a.active !== false).length} visibles sur le site</p>
        <button onClick={openNew} className="btn btn-primary !py-2">+ Ajouter une agence</button>
      </div>

      {form && (
        <form onSubmit={submit} className="card mt-6 space-y-5 p-6">
          <h2 className="font-display text-2xl font-semibold">{isNew ? "Nouvelle agence" : "Modifier l'agence " + form.city}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label">Ville</label><input required className="field" value={form.city} onChange={(e) => set("city", e.target.value)} /></div>
            <div><label className="label">Adresse</label><input required className="field" value={form.address} onChange={(e) => set("address", e.target.value)} /></div>
            <div><label className="label">T&eacute;l&eacute;phone</label><input className="field" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></div>
            <div><label className="label">Horaires</label><input className="field" value={form.hours} onChange={(e) => set("hours", e.target.value)} /></div>
          </div>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={!!form.airport} onChange={(e) => set("airport", e.target.checked)} className="h-4 w-4 accent-[#b98a2e]" />
            Agence situ&eacute;e dans un a&eacute;roport
          </label>
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
              <th className="p-4">Agence</th>
              <th className="p-4">Adresse</th>
              <th className="p-4">T&eacute;l&eacute;phone</th>
              <th className="p-4">Horaires</th>
              <th className="p-4">&Eacute;tat</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {allAgencies.map((a) => (
              <tr key={a.id} className="border-b border-line last:border-0">
                <td className="p-4 font-semibold">{a.city}{a.airport ? " ✈" : ""}</td>
                <td className="p-4">{a.address}</td>
                <td className="p-4">{a.phone}</td>
                <td className="p-4">{a.hours}</td>
                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${a.active === false ? "bg-ink/10 text-muted" : "bg-emerald-100 text-emerald-700"}`}>
                    {a.active === false ? "Masquée" : "Visible"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button disabled={busy} onClick={() => openEdit(a)} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:bg-ink/5">Modifier</button>
                    <button disabled={busy} onClick={() => toggle(a)} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:bg-ink/5">{a.active === false ? "Afficher" : "Masquer"}</button>
                    <button disabled={busy} onClick={() => remove(a)} className="rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50">Supprimer</button>
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
