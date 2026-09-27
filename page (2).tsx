import { notFound } from "next/navigation";
import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase-server";
import { buildVietQrUrl } from "@/lib/vietqr";
import { ConfirmPaymentButton } from "./ConfirmPaymentButton";

async function getOrder(code: string) {
  const { data } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("order_code", code)
    .single();
  return data;
}

export default async function OrderPage({
  params,
}: {
  params: { code: string };
}) {
  const order = await getOrder(params.code);
  if (!order) notFound();

  const qrUrl = buildVietQrUrl(order.amount, order.order_code);

  return (
    <section className="mx-auto max-w-md px-5 py-12 text-center">
      <p className="font-display text-lg text-mint">đơn hàng đã được tạo 🎉</p>
      <h1 className="mt-1 font-display text-3xl text-ink">
        Mã đơn: {order.order_code}
      </h1>
      <p className="mt-2 font-body text-ink/70">
        Quét mã QR bên dưới bằng app ngân hàng để thanh toán. Nội dung
        chuyển khoản đã được điền sẵn — vui lòng giữ nguyên để chúng mình
        đối chiếu đơn hàng nhanh hơn nhé.
      </p>

      <div className="mx-auto mt-6 w-fit rounded-3xl border-2 border-dashed border-lavender-dark/30 bg-white p-4">
        <Image
          src={qrUrl}
          alt={`Mã QR thanh toán đơn ${order.order_code}`}
          width={280}
          height={280}
          unoptimized
        />
      </div>

      <p className="mt-4 font-display text-2xl text-bubblegum">
        {order.amount.toLocaleString("vi-VN")}đ
      </p>

      <div className="mt-6 rounded-2xl bg-lavender-light/60 p-4 text-left font-body text-sm text-ink/80">
        <p><strong>Người nhận:</strong> {order.customer_name}</p>
        <p><strong>Điện thoại:</strong> {order.customer_phone}</p>
        <p><strong>Địa chỉ:</strong> {order.customer_address}</p>
      </div>

      <div className="mt-6">
        <ConfirmPaymentButton
          orderCode={order.order_code}
          alreadyConfirmed={Boolean(order.customer_confirmed)}
        />
      </div>

      <p className="mt-6 font-body text-xs text-ink/50">
        Lưu lại link này để theo dõi đơn hàng. Chúng mình sẽ xác nhận và
        đóng gói ngay khi nhận được chuyển khoản 🌙
      </p>
    </section>
  );
}
