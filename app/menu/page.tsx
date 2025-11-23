"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart, formatMoney } from "@/components/providers/cart-provider";
import { toast } from "sonner";

type MenuSection = {
  title: string;
  items: { name: string; price: string }[];
};

const sections: MenuSection[] = [
  {
    title: "Single Serve Breakfast Menu",
    items: [
      { name: "Wrapped Egg Sandwiches", price: "10.50" },
      { name: "Full size breakfast burrito", price: "9.25" },
      { name: "Veggie lover's breakfast burrito", price: "9.75" },
      { name: "French toast sticks", price: "9.75" },
    ],
  },
  {
    title: "Single server box lunch",
    items: [
      { name: "Signature sandwiches", price: "18.95" },
      { name: "Cold bistro bowls", price: "19.95" },
      { name: "Chinatown", price: "20.95" },
      { name: "Beacon Hill", price: "20.25" },
    ],
  },
  {
    title: "Hot Bistro Bowls",
    items: [
      { name: "Cajun Jambalaya", price: "13.95" },
      { name: "Chicken Tikka Masala", price: "13.95" },
      { name: "Southwestern with pull beef", price: "15.75" },
      { name: "Buffalo Chicken Mac & Cheese", price: "12.25" },
    ],
  },
  {
    title: "Beverage Menu",
    items: [
      { name: "Assorted Soda", price: "2.25" },
      { name: "Coffee", price: "2.25" },
      { name: "Lemonade", price: "3.95" },
      { name: "Cranberry Juice", price: "2.00" },
      { name: "Hot Apple Cider", price: "2.75" },
      { name: "Iced Tea", price: "2.00" },
      { name: "Sparking Water", price: "2.25" },
      { name: "Orange Juice", price: "2.00" },
    ],
  },
];

export default function MenuPage() {
  const { add, items } = useCart();
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const priceToCents = (p: string) => Math.round(parseFloat(p) * 100);
  const popular = [
    { id: "dish1", name: "Signature Canapés", price: 2500 },
    { id: "dish2", name: "Gourmet Slider Box", price: 3200 },
    { id: "dish3", name: "Mini Dessert Trio", price: 1800 },
  ];
  const getQty = (id: string) => items.find((i) => i.id === id)?.qty ?? 0;

  return (
    <div className="mx-auto max-w-5xl">
      <header>
        <h1 className="text-3xl font-semibold">Menu</h1>
        <p className="mt-2 text-muted-foreground">
          Explore our offerings. Popular selections are available to add to your cart. Full menu is listed by category
          below.
        </p>
      </header>

      <section className="mt-6 rounded-lg border p-4">
        <h2 className="text-xl font-medium">Popular Dishes</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {popular.map((item) => (
            <div key={item.id} className="rounded-lg border p-4 flex flex-col gap-2">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">{formatMoney(item.price)}</div>
              <div className="mt-2 inline-flex items-center gap-2">
                <Button
                  onClick={() => add({ id: item.id, name: item.name, price: item.price })}
                >
                  Add to Cart
                </Button>
                {getQty(item.id) > 0 && (
                  <Badge variant="secondary" aria-label={`${getQty(item.id)} in cart`}>
                    {getQty(item.id)}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6">
        {sections.map((sec) => (
          <div key={sec.title} className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">{sec.title}</h3>
            <ul className="mt-3 divide-y">
              {sec.items.map((it) => {
                const id = `${slug(sec.title)}:${slug(it.name)}`;
                const cents = priceToCents(it.price);
                const qty = getQty(id);
                return (
                  <li key={`${sec.title}:${it.name}`} className="flex items-center justify-between gap-3 py-2">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">{it.name}</div>
                      <div className="text-xs text-muted-foreground">{formatMoney(cents)}</div>
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          add({ id, name: it.name, price: cents });
                          toast.success(`${it.name} added to cart`, {
                            description: `${formatMoney(cents)} • View cart from top bar`,
                          });
                        }}
                      >
                        Add to Cart
                      </Button>
                      {qty > 0 && (
                        <Badge variant="secondary" aria-label={`${qty} in cart`}>
                          {qty}
                        </Badge>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
