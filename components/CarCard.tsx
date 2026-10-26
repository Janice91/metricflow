import Link from "next/link";
import type { Car } from "@/lib/cars";
import { eur } from "@/lib/pricing";
import CarPhoto from "./CarPhoto";
import Stars from "./Stars";

export default function CarCard({ car, qs = "" }: { car: Car; qs?: string }) {
  return (
    <Link href={`/voitures/${car.id}${qs}`} className="card lift group flex flex-col overflow-hidden">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#efeadd] to-[#f8f5ee]">
        {car.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">{car.badge}</span>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted">{car.category}</span>
        <CarPhoto car={car} className="aspect-[16/10] w-full transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">{car.brand}</p>
            <h3 className="font-display text-xl font-semibold">{car.model}</h3>
          </div>
          <Stars rating={car.rating} reviews={car.reviews} />
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <li>&#x1F465; {car.seats} places</li>
          <li>&#x2699;&#xFE0F; {car.gearbox}</li>
          <li>&#x26FD; {car.fuel}</li>
        </ul>
        <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
          <p>
            <span className="font-display text-2xl font-bold">{eur(car.pricePerDay)}</span>
            <span className="text-sm text-muted"> / jour</span>
          </p>
          <span className="text-sm font-semibold text-accent group-hover:underline">R&#xE9;server &#x2192;</span>
        </div>
      </div>
    </Link>
  );
}
