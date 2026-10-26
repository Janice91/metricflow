import Link from "next/link";
import { notFound } from "next/navigation";
import { CARS, getCar } from "@/lib/cars";
import { eur } from "@/lib/pricing";
import CarIllustration from "@/components/CarIllustration";
import Stars from "@/components/Stars";
import BookingWidget from "./BookingWidget";

export function generateStaticParams() {
  return CARS.map((c) => ({ id: c.id }));
}

export default async function CarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) notFound();

  const specs = [
    ["\u{1f465}", "Places", String(car.seats)],
    ["\u{1f6aa}", "Portes", String(car.doors)],
    ["\u2699\ufe0f", "Bo\u00eete", car.gearbox],
    ["\u26fd", "Carburant", car.fuel],
    ["\u{1f9f3}", "Bagages", `${car.luggage} valise${car.luggage > 1 ? "s" : ""}`],
    ["\u{1f4c5}", "Ann\u00e9e", String(car.year)],
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Link href="/voitures" className="text-sm text-muted hover:text-ink">&#x2190; Retour aux voitures</Link>
      <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="card overflow-hidden">
            <div className="bg-gradient-to-b from-[#efeadd] to-[#f8f5ee] px-6 pb-4 pt-10">
              <CarIllustration color={car.color} category={car.category} className="mx-auto w-full max-w-xl" />
            </div>
            <div className="p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">{car.category}</span>
                {car.badge && <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">{car.badge}</span>}
                <Stars rating={car.rating} reviews={car.reviews} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">{car.brand}</p>
              <h1 className="font-display text-4xl font-bold">{car.model}</h1>
              <p className="mt-4 text-lg text-muted">{car.description}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {specs.map(([i, l, v]) => (
              <div key={l} className="card p-4">
                <p className="text-2xl">{i}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">{l}</p>
                <p className="font-semibold">{v}</p>
              </div>
            ))}
          </div>

          <div className="card mt-6 p-7">
            <h2 className="font-display text-2xl font-semibold">&#xC9;quipements</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {car.features.map((f) => (
                <li key={f} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-sm text-accent">&#x2713;</span>{f}</li>
              ))}
            </ul>
            <h2 className="font-display mt-8 text-2xl font-semibold">Inclus dans le prix</h2>
            <p className="mt-2 text-muted">Kilom&#xE9;trage illimit&#xE9; &#xB7; Assurance de base &#xB7; Assistance 24/7 &#xB7; 2e conducteur sur demande &#xB7; Annulation gratuite 48h avant.</p>
          </div>
        </div>

        <BookingWidget carId={car.id} pricePerDay={car.pricePerDay} />
      </div>
      <p className="sr-only">Prix {eur(car.pricePerDay)} par jour</p>
    </div>
  );
}
