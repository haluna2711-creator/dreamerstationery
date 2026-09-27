import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function PATCH(
  _request: Request,
  { params }: { params: { code: string } }
) {
  const { error } = await supabaseAdmin
    .from("orders")
    .update({ customer_confirmed: true })
    .eq("order_code", params.code);

  if (error) {
    return NextResponse.json(
      { error: "Không cập nhật được đơn hàng" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
