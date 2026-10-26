"use client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

// Donne l'utilisateur connecte (ou null) et se met a jour tout seul.
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return { user, loading };
}

export function displayName(user: User): string {
  const full = (user.user_metadata?.full_name as string | undefined) ?? "";
  return full.trim().split(" ")[0] || (user.email ?? "").split("@")[0];
}
