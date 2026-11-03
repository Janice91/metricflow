"use client";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "@/lib/auth";
import { useIsAdmin } from "@/lib/admin";
import ReservationsTab from "./ReservationsTab";
import VoituresTab from "./VoituresTab";
import AgencesTab from "./AgencesTab";
import ClientsTab from "./ClientsTab";

const TABS = [
  ["reservations", "Réservations"],
  ["voitures", "Voitures"],
  ["agences", "Agences"],
  ["clients", "Clients"],
] as const;

type Tab = (typeof TABS)[number][0];

export default function Admin() {
  const { user, loading } = useUser();
  const isAdmin = useIsAdmin(user);
  const [tab, setTab] = useState<Tab>("reservations");

  if (loading || isAdmin === null) return <p className="p-10 text-center text-muted">Chargement&#x2026;</p>;

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Espace administrateur</h1>
        <p className="mt-2 text-muted">Connecte-toi avec ton compte administrateur.</p>
        <Link href="/login?next=/admin" className="btn btn-primary mt-6">Se connecter</Link>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-5xl">&#x1F6AB;</p>
        <h1 className="font-display mt-4 text-3xl font-bold">Acc&egrave;s refus&eacute;</h1>
        <p className="mt-2 text-muted">Cette page est r&eacute;serv&eacute;e aux administrateurs.</p>
        <Link href="/" className="btn btn-dark mt-6">Retour &agrave; l&apos;accueil</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="font-display text-4xl font-bold">Administration</h1>
      <div className="mt-6 flex flex-wrap gap-2 border-b border-line pb-4">
        {TABS.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`btn !py-2 ${tab === id ? "btn-dark" : "btn-ghost"}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {tab === "reservations" && <ReservationsTab />}
        {tab === "voitures" && <VoituresTab />}
        {tab === "agences" && <AgencesTab />}
        {tab === "clients" && <ClientsTab />}
      </div>
    </div>
  );
}
