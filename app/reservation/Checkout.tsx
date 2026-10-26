"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AGENCIES, getCar } from "@/lib/cars";
import { OPTIONS, daysBetween, eur, fmtDate, quote } from "@/lib/pricing";
import { newRef, saveBooking, type Booking } from "@/lib/bookings";
import CarPhoto from "@/components/CarPhoto";
import { useUser } from "@/lib/auth";

export default function Checkout() {
  const sp = useSearchParams();
  const car = getCar(sp.get("car") ?? "");
  const agence = AGENCIES.find((a) => a.id === sp.get("agence")) ?? AGENCIES[0];
  const du = sp.get("du") ?? "";
  const au = sp.get("au") ?? "";
  const opts = (sp.get("opts") ?? "").split(",").filter(Boolean);
  const days = daysBetween(du, au);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dropoff, setDropoff] = useState(agence.id);
  const [accept, setAccept] = useState(false);
  const [done, setDone] = useState<Booking | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { user, loading } = useUser();

  // Pre-remplit le formulaire avec les infos du compte
  useEffect(() => {
    if (user) {
      setName((n) => n || ((user.user_metadata?.full_name as string | undefined) ?? ""));
      setEmail((m) => m || (user.email ?? ""));
    }
  }, [user]);

  if (!car || days < 1) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-5xl">&#x1F697;</p>
        <h1 className="font-display mt-4 text-3xl font-bold">Aucune r&#xE9;servation en cours</h1>
        <p className="mt-2 text-muted">Choisissez une voiture et vos dates pour commencer.</p>
        <Link href="/voitures" className="btn btn-primary mt-6">Voir les voitures</Link>
      </div>
    );
  }

  if (loading) return <p className="p-10 text-center text-muted">Chargement...</p>;

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-5xl">&#x1F511;</p>
        <h1 className="font-display mt-4 text-3xl font-bold">Connecte-toi pour r&eacute;server</h1>
        <p className="mt-2 text-muted">Ton compte te permet de retrouver et g&eacute;rer toutes tes locations.</p>
        <Link href={`/login?next=${encodeURIComponent("/reservation?" + sp.toString())}`} className="btn btn-primary mt-6">Se connecter / Cr&eacute;er un compte</Link>
      </div>
    );
  }

  const q = quote(car.pricePerDay, days, opts);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!car) return;
    setSaving(true);
    setError("");
    const b: Booking = {
      ref: newRef(), carId: car.id, pickup: agence.id, dropoff, start: du, end: au, options: opts,
      total: q.total, name, email, phone, createdAt: new Date().toISOString(),
    };
    const err = await saveBooking(b);
    setSaving(false);
    if (err) {
      setError(err);
      return;
    }
    setDone(b);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl">&#x2705;</div>
        <h1 className="font-display mt-6 text-4xl font-bold">R&#xE9;servation confirm&#xE9;e !</h1>
        <p className="mt-2 text-muted">Merci {done.name.split(" ")[0]} ! Un e-mail de confirmation a &#xE9;t&#xE9; envoy&#xE9; &#xE0; <b className="text-ink">{done.email}</b> (d&#xE9;mo).</p>
        <div className="card mt-8 p-6 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Num&#xE9;ro de r&#xE9;servation</p>
          <p className="font-display text-3xl font-bold text-accent">{done.ref}</p>
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div><dt className="text-muted">Voiture</dt><dd className="font-semibold">{car.brand} {car.model}</dd></div>
            <div><dt className="text-muted">Total</dt><dd className="font-semibold">{eur(done.total)}</dd></div>
            <div><dt className="text-muted">D&#xE9;part</dt><dd className="font-semibold">{fmtDate(done.start)} &#xB7; {agence.city}</dd></div>
            <div><dt className="text-muted">Retour</dt><dd className="font-semibold">{fmtDate(done.end)} &#xB7; {AGENCIES.find((a) => a.id === done.dropoff)?.city}</dd></div>
          </dl>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/reservations" className="btn btn-dark">Mes r&#xE9;servations</Link>
          <Link href="/" className="btn btn-ghost">Retour &#xE0; l&apos;accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="font-display text-4xl font-bold">Finaliser ma r&#xE9;servation</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} className="card space-y-5 p-7">
          <h2 className="font-display text-2xl font-semibold">Vos informations</h2>
          <div>
            <label className="label" htmlFor="name">Nom complet</label>
            <input id="name" required minLength={3} className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jean Dupont" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="email">E-mail</label>
              <input id="email" type="email" required className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jean@email.com" />
            </div>
            <div>
              <label className="label" htmlFor="phone">T&#xE9;l&#xE9;phone</label>
              <input id="phone" type="tel" required pattern="[0-9 +]{8,}" className="field" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 12 34 56 78" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="drop">Agence de retour</label>
            <select id="drop" className="field" value={dropoff} onChange={(e) => setDropoff(e.target.value)}>
              {AGENCIES.map((a) => <option key={a.id} value={a.id}>{a.city}</option>)}
            </select>
          </div>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" required checked={accept} onChange={(e) => setAccept(e.target.checked)} className="mt-1 h-4 w-4 accent-[#b98a2e]" />
            <span>J&apos;ai plus de 25 ans, 3 ans de permis, et j&apos;accepte les conditions g&#xE9;n&#xE9;rales de location.</span>
          </label>
          {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={saving} className="btn btn-primary w-full disabled:opacity-60">Confirmer la r&#xE9;servation &#xB7; {eur(q.total)}</button>
          <p className="text-center text-xs text-muted">D&#xE9;mo : aucun paiement n&apos;est demand&#xE9;.</p>
        </form>

        <aside className="card h-fit p-6 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-xl bg-gradient-to-b from-[#efeadd] to-[#f8f5ee]">
            <CarPhoto car={car} className="aspect-[16/10] w-full" />
          </div>
          <h3 className="font-display mt-4 text-2xl font-semibold">{car.brand} {car.model}</h3>
          <p className="text-sm text-muted">{fmtDate(du)} &#x2192; {fmtDate(au)} &#xB7; {days} jour{days > 1 ? "s" : ""}</p>
          <p className="text-sm text-muted">Retrait : {agence.city}</p>
          <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between"><span>Location</span><span>{eur(q.base)}</span></div>
            {q.discount > 0 && <div className="flex justify-between text-emerald-600"><span>Remise &#x2212;{q.discountPct}%</span><span>&#x2212;{eur(q.discount)}</span></div>}
            {OPTIONS.filter((o) => opts.includes(o.id)).map((o) => (
              <div key={o.id} className="flex justify-between"><span>{o.label}</span><span>{eur(o.price * days)}</span></div>
            ))}
            <div className="flex justify-between border-t border-line pt-3 text-lg font-bold"><span>Total</span><span>{eur(q.total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
