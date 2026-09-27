import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { CloudDecor } from "@/components/CloudDecor";

export const revalidate = 60;

async function getProducts(category?: string) {
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []) as Product[];
}

async function getCategories() {
  const { data } = await supabase
    .from("products")
    .select("category")
    .eq("is_active", true);
  const set = new Set(
    (data ?? []).map((r) => r.category).filter(Boolean) as string[]
  );
  return Array.from(set);
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [products, categories] = await Promise.all([
    getProducts(searchParams.category),
    getCategories(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-14 pt-16 text-center">
        <CloudDecor />
        <p className="relative font-display text-lg text-bubblegum">
          chào mừng đến với
        </p>
        <h1 className="relative mt-1 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Dreamer Stationery
        </h1>
        <p className="relative mt-2 font-display text-2xl text-lavender-dark">
          tiệm tạp hóa mộng mơ ☁️
        </p>
        <p className="relative mx-auto mt-4 max-w-md font-body text-ink/70">
          Sổ tay, bút xinh, sticker và washi tape — cho những ai muốn góc học
          tập lúc nào cũng ngập tràn màu sắc.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5">
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            href="/"
            className={`rounded-full border-2 px-4 py-1.5 font-body text-sm font-semibold ${
              !searchParams.category
                ? "border-lavender-dark bg-lavender text-white"
                : "border-lavender-dark/30 text-ink/70"
            }`}
          >
            Tất cả
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${encodeURIComponent(cat)}`}
              className={`rounded-full border-2 px-4 py-1.5 font-body text-sm font-semibold ${
                searchParams.category === cat
                  ? "border-lavender-dark bg-lavender text-white"
                  : "border-lavender-dark/30 text-ink/70"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <p className="mt-16 text-center font-body text-ink/60">
            Chưa có sản phẩm nào ở đây — ghé lại sau nhé! 🌙
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 pb-16 sm:grid-cols-3 md:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
