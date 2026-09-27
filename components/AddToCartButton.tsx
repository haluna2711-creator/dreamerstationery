"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(
      {
        product_id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      },
      quantity
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border-2 border-lavender-dark/30">
        <button
          type="button"
          aria-label="Giảm số lượng"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-2 font-display text-lg text-lavender-dark"
        >
          –
        </button>
        <span className="w-8 text-center font-body font-semibold">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Tăng số lượng"
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          className="px-3 py-2 font-display text-lg text-lavender-dark"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={product.stock <= 0}
        className="rounded-full bg-bubblegum px-6 py-3 font-body font-bold text-white shadow-[0_4px_0_0_#d9578f] transition active:translate-y-[3px] active:shadow-none disabled:cursor-not-allowed disabled:bg-ink/20 disabled:shadow-none"
      >
        {product.stock <= 0
          ? "Hết hàng"
          : justAdded
          ? "Đã thêm vào giỏ ✓"
          : "Thêm vào giỏ 🛍️"}
      </button>
    </div>
  );
}
