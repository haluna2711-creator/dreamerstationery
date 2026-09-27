"use client";

import { useState } from "react";

export function ConfirmPaymentButton({
  orderCode,
  alreadyConfirmed,
}: {
  orderCode: string;
  alreadyConfirmed: boolean;
}) {
  const [confirmed, setConfirmed] = useState(alreadyConfirmed);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderCode}/confirm`, {
        method: "PATCH",
      });
      if (res.ok) setConfirmed(true);
    } finally {
      setLoading(false);
    }
  }

  if (confirmed) {
    return (
      <p className="font-body font-semibold text-mint">
        Cảm ơn bạn! Chúng mình sẽ kiểm tra và xác nhận đơn sớm nhất 💌
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="rounded-full bg-sun px-6 py-3 font-body font-bold text-ink shadow-[0_4px_0_0_#e0ab1f] transition active:translate-y-[3px] active:shadow-none disabled:opacity-60"
    >
      {loading ? "Đang gửi..." : "Tôi đã chuyển khoản ✅"}
    </button>
  );
}
