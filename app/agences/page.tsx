import Link from "next/link";
import { AGENCIES } from "@/lib/cars";

export const metadata = { title: "Nos agences \u2014 Driveo" };

export default function Agences() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="font-display text-4xl font-bold">Nos agences</h1>
      <p className="mt-2 text-muted">6 points de retrait en France : gares, a&#xE9;roports et centres-villes.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AGENCIES.map((a) => (
          <div key={a.id} className="card lift p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">{a.city}</h2>
              {a.airport && <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">&#x2708; A&#xE9;roport</span>}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>&#x1F4CD; {a.address}</li>
              <li>&#x1F552; {a.hours}</li>
              <li>&#x1F4DE; {a.phone}</li>
            </ul>
            <Link href={`/voitures?agence=${a.id}&du=&au=`} className="btn btn-ghost mt-5 w-full !py-2">Louer ici</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
