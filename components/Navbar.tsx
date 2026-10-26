"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { displayName, useUser } from "@/lib/auth";

const LINKS = [
  { href: "/voitures", label: "Nos voitures" },
  { href: "/agences", label: "Agences" },
  { href: "/reservations", label: "Mes r\u00e9servations" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { user } = useUser();

  async function logout() {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-lg text-ink">D</span>
          <span className="font-display text-2xl font-bold">Driveo</span>
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition hover:bg-ink/5 ${path.startsWith(l.href) ? "bg-ink/5 font-semibold" : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <span className="text-sm font-medium">Bonjour, {displayName(user)}</span>
              <button onClick={logout} className="btn btn-ghost !py-2">D&eacute;connexion</button>
            </>
          ) : (
            <Link href="/login" className="btn btn-ghost !py-2">Connexion</Link>
          )}
          <Link href="/voitures" className="btn btn-primary !py-2">R&eacute;server</Link>
        </div>
        <button aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-xl border border-line md:hidden" onClick={() => setOpen(!open)}>
          {open ? "\u2715" : "\u2630"}
        </button>
      </nav>
      {open && (
        <div className="border-t border-line bg-paper px-5 pb-5 md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-line py-3 font-medium">
              {l.label}
            </Link>
          ))}
          {user ? (
            <button onClick={logout} className="btn btn-ghost mt-4 w-full">D&eacute;connexion ({displayName(user)})</button>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="btn btn-ghost mt-4 w-full">Connexion</Link>
          )}
          <Link href="/voitures" onClick={() => setOpen(false)} className="btn btn-primary mt-3 w-full">R&eacute;server</Link>
        </div>
      )}
    </header>
  );
}
