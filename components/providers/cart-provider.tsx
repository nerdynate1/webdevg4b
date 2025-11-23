"use client";

import { createContext, useContext, useMemo, useReducer } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number; // cents
  qty: number;
};

type State = {
  items: CartItem[];
};

type Action =
  | { type: "add"; item: Omit<CartItem, "qty">; qty?: number }
  | { type: "remove"; id: string }
  | { type: "update"; id: string; qty: number }
  | { type: "clear" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const qty = action.qty ?? 1;
      const idx = state.items.findIndex((i) => i.id === action.item.id);
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = { ...items[idx], qty: items[idx].qty + qty };
        return { items };
      }
      return { items: [...state.items, { ...action.item, qty }] };
    }
    case "remove":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "update":
      return {
        items: state.items.map((i) => (i.id === action.id ? { ...i, qty: Math.max(0, action.qty) } : i)).filter((i) => i.qty > 0),
      };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

type Ctx = {
  items: CartItem[];
  subtotal: number; // cents
  count: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const value = useMemo<Ctx>(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const count = state.items.reduce((sum, i) => sum + i.qty, 0);
    return {
      items: state.items,
      subtotal,
      count,
      add: (item, qty) => dispatch({ type: "add", item, qty }),
      remove: (id) => dispatch({ type: "remove", id }),
      update: (id, qty) => dispatch({ type: "update", id, qty }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatMoney(cents: number) {
  return (cents / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });
}
