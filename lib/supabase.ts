import { createClient } from "@supabase/supabase-js";

// Meme projet Supabase que MetricFlow (variables dans .env.local).
// Les valeurs "placeholder" evitent un plantage au build si les variables manquent.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);
