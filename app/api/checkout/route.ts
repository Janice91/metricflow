import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { getCatalog } from "@/lib/serverCatalog";
import { daysBetween, quote } from "@/lib/pricing";

// Cree une session de paiement Stripe. Le prix est recalcule ICI, cote serveur,
// a partir du prix en base : personne ne peut payer moins en modifiant la page.
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "Paiement non configure (STRIPE_SECRET_KEY manquante)." }, { status: 500 });
  }
  try {
    // Compte obligatoire : on verifie le jeton de connexion aupres de Supabase
    const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "")
    const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "", {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: u } = token ? await sb.auth.getUser(token) : { data: { user: null } };
    if (!u.user) return NextResponse.json({ error: "Compte requis : connecte-toi pour reserver." }, { status: 401 });
    const b = await req.json();
    const { allCars } = await getCatalog();
    const car = allCars.find((c) => c.id === String(b.carId ?? "") && c.active !== false);
    const days = daysBetween(String(b.du ?? ""), String(b.au ?? ""));
    if (!car || days < 1) return NextResponse.json({ error: "Reservation invalide." }, { status: 400 });
    const opts: string[] = Array.isArray(b.opts) ? b.opts.map(String) : [];
    const q = quote(car.pricePerDay, days, opts);
    const origin = req.headers.get("origin") ?? new URL(req.url).origin;
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: b.email ? String(b.email) : undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(q.total * 100),
            product_data: { name: `Location ${car.brand} ${car.model} - ${days} jour${days > 1 ? "s" : ""}` },
          },
        },
      ],
      metadata: { ref: String(b.ref ?? "") },
      success_url: `${origin}/reservation/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/reservation?${String(b.back ?? "")}`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erreur Stripe." }, { status: 500 });
  }
}
