import { NextResponse } from "next/server";
import Stripe from "stripe";

// Verifie aupres de Stripe qu'une session a bien ete payee.
export async function GET(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const id = new URL(req.url).searchParams.get("session_id");
  if (!key || !id) return NextResponse.json({ paid: false, error: "Parametres manquants." }, { status: 400 });
  try {
    const s = await new Stripe(key).checkout.sessions.retrieve(id);
    return NextResponse.json({
      paid: s.payment_status === "paid",
      ref: s.metadata?.ref ?? "",
      amount: (s.amount_total ?? 0) / 100,
    });
  } catch (e) {
    return NextResponse.json({ paid: false, error: e instanceof Error ? e.message : "Erreur Stripe." }, { status: 500 });
  }
}
