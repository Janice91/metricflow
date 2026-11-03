"use client";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { saveBooking, type Booking } from "@/lib/bookings";
import { useCatalog } from "@/lib/catalog";
import { eur } from "@/lib/pricing";
import { useUser } from "@/lib/auth";

type State =
  | { status: "loading" }
  | { status: "ok"; b: Booking }
  | { status: "already" }
  | { status: "error"; msg: string };

function Succes() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id") ?? "";
  const { getCar } = useCatalog();
  const { user, loading } = useUser();
  const [state, setState] = useState<State>({ status: "loading" });
  const started = useRef(false);

  useEffect(() => {
    if (loading || !user || started.current) return;
    started.current = true;
    (async () => {
      try {
        const res = await fetch("/api/checkout/verify?session_id=" + encodeURIComponent(sessionId));
        const data = await res.json();
        if (!data.paid) return setState({ status: "error", msg: data.error ?? "Le paiement n'est pas confirme." });
        const raw = localStorage.getItem("driveo_pending");
        if (!raw) return setState({ status: "already" });
        const pending: Booking = JSON.parse(raw);
        if (pending.ref !== data.ref) return setState({ status: "error", msg: "Cette reservation ne correspond pas au paiement." });
        const err = await saveBooking(pending, sessionId);
        if (err) return setState({ status: "error", msg: err });
        localStorage.removeItem("driveo_pending");
        setState({ status: "ok", b: pending });
      } catch (e) {
        setState({ status: "error", msg: e instanceof Error ? e.message : "Erreur." });
      }
    })();
  }, [loading, user, sessionId]);

  if (loading || state.status === "loading") {
    return <p className="p-10 text-center text-muted">V&eacute;rification du paiement&hellip;</p>;
  }
  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Connecte-toi pour voir ta r&eacute;servation</h1>
        <Link href="/login" className="btn btn-primary mt-6">Se connecter</Link>
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Un probl&egrave;me est survenu</h1>
        <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{state.msg}</p>
        <Link href="/voitures" className="btn btn-dark mt-6">Retour aux voitures</Link>
      </div>
    );
  }
  if (state.status === "already") {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Paiement re&ccedil;u</h1>
        <p className="mt-2 text-muted">Ta r&eacute;servation est d&eacute;j&agrave; enregistr&eacute;e.</p>
        <Link href="/reservations" className="btn btn-dark mt-6">Mes r&eacute;servations</Link>
      </div>
    );
  }
  const b = state.b;
  const car = getCar(b.carId);
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl">&#x2705;</div>
      <h1 className="font-display mt-6 text-4xl font-bold">Paiement r&eacute;ussi, r&eacute;servation confirm&eacute;e !</h1>
      <p className="mt-2 text-muted">Merci {b.name.split(" ")[0]} ! Ton paiement a bien &eacute;t&eacute; re&ccedil;u.</p>
      <div className="card mt-8 p-6 text-left">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Num&eacute;ro de r&eacute;servation</p>
        <p className="font-display text-3xl font-bold text-accent">{b.ref}</p>
        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div><dt className="text-muted">Voiture</dt><dd className="font-semibold">{car ? `${car.brand} ${car.model}` : b.carId}</dd></div>
          <div><dt className="text-muted">Montant pay&eacute;</dt><dd className="font-semibold">{eur(b.total)}</dd></div>
        </dl>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/reservations" className="btn btn-dark">Mes r&eacute;servations</Link>
        <Link href="/" className="btn btn-ghost">Retour &agrave; l&apos;accueil</Link>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p className="p-10 text-center text-muted">Chargement&hellip;</p>}>
      <Succes />
    </Suspense>
  );
}
