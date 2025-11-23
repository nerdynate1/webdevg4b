"use client";

import { useCart, formatMoney } from "@/components/providers/cart-provider";
import { toast } from "sonner";
export default function Home() {
  const { add } = useCart();
  return (
    <div className="mx-auto max-w-5xl">
      <section className="rounded-xl bg-card text-card-foreground p-8 shadow">
        <h1 className="text-3xl font-semibold">Star Catering</h1>
        <p className="mt-2 text-muted-foreground">
          Modern, simple and delicious catering for your special occasions. Explore our venues, discover our menus, and plan your perfect event.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-medium">Elegant Venues</h2>
            <p className="mt-2 text-sm text-muted-foreground">Hand-picked locations to elevate your celebration.</p>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-medium">Occasions We Serve</h2>
            <p className="mt-2 text-sm text-muted-foreground">Weddings, corporate events, birthdays, and more.</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Popular Dishes</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { id: "dish1", name: "Signature Canapés", price: 2500 },
              { id: "dish2", name: "Gourmet Slider Box", price: 3200 },
              { id: "dish3", name: "Mini Dessert Trio", price: 1800 },
            ].map((item) => (
              <div key={item.id} className="rounded-lg border p-4 flex flex-col gap-2">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">{formatMoney(item.price)}</div>
                <button
                  className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-primary-foreground hover:opacity-90"
                  onClick={() => {
                    add({ id: item.id, name: item.name, price: item.price });
                    toast.success(`${item.name} added to cart`, { description: `${formatMoney(item.price)} • View cart from top bar` });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
