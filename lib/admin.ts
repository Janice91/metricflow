"use client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import type { Booking } from "./bookings";

export interface AdminBooking extends Booking {
  userId: string;
}

// true si l'utilisateur est dans la table "admins", false sinon, null pendant la verification.
export function useIsAdmin(user: User | null): boolean | null {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    setIsAdmin(null);
    supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user]);
  return isAdmin;
}

// Toutes les reservations de tous les clients (la base ne les donne qu'aux admins).
export async function loadAllBookings(): Promise<AdminBooking[]> {
  const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((r) => ({
    userId: r.user_id,
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
