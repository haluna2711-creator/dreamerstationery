import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/types";
import { AddToCartButton } from "@/components/AddToCartButton";

export const revalidate = 60;

async function getProduct(slug: string) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  return data as Product | null;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-3xl border-2 border-lavender-dark/20 bg-lavender-light">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl">
              📎
            </div>
          )}
        </div>

        <div>
          {product.category && (
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-mint">
              {product.category}
            </p>
          )}
          <h1 className="mt-1 font-display text-3xl text-ink">
            {product.name}
          </h1>
          <p className="mt-2 font-display text-2xl text-bubblegum">
            {product.price.toLocaleString("vi-VN")}đ
          </p>
          <p className="mt-4 whitespace-pre-line font-body text-ink/75">
            {product.description}
          </p>
          <p className="mt-3 font-body text-sm text-ink/50">
            {product.stock > 0
              ? `Còn ${product.stock} sản phẩm`
              : "Tạm hết hàng"}
          </p>
          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
