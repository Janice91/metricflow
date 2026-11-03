"use client";
import { useEffect, useMemo, useState } from "react";
import { loadClients, type ClientRow } from "@/lib/catalogAdmin";
import { eur } from "@/lib/pricing";

function fmt(d: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ClientsTab() {
  const [rows, setRows] = useState<ClientRow[] | null>(null);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    loadClients().then((r) => {
      setRows(r.rows);
      setError(r.error ?? "");
    });
  }, []);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (rows ?? []).filter((r) => !s || (r.email + " " + r.full_name).toLowerCase().includes(s));
  }, [rows, q]);

  if (error) {
    return (
      <div className="card p-8">
        <h2 className="font-display text-2xl font-semibold">Clients</h2>
        <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
        <p className="mt-3 text-sm text-muted">Si le message parle de &laquo; admin_clients &raquo;, ex&eacute;cute le SQL des tables dans Supabase (la fonction y est incluse).</p>
      </div>
    );
  }
  if (rows === null) return <p className="text-muted">Chargement&#x2026;</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted">{rows.length} comptes inscrits</p>
        <input className="field max-w-sm" placeholder="Rechercher (nom, e-mail)" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="p-4">Client</th>
              <th className="p-4">Inscrit le</th>
              <th className="p-4">Derni&egrave;re connexion</th>
              <th className="p-4 text-right">R&eacute;servations</th>
              <th className="p-4 text-right">Total d&eacute;pens&eacute;</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.user_id} className="border-b border-line last:border-0">
                <td className="p-4">
                  <div className="font-medium">{r.full_name || "—"}</div>
                  <div className="text-muted">{r.email}</div>
                </td>
                <td className="p-4">{fmt(r.created_at)}</td>
                <td className="p-4">{fmt(r.last_sign_in_at)}</td>
                <td className="p-4 text-right">{r.bookings}</td>
                <td className="p-4 text-right font-semibold">{eur(r.spent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
