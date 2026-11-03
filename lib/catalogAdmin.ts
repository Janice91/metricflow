"use client";
import { supabase } from "./supabase";
import { AGENCIES, CARS, type Agency, type Car } from "./cars";
import { agencyToRow, carToRow } from "./catalogMap";

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Toutes ces fonctions renvoient un message d'erreur, ou null si tout s'est bien passe.
export async function saveCar(car: Car, position: number): Promise<string | null> {
  const { error } = await supabase.from("cars").upsert(carToRow(car, position));
  return error ? error.message : null;
}

export async function deleteCar(id: string): Promise<string | null> {
  const { error } = await supabase.from("cars").delete().eq("id", id);
  return error ? error.message : null;
}

export async function importDefaultCars(): Promise<string | null> {
  const { error } = await supabase.from("cars").upsert(CARS.map((c, i) => carToRow(c, i)));
  return error ? error.message : null;
}

export async function saveAgency(a: Agency, position: number): Promise<string | null> {
  const { error } = await supabase.from("agencies").upsert(agencyToRow(a, position));
  return error ? error.message : null;
}

export async function deleteAgency(id: string): Promise<string | null> {
  const { error } = await supabase.from("agencies").delete().eq("id", id);
  return error ? error.message : null;
}

export async function importDefaultAgencies(): Promise<string | null> {
  const { error } = await supabase.from("agencies").upsert(AGENCIES.map((a, i) => agencyToRow(a, i)));
  return error ? error.message : null;
}

export interface ClientRow {
  user_id: string;
  email: string;
  full_name: string;
  created_at: string;
  last_sign_in_at: string | null;
  bookings: number;
  spent: number;
}

export async function loadClients(): Promise<{ rows: ClientRow[]; error: string | null }> {
  const { data, error } = await supabase.rpc("admin_clients");
  if (error || !data) return { rows: [], error: error ? error.message : "Aucune donnee" };
  return {
    rows: (data as ClientRow[]).map((r) => ({ ...r, bookings: Number(r.bookings), spent: Number(r.spent) })),
    error: null,
  };
}
