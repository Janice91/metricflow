import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { AGENCIES, CARS } from "./cars";
import { agencyFromRow, buildCatalog, carFromRow } from "./catalogMap";

// Lit les voitures et les agences dans Supabase (cote serveur).
// Si les tables sont vides ou absentes, on garde les donnees du code : le site ne casse jamais.
export const getCatalog = cache(async () => {
  let allCars = CARS;
  let allAgencies = AGENCIES;
  let carsFromDb = false;
  let agenciesFromDb = false;
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
      const [c, a] = await Promise.all([
        sb.from("cars").select("*").order("position", { ascending: true }),
        sb.from("agencies").select("*").order("position", { ascending: true }),
      ]);
      if (!c.error && c.data && c.data.length > 0) {
        allCars = c.data.map(carFromRow);
        carsFromDb = true;
      }
      if (!a.error && a.data && a.data.length > 0) {
        allAgencies = a.data.map(agencyFromRow);
        agenciesFromDb = true;
      }
    }
  } catch {
    // on garde les donnees du code
  }
  return buildCatalog({ allCars, allAgencies, carsFromDb, agenciesFromDb });
});
