import { NextRequest, NextResponse } from "next/server";
import { luhnCheck, validateExpiry } from "@/lib/payments";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, card, exp, cvc, amount, currency } = body || {};

    if (!name || !card || !exp || !cvc) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    if (!luhnCheck(card)) {
      return NextResponse.json({ error: "Card number invalid" }, { status: 400 });
    }
    if (!validateExpiry(exp)) {
      return NextResponse.json({ error: "Card expired or invalid format" }, { status: 400 });
    }
    if (!/^\d{3,4}$/.test(String(cvc))) {
      return NextResponse.json({ error: "Invalid CVC" }, { status: 400 });
    }

    // Simulate Stripe intent creation and confirmation
    await new Promise((r) => setTimeout(r, 600));

    const client_secret = `pi_${Math.random().toString(36).slice(2)}_secret_${Date.now()}`;
    return NextResponse.json({ id: `pi_${Date.now()}`, client_secret, amount, currency: currency || "usd", status: "succeeded" });
  } catch (e: any) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
