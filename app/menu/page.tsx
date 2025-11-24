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
      { name: "Avocado toast with poached egg", price: "11.25" },
      { name: "Breakfast croissant sandwich", price: "10.95" },
      { name: "Greek yogurt parfait", price: "8.50" },
      { name: "Buttermilk pancakes with maple syrup", price: "9.50" },
    ],
  },
  {
    title: "Single Serve Box Lunch",
    items: [
      { name: "Signature sandwiches", price: "18.95" },
      { name: "Cold bistro bowls", price: "19.95" },
      { name: "Chinatown", price: "20.95" },
      { name: "Beacon Hill", price: "20.25" },
      { name: "Mediterranean wrap", price: "17.95" },
      { name: "Italian sub deluxe", price: "19.50" },
      { name: "Caesar salad with grilled chicken", price: "18.50" },
      { name: "Asian fusion noodle box", price: "21.50" },
    ],
  },
  {
    title: "Hot Bistro Bowls",
    items: [
      { name: "Cajun Jambalaya", price: "13.95" },
      { name: "Chicken Tikka Masala", price: "13.95" },
      { name: "Southwestern with pulled beef", price: "15.75" },
      { name: "Buffalo Chicken Mac & Cheese", price: "12.25" },
      { name: "Thai red curry with vegetables", price: "14.50" },
      { name: "Korean beef bibimbap", price: "16.25" },
      { name: "Italian sausage & peppers", price: "13.75" },
      { name: "Teriyaki salmon bowl", price: "17.95" },
    ],
  },
  {
    title: "Appetizers & Starters",
    items: [
      { name: "Bruschetta trio", price: "8.95" },
      { name: "Spinach & artichoke dip", price: "9.50" },
      { name: "Caprese skewers", price: "7.75" },
      { name: "Buffalo wings (dozen)", price: "12.95" },
      { name: "Shrimp cocktail", price: "14.50" },
      { name: "Vegetable spring rolls", price: "8.25" },
      { name: "Hummus platter with pita", price: "9.95" },
      { name: "Charcuterie board", price: "24.95" },
    ],
  },
  {
    title: "Salads & Sides",
    items: [
      { name: "Garden salad", price: "6.95" },
      { name: "Caesar salad", price: "7.50" },
      { name: "Quinoa power bowl", price: "8.95" },
      { name: "Roasted vegetables", price: "5.75" },
      { name: "Garlic mashed potatoes", price: "5.50" },
      { name: "Wild rice pilaf", price: "6.25" },
      { name: "Seasonal fruit platter", price: "7.95" },
      { name: "Grilled asparagus", price: "6.50" },
    ],
  },
  {
    title: "Main Courses",
    items: [
      { name: "Grilled salmon with lemon butter", price: "22.95" },
      { name: "Herb-roasted chicken breast", price: "18.50" },
      { name: "Prime rib (8oz)", price: "28.95" },
      { name: "Vegetarian lasagna", price: "16.75" },
      { name: "Pan-seared sea bass", price: "26.50" },
      { name: "Braised short ribs", price: "24.95" },
      { name: "Stuffed bell peppers", price: "15.50" },
      { name: "Filet mignon (6oz)", price: "32.95" },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Tiramisu", price: "6.95" },
      { name: "Chocolate lava cake", price: "7.50" },
      { name: "New York cheesecake", price: "6.50" },
      { name: "Crème brûlée", price: "7.95" },
      { name: "Fresh berry tart", price: "6.75" },
      { name: "Chocolate mousse", price: "5.95" },
      { name: "Cannoli duo", price: "6.25" },
      { name: "Assorted cookie platter", price: "4.95" },
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
      { name: "Sparkling Water", price: "2.25" },
      { name: "Orange Juice", price: "2.00" },
      { name: "Fresh-brewed espresso", price: "3.50" },
      { name: "Cappuccino", price: "4.25" },
      { name: "Hot chocolate", price: "3.75" },
      { name: "Herbal tea selection", price: "2.50" },
    ],
  },
];

export default function MenuPage() {
  const { add, items } = useCart();
  const slug = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
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
          Explore our offerings. Popular selections are available to add to your
          cart. Full menu is listed by category below.
        </p>
      </header>

      <section className="mt-6 rounded-lg border p-4">
        <h2 className="text-xl font-medium">Popular Dishes</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {popular.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border p-4 flex flex-col gap-2"
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">
                {formatMoney(item.price)}
              </div>
              <div className="mt-2 inline-flex items-center gap-2">
                <Button
                  onClick={() =>
                    add({ id: item.id, name: item.name, price: item.price })
                  }
                >
                  Add to Cart
                </Button>
                {getQty(item.id) > 0 && (
                  <Badge
                    variant="secondary"
                    aria-label={`${getQty(item.id)} in cart`}
                  >
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
                  <li
                    key={`${sec.title}:${it.name}`}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">{it.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatMoney(cents)}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          add({ id, name: it.name, price: cents });
                          toast.success(`${it.name} added to cart`, {
                            description: `${formatMoney(
                              cents
                            )} • View cart from top bar`,
                          });
                        }}
                      >
                        Add to Cart
                      </Button>
                      {qty > 0 && (
                        <Badge
                          variant="secondary"
                          aria-label={`${qty} in cart`}
                        >
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
