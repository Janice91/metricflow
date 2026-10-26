"use client";
import { useEffect, useRef, useState } from "react";
import type { Car } from "@/lib/cars";
import CarIllustration from "./CarIllustration";

// Affiche la vraie photo /public/cars/<id>.jpg.
// Si la photo n'existe pas, on affiche le dessin a la place.
export default function CarPhoto({ car, className = "" }: { car: Car; className?: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Si l'erreur est arrivee avant que React soit pret, on la rattrape ici.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return <CarIllustration color={car.color} category={car.category} className={`${className} p-4`} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={`/cars/${car.id}.jpg`}
      alt={`${car.brand} ${car.model}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
