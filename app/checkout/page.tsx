"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, formatMoney } from "@/components/providers/cart-provider";
import { luhnCheck, validateExpiry } from "@/lib/payments";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

type Result = { ok: boolean; message: string } | null;

export default function CheckoutPage() {
  const { items, subtotal, clear, update, remove } = useCart();
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const disabled = loading || items.length === 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    // Client-side validation
    if (!name.trim()) return setResult({ ok: false, message: "Name is required." });
    if (!luhnCheck(card)) return setResult({ ok: false, message: "Card number is invalid." });
    if (!validateExpiry(exp)) return setResult({ ok: false, message: "Expiry must be in MM/YY and not expired." });
    if (!/^\d{3,4}$/.test(cvc)) return setResult({ ok: false, message: "CVC is invalid." });

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          card,
          exp,
          cvc,
          amount: subtotal,
          currency: "usd",
          items: items.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Payment failed");
      setResult({ ok: true, message: `Payment succeeded. ${data?.client_secret ? "Ref:" : ""} ${data?.client_secret ?? ""}` });
      toast.success("Payment successful", {
        description: `Your order for ${formatMoney(subtotal)} has been placed.`,
      });
      clear();
    } catch (err: any) {
      setResult({ ok: false, message: err.message || "Payment failed" });
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <div className="mt-6 rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="mt-4">
            <Link href="/">Continue shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      <div className="mt-2 text-muted-foreground">Total: {formatMoney(subtotal)}</div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-lg border p-4">
          <h2 className="text-lg font-medium">Order Summary</h2>
          <ul className="mt-3 space-y-3">
            {items.map((it) => (
              <li key={it.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{it.name}</div>
                  <div className="text-xs text-muted-foreground">{formatMoney(it.price)} each</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    aria-label={`Decrease quantity of ${it.name}`}
                    disabled={loading}
                    onClick={() => {
                      const next = it.qty - 1;
                      if (next <= 0) {
                        setConfirmId(it.id);
                      } else {
                        update(it.id, next);
                      }
                    }}
                  >
                    −
                  </Button>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    className="w-16 rounded-md border bg-background px-2 py-1 text-center text-sm"
                    aria-label={`Quantity for ${it.name}`}
                    value={it.qty}
                    disabled={loading}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!Number.isFinite(val)) return;
                      if (val <= 0) {
                        setConfirmId(it.id);
                      } else {
                        update(it.id, val);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    aria-label={`Increase quantity of ${it.name}`}
                    disabled={loading}
                    onClick={() => update(it.id, it.qty + 1)}
                  >
                    +
                  </Button>
                </div>
                <div className="text-sm tabular-nums">{formatMoney(it.price * it.qty)}</div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={`Remove ${it.name}`}
                  disabled={loading}
                  onClick={() => setConfirmId(it.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t pt-3 text-right font-medium">{formatMoney(subtotal)}</div>
        </section>

        <section className="rounded-lg border p-4" aria-busy={loading}>
          <h2 className="text-lg font-medium">Payment</h2>
          {loading ? (
            <div className="mt-3 grid gap-3">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-9 w-full" />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
              <Skeleton className="h-10 w-40" />
            </div>
          ) : (
            <form className="mt-3 grid gap-3" onSubmit={onSubmit}>
              <label className="grid gap-1">
                <span className="text-sm">Name on card</span>
                <input
                  className="rounded-md border bg-background px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm">Card number</span>
                <input
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  className="rounded-md border bg-background px-3 py-2 tracking-wider"
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  required
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1">
                  <span className="text-sm">Expiry (MM/YY)</span>
                  <input
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="12/29"
                    className="rounded-md border bg-background px-3 py-2"
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm">CVC</span>
                  <input
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    className="rounded-md border bg-background px-3 py-2"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    required
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={disabled}
                className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60"
              >
                {loading ? "Processing…" : `Pay ${formatMoney(subtotal)}`}
              </button>
              {result && (
                <p className={`text-sm ${result.ok ? "text-green-600" : "text-red-600"}`}>{result.message}</p>
              )}
            </form>
          )}
        </section>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Payments simulated via Stripe-style flow. No real charges are made.</p>
      <ConfirmDialog
        open={!!confirmId}
        title="Remove item"
        description={confirmId ? `Remove "${items.find((i) => i.id === confirmId)?.name ?? "this item"}" from your cart?` : undefined}
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (confirmId) remove(confirmId);
          setConfirmId(null);
        }}
        onCancel={() => setConfirmId(null)}
        disabled={loading}
      />
    </div>
  );
}
