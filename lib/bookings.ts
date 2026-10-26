import { supabase } from "./supabase";

export interface Booking {
  ref: string;
  carId: string;
  pickup: string;
  dropoff: string;
  start: string;
  end: string;
  options: string[];
  total: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

// Les reservations sont stockees dans la table "bookings" de Supabase.
// La securite (RLS) garantit que chaque utilisateur ne voit que les siennes.
export async function loadBookings(): Promise<Booking[]> {
  const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((r) => ({
    ref: r.ref,
    carId: r.car_id,
    pickup: r.pickup,
    dropoff: r.dropoff,
    start: r.start_date,
    end: r.end_date,
    options: r.options ?? [],
    total: Number(r.total),
    name: r.name,
    email: r.email,
    phone: r.phone,
    createdAt: r.created_at,
  }));
}

// Renvoie un message d'erreur, ou null si tout s'est bien passe.
export async function saveBooking(b: Booking): Promise<string | null> {
  const { error } = await supabase.from("bookings").insert({
    ref: b.ref,
    car_id: b.carId,
    pickup: b.pickup,
    dropoff: b.dropoff,
    start_date: b.start,
    end_date: b.end,
    options: b.options,
    total: b.total,
    name: b.name,
    email: b.email,
    phone: b.phone,
  });
  return error ? error.message : null;
}

export async function cancelBooking(ref: string): Promise<void> {
  await supabase.from("bookings").delete().eq("ref", ref);
}

export function newRef(): string {
  return "DRV-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}
