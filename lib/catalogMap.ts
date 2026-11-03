/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Agency, Car, Category, Fuel } from "./cars";

export interface CatalogData {
  allCars: Car[];
  allAgencies: Agency[];
  carsFromDb: boolean;
  agenciesFromDb: boolean;
}

export interface Catalog extends CatalogData {
  cars: Car[];
  agencies: Agency[];
  getCar: (id: string) => Car | undefined;
}

// "cars" et "agencies" = ce que voit le public (les elements masques sont retires).
// "allCars" et "allAgencies" = tout, pour l'administration.
export function buildCatalog(d: CatalogData): Catalog {
  return {
    ...d,
    cars: d.allCars.filter((c) => c.active !== false),
    agencies: d.allAgencies.filter((a) => a.active !== false),
    getCar: (id) => d.allCars.find((c) => c.id === id),
  };
}

type Row = Record<string, any>;

export function carFromRow(r: Row): Car {
  return {
    id: r.id,
    brand: r.brand,
    model: r.model,
    category: r.category as Category,
    year: Number(r.year),
    pricePerDay: Number(r.price_per_day),
    seats: Number(r.seats),
    doors: Number(r.doors),
    gearbox: r.gearbox === "Manuelle" ? "Manuelle" : "Auto",
    fuel: r.fuel as Fuel,
    luggage: Number(r.luggage),
    color: r.color ?? "#475569",
    rating: Number(r.rating),
    reviews: Number(r.reviews),
    badge: r.badge || undefined,
    photo: r.photo || undefined,
    imageUrl: r.image_url || undefined,
    description: r.description ?? "",
    features: r.features ?? [],
    active: r.active !== false,
  };
}

export function carToRow(c: Car, position: number): Row {
  return {
    id: c.id,
    brand: c.brand,
    model: c.model,
    category: c.category,
    year: c.year,
    price_per_day: c.pricePerDay,
    seats: c.seats,
    doors: c.doors,
    gearbox: c.gearbox,
    fuel: c.fuel,
    luggage: c.luggage,
    color: c.color,
    rating: c.rating,
    reviews: c.reviews,
    badge: c.badge || null,
    photo: c.photo || null,
    image_url: c.imageUrl || null,
    description: c.description,
    features: c.features,
    active: c.active !== false,
    position,
  };
}

export function agencyFromRow(r: Row): Agency {
  return {
    id: r.id,
    city: r.city,
    address: r.address ?? "",
    phone: r.phone ?? "",
    hours: r.hours ?? "",
    airport: !!r.airport,
    active: r.active !== false,
  };
}

export function agencyToRow(a: Agency, position: number): Row {
  return {
    id: a.id,
    city: a.city,
    address: a.address,
    phone: a.phone,
    hours: a.hours,
    airport: !!a.airport,
    active: a.active !== false,
    position,
  };
}
