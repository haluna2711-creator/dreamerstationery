"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b-2 border-dashed border-lavender-dark/30 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <span className="font-display text-xl text-ink">
            Dreamer <span className="text-lavender-dark">Stationery</span>
          </span>
        </Link>
        <Link
          href="/gio-hang"
          className="relative rounded-full bg-lavender px-4 py-2 font-body text-sm font-semibold text-white shadow-[0_3px_0_0_#8A63D9] transition active:translate-y-[2px] active:shadow-none"
        >
          Giỏ hàng
          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-bubblegum text-xs font-bold text-white">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
