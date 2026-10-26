"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  function nextUrl(): string {
    const n = new URLSearchParams(window.location.search).get("next") ?? "/reservations";
    return n.startsWith("/") && !n.startsWith("//") ? n : "/reservations";
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    setBusy(true);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
      setBusy(false);
      if (error) return setError(error.message);
      if (data.session) router.push(nextUrl());
      else setInfo("Compte cr\u00e9\u00e9 ! V\u00e9rifie ta bo\u00eete mail pour confirmer, puis connecte-toi.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setError(error.message);
      router.push(nextUrl());
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-5 py-16">
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent text-2xl font-bold text-ink">D</span>
        <h1 className="font-display mt-5 text-4xl font-bold">{mode === "login" ? "Bon retour" : "Cr\u00e9er un compte"}</h1>
        <p className="mt-2 text-muted">
          {mode === "login" ? "Connecte-toi pour r\u00e9server et retrouver tes locations." : "Un compte pour r\u00e9server et suivre toutes tes locations."}
        </p>
      </div>
      <form onSubmit={submit} className="card mt-8 space-y-5 p-7">
        {mode === "signup" && (
          <div>
            <label className="label" htmlFor="fn">Nom complet</label>
            <input id="fn" required minLength={3} className="field" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jean Dupont" />
          </div>
        )}
        <div>
          <label className="label" htmlFor="em">E-mail</label>
          <input id="em" type="email" required className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jean@email.com" />
        </div>
        <div>
          <label className="label" htmlFor="pw">Mot de passe</label>
          <input id="pw" type="password" required minLength={6} className="field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="6 caract&#xE8;res minimum" />
        </div>
        {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {info && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{info}</p>}
        <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:opacity-60">
          {busy ? "Un instant..." : mode === "login" ? "Se connecter" : "Cr\u00e9er mon compte"}
        </button>
        <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setInfo(""); }} className="w-full text-sm font-semibold text-accent hover:underline">
          {mode === "login" ? "Pas encore de compte ? S'inscrire" : "D\u00e9j\u00e0 un compte ? Se connecter"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted"><Link href="/voitures" className="hover:text-ink">&larr; Voir les voitures</Link></p>
    </div>
  );
}
