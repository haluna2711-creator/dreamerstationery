import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

function generateOrderCode() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DH${stamp}${rand}`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { customer_name, customer_phone, customer_address, items } = body;

  if (!customer_name || !customer_phone || !customer_address) {
    return NextResponse.json(
      { error: "Thiếu thông tin khách hàng" },
      { status: 400 }
    );
  }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Giỏ hàng trống" }, { status: 400 });
  }

  // Re-fetch current prices/stock from the DB — never trust client-sent prices.
  const productIds = items.map((i: { product_id: string }) => i.product_id);
  const { data: products, error: productsError } = await supabaseAdmin
    .from("products")
    .select("id, name, price, stock, is_active")
    .in("id", productIds);

  if (productsError || !products) {
    return NextResponse.json(
      { error: "Không tải được thông tin sản phẩm" },
      { status: 500 }
    );
  }

  let amount = 0;
  const orderItems = [];
  for (const item of items as { product_id: string; quantity: number }[]) {
    const product = products.find((p) => p.id === item.product_id);
    if (!product || !product.is_active) {
      return NextResponse.json(
        { error: "Một sản phẩm trong giỏ hàng không còn khả dụng" },
        { status: 400 }
      );
    }
    if (item.quantity > product.stock) {
      return NextResponse.json(
        { error: `"${product.name}" không đủ hàng trong kho` },
        { status: 400 }
      );
    }
    amount += product.price * item.quantity;
    orderItems.push({
      product_id: product.id,
      product_name: product.name,
      unit_price: product.price,
      quantity: item.quantity,
    });
  }

  const order_code = generateOrderCode();

  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      order_code,
      customer_name,
      customer_phone,
      customer_address,
      amount,
      status: "pending",
    })
    .select()
    .single();

  if (orderError || !order) {
    return NextResponse.json(
      { error: "Không tạo được đơn hàng" },
      { status: 500 }
    );
  }

  const { error: itemsError } = await supabaseAdmin.from("order_items").insert(
    orderItems.map((i) => ({ ...i, order_id: order.id }))
  );

  if (itemsError) {
    return NextResponse.json(
      { error: "Không lưu được chi tiết đơn hàng" },
      { status: 500 }
    );
  }

  return NextResponse.json({ order_code, amount });
}
