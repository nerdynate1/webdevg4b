"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type FontCtx = {
  scale: number; // 0.875 – 1.25
  increase: () => void;
  decrease: () => void;
  reset: () => void;
};

const Ctx = createContext<FontCtx | null>(null);

const MIN = 0.875;
const MAX = 1.25;
const STEP = 0.0625;

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? Number(localStorage.getItem("font-scale") || "1") : 1;
    setScale(Number.isFinite(saved) && saved > 0 ? saved : 1);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.fontSize = `${16 * scale}px`;
      localStorage.setItem("font-scale", String(scale));
    }
  }, [scale]);

  const value = useMemo<FontCtx>(
    () => ({
      scale,
      increase: () => setScale((s) => Math.min(MAX, +(s + STEP).toFixed(4))),
      decrease: () => setScale((s) => Math.max(MIN, +(s - STEP).toFixed(4))),
      reset: () => setScale(1),
    }),
    [scale]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFontSize() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFontSize must be used within FontSizeProvider");
  return ctx;
}
