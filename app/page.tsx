import Link from "next/link";
import { CARS, CATEGORIES } from "@/lib/cars";
import CarCard from "@/components/CarCard";
import CarIllustration from "@/components/CarIllustration";
import SearchForm from "@/components/SearchForm";

const CAT_ICONS: Record<string, string> = { Citadine: "\u{1f697}", Berline: "\u{1f698}", SUV: "\u{1f699}", Sport: "\u{1f3ce}\ufe0f", "\u00c9lectrique": "\u26a1", Van: "\u{1f690}" };

const STEPS = [
  { n: "1", t: "Choisissez", d: "Comparez nos voitures selon vos dates, votre budget et vos envies." },
  { n: "2", t: "R\u00e9servez", d: "Confirmez en 2 minutes. Annulation gratuite jusqu'\u00e0 48h avant." },
  { n: "3", t: "Roulez", d: "R\u00e9cup\u00e9rez les cl\u00e9s en agence (ou \u00e0 l'a\u00e9roport) et c'est parti !" },
];

const WHY = [
  { i: "\u{1f4b6}", t: "Prix tout compris", d: "Kilom\u00e9trage illimit\u00e9, assistance 24/7 et assurance de base inclus. Z\u00e9ro frais cach\u00e9s." },
  { i: "\u{1f6e1}\ufe0f", t: "Voitures r\u00e9centes", d: "Flotte de moins de 2 ans, r\u00e9vis\u00e9e et d\u00e9sinfect\u00e9e avant chaque location." },
  { i: "\u{1f4cd}", t: "6 agences en France", d: "Gares, a\u00e9roports et centres-villes. Retour dans une autre agence possible." },
  { i: "\u{1f3a7}", t: "Support humain 7j/7", d: "Une vraie \u00e9quipe r\u00e9pond au t\u00e9l\u00e9phone, jour et nuit en cas de p\u00e9pin." },
];

const REVIEWS = [
  { n: "Sarah M.", c: "Lyon", t: "R\u00e9servation en 2 minutes, voiture impeccable, retrait express. Je recommande les yeux ferm\u00e9s !" },
  { n: "Karim B.", c: "Paris", t: "Tesla Model 3 pour un week-end, un r\u00e9gal. Prix clair, aucune mauvaise surprise au retour." },
  { n: "Julie D.", c: "Nice", t: "Le Multivan \u00e9tait parfait pour nos 6 amis. Service client super r\u00e9actif." },
];

const FAQ = [
  { q: "Quel \u00e2ge faut-il avoir pour louer ?", a: "21 ans minimum (25 ans pour les voitures Sport), avec 2 ans de permis." },
  { q: "Puis-je annuler ma r\u00e9servation ?", a: "Oui, gratuitement jusqu'\u00e0 48h avant le d\u00e9part, directement depuis \u00ab Mes r\u00e9servations \u00bb." },
  { q: "Le kilom\u00e9trage est-il limit\u00e9 ?", a: "Non, le kilom\u00e9trage est illimit\u00e9 sur toutes nos voitures." },
  { q: "Quels documents dois-je pr\u00e9senter ?", a: "Votre permis de conduire, une pi\u00e8ce d'identit\u00e9 et une carte bancaire au nom du conducteur." },
  { q: "Puis-je rendre la voiture dans une autre ville ?", a: "Oui, entre toutes nos agences, avec un petit suppl\u00e9ment selon la distance." },
];

export default function Home() {
  const featured = CARS.filter((c) => ["peugeot-208", "toyota-rav4", "tesla-model-3", "bmw-serie-3", "dacia-duster", "porsche-911"].includes(c.id));
  return (
    <>
      {/* HERO */}
      <section className="hero-bg overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-10 pt-14 md:grid-cols-2 md:pt-20">
          <div className="fade-up">
            <span className="inline-block rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold">&#x2B50; 4,8/5 &#xB7; +2 000 clients satisfaits</span>
            <h1 className="font-display mt-5 text-5xl font-bold leading-[1.05] md:text-6xl">
              La route est &#xE0; vous.<br /><span className="text-accent">Les cl&#xE9;s aussi.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Louez la voiture id&#xE9;ale en quelques clics. Prix clairs, kilom&#xE9;trage illimit&#xE9;, agences partout en France.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/voitures" className="btn btn-primary">Voir les voitures</Link>
              <Link href="/#comment" className="btn btn-ghost">Comment &#xE7;a marche</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-x-6 bottom-2 top-10 rounded-[2rem] bg-ink" />
            <CarIllustration color="#FF5A1F" category="Sport" className="drive-in relative mx-auto w-full max-w-lg drop-shadow-2xl" />
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-14">
          <SearchForm />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Une voiture pour chaque envie</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/voitures?cat=${encodeURIComponent(c)}`} className="card lift flex flex-col items-center gap-2 p-5 text-center">
              <span className="text-4xl">{CAT_ICONS[c]}</span>
              <span className="font-semibold">{c}</span>
              <span className="text-xs text-muted">{CARS.filter((x) => x.category === c).length} mod&#xE8;les</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Nos coups de c&#x153;ur</h2>
          <Link href="/voitures" className="text-sm font-semibold text-accent hover:underline">Tout voir &#x2192;</Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => <CarCard key={c.id} car={c} />)}
        </div>
      </section>

      {/* HOW */}
      <section id="comment" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-24">
        <h2 className="font-display text-center text-3xl font-bold md:text-4xl">Louer, c&apos;est 3 &#xE9;tapes</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="card p-7">
              <span className="font-display grid h-12 w-12 place-items-center rounded-2xl bg-accent text-2xl font-bold text-white">{s.n}</span>
              <h3 className="font-display mt-5 text-2xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="mt-24 bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Pourquoi choisir Driveo ?</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.t} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="text-3xl">{w.i}</span>
                <h3 className="mt-4 text-lg font-semibold">{w.t}</h3>
                <p className="mt-2 text-sm text-white/60">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-6xl px-5 pt-24">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Ils ont roul&#xE9; avec nous</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.n} className="card p-6">
              <p className="text-amber-500">&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</p>
              <blockquote className="mt-3">&#xAB; {r.t} &#xBB;</blockquote>
              <figcaption className="mt-4 text-sm font-semibold">{r.n} <span className="font-normal text-muted">&#xB7; {r.c}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 pt-24">
        <h2 className="font-display text-center text-3xl font-bold md:text-4xl">Questions fr&#xE9;quentes</h2>
        <div className="mt-8 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="card group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {f.q}<span className="text-accent transition group-open:rotate-45">&#xFF0B;</span>
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pt-24">
        <div className="rounded-[2rem] bg-accent px-8 py-14 text-center text-white">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Pr&#xEA;t &#xE0; prendre la route ?</h2>
          <p className="mx-auto mt-3 max-w-md text-white/85">R&#xE9;servez maintenant, annulez gratuitement jusqu&apos;&#xE0; 48h avant le d&#xE9;part.</p>
          <Link href="/voitures" className="btn mt-7 bg-white !text-ink hover:bg-paper">Choisir ma voiture</Link>
        </div>
      </section>
    </>
  );
}
