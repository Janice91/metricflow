import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-lg">D</span>
            <span className="font-display text-2xl font-bold">Driveo</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/60">
            La location de voiture simple, transparente et sans surprise. R&#xE9;servez en 2 minutes, roulez en 5.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">Explorer</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/voitures" className="hover:text-accent">Nos voitures</Link></li>
            <li><Link href="/agences" className="hover:text-accent">Nos agences</Link></li>
            <li><Link href="/reservations" className="hover:text-accent">Mes r&#xE9;servations</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">Aide</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/#faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Nous contacter</Link></li>
            <li>&#x1F4DE; 01 80 00 00 00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        &#xA9; {new Date().getFullYear()} Driveo &#x2014; Projet de d&#xE9;monstration. Aucune r&#xE9;servation r&#xE9;elle.
      </div>
    </footer>
  );
}
