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
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type Result = { ok: boolean; message: string } | null;

export default function CheckoutPage() {
  const { items, subtotal, clear, update, remove } = useCart();
  const [name, setName] = useState("");
  // Address split into multiple fields
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
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
    if (!street.trim()) return setResult({ ok: false, message: "Street address is required." });
    if (!city.trim()) return setResult({ ok: false, message: "City is required." });
    if (!stateCode.trim()) return setResult({ ok: false, message: "State is required." });
    const st = stateCode.trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(st)) return setResult({ ok: false, message: "State must be a 2-letter code (e.g., CA)." });
    if (!zip.trim()) return setResult({ ok: false, message: "ZIP is required." });
    if (!/^\d{5}(-?\d{4})?$/.test(zip.trim())) return setResult({ ok: false, message: "ZIP must be 5 digits or 9-digit ZIP+4." });
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
          address: {
            street,
            city,
            state: st,
            zip: zip.trim(),
          },
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
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      <div className="mt-2 text-muted-foreground">Total: {formatMoney(subtotal)}</div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-lg border p-4">
          <h2 className="text-lg font-medium">Order Summary</h2>
          <ul className="mt-3 space-y-3">
            {items.map((it) => (
              <li key={it.id} className="flex flex-col gap-2">
                {/* Top row: item name only */}
                <div className="text-sm font-medium">{it.name}</div>

                {/* Bottom row: price each, qty controls, line total and remove */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-muted-foreground">{formatMoney(it.price)} each</div>
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
                      <Input
                        type="number"
                        inputMode="numeric"
                        min={0}
                        className="w-16 text-center text-sm"
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
                  </div>
                  <div className="flex items-center gap-2">
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
                  </div>
                </div>
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
              {/* Street */}
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-9 w-full" />
              {/* City / State / ZIP */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
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
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              {/* Address fields */}
              <label className="grid gap-1">
                <span className="text-sm">Street</span>
                <Input
                  placeholder="123 Main St"
                  autoComplete="address-line1"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="grid gap-1">
                  <span className="text-sm">City</span>
                  <Input
                    placeholder="Springfield"
                    autoComplete="address-level2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm">State</span>
                  <Select
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value.toUpperCase())}
                    required
                    aria-label="State"
                  >
                    <option value="" disabled>
                      Select state
                    </option>
                    {[
                      ["AL", "Alabama"],
                      ["AK", "Alaska"],
                      ["AZ", "Arizona"],
                      ["AR", "Arkansas"],
                      ["CA", "California"],
                      ["CO", "Colorado"],
                      ["CT", "Connecticut"],
                      ["DE", "Delaware"],
                      ["FL", "Florida"],
                      ["GA", "Georgia"],
                      ["HI", "Hawaii"],
                      ["ID", "Idaho"],
                      ["IL", "Illinois"],
                      ["IN", "Indiana"],
                      ["IA", "Iowa"],
                      ["KS", "Kansas"],
                      ["KY", "Kentucky"],
                      ["LA", "Louisiana"],
                      ["ME", "Maine"],
                      ["MD", "Maryland"],
                      ["MA", "Massachusetts"],
                      ["MI", "Michigan"],
                      ["MN", "Minnesota"],
                      ["MS", "Mississippi"],
                      ["MO", "Missouri"],
                      ["MT", "Montana"],
                      ["NE", "Nebraska"],
                      ["NV", "Nevada"],
                      ["NH", "New Hampshire"],
                      ["NJ", "New Jersey"],
                      ["NM", "New Mexico"],
                      ["NY", "New York"],
                      ["NC", "North Carolina"],
                      ["ND", "North Dakota"],
                      ["OH", "Ohio"],
                      ["OK", "Oklahoma"],
                      ["OR", "Oregon"],
                      ["PA", "Pennsylvania"],
                      ["RI", "Rhode Island"],
                      ["SC", "South Carolina"],
                      ["SD", "South Dakota"],
                      ["TN", "Tennessee"],
                      ["TX", "Texas"],
                      ["UT", "Utah"],
                      ["VT", "Vermont"],
                      ["VA", "Virginia"],
                      ["WA", "Washington"],
                      ["WV", "West Virginia"],
                      ["WI", "Wisconsin"],
                      ["WY", "Wyoming"],
                      ["DC", "District of Columbia"],
                    ].map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </label>
                <label className="grid gap-1">
                  <span className="text-sm">ZIP</span>
                  <Input
                    placeholder="94105"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value.replace(/[^0-9-]/g, ""))}
                    required
                  />
                </label>
              </div>
              <label className="grid gap-1">
                <span className="text-sm">Card number</span>
                <Input
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  className="tracking-wider"
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  required
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1">
                  <span className="text-sm">Expiry (MM/YY)</span>
                  <Input
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="12/29"
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm">CVC</span>
                  <Input
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    required
                  />
                </label>
              </div>
              <Button type="submit" disabled={disabled} className="mt-2">
                {loading ? "Processing…" : `Pay ${formatMoney(subtotal)}`}
              </Button>
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
