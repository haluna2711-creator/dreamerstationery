"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, setQuantity, removeItem, total, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name,
          customer_phone: form.phone,
          customer_address: form.address,
          items,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Không tạo được đơn hàng");
      }

      const { order_code } = await res.json();
      clear();
      router.push(`/don-hang/${order_code}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Có lỗi xảy ra, thử lại nhé"
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-5 py-16 text-center">
        <p className="font-display text-2xl text-ink">
          Giỏ hàng đang trống ☁️
        </p>
        <p className="mt-2 font-body text-ink/60">
          Ghé qua tiệm và chọn vài món xinh xinh nhé!
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Giỏ hàng của bạn</h1>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item.product_id}
            className="flex items-center gap-4 rounded-2xl border-2 border-lavender-dark/15 bg-white p-3"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-lavender-light">
              {item.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl">
                  📎
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-body font-semibold text-ink">{item.name}</p>
              <p className="font-body text-sm text-lavender-dark">
                {item.price.toLocaleString("vi-VN")}đ
              </p>
            </div>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                setQuantity(item.product_id, Number(e.target.value))
              }
              className="w-14 rounded-lg border-2 border-lavender-dark/20 px-2 py-1 text-center font-body"
            />
            <button
              type="button"
              onClick={() => removeItem(item.product_id)}
              aria-label={`Xoá ${item.name}`}
              className="text-ink/40 hover:text-bubblegum"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-right font-display text-2xl text-ink">
        Tổng: <span className="text-bubblegum">{total.toLocaleString("vi-VN")}đ</span>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-3">
        <h2 className="font-display text-xl text-ink">Thông tin nhận hàng</h2>
        <input
          required
          placeholder="Họ và tên"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full rounded-xl border-2 border-lavender-dark/20 px-4 py-2 font-body"
        />
        <input
          required
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="w-full rounded-xl border-2 border-lavender-dark/20 px-4 py-2 font-body"
        />
        <textarea
          required
          placeholder="Địa chỉ giao hàng"
          value={form.address}
          onChange={(e) =>
            setForm((f) => ({ ...f, address: e.target.value }))
          }
          className="w-full rounded-xl border-2 border-lavender-dark/20 px-4 py-2 font-body"
          rows={3}
        />

        {error && <p className="font-body text-sm text-bubblegum">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-mint px-6 py-3 font-body font-bold text-white shadow-[0_4px_0_0_#3ba98c] transition active:translate-y-[3px] active:shadow-none disabled:opacity-60"
        >
          {submitting ? "Đang tạo đơn..." : "Đặt hàng & nhận mã QR"}
        </button>
      </form>
    </section>
  );
}
