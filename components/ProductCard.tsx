import Link from "next/link";
import { Product } from "@/lib/types";

const ACCENTS = [
  { tape: "bg-bubblegum", ring: "border-bubblegum" },
  { tape: "bg-mint", ring: "border-mint" },
  { tape: "bg-sun", ring: "border-sun" },
  { tape: "bg-lavender", ring: "border-lavender" },
];

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const tilt = index % 2 === 0 ? "-rotate-2" : "rotate-2";

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className={`group relative block rounded-2xl border-2 ${accent.ring} bg-white p-3 shadow-[0_4px_0_0_rgba(0,0,0,0.08)] transition duration-200 hover:-translate-y-1 hover:rotate-0 ${tilt}`}
    >
      <span
        className={`absolute -top-3 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 rounded-sm ${accent.tape} opacity-90`}
        aria-hidden="true"
      />
      <div className="aspect-square overflow-hidden rounded-xl bg-lavender-light">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            📎
          </div>
        )}
      </div>
      <div className="mt-3 px-1 pb-1">
        <p className="font-display text-base text-ink">{product.name}</p>
        <p className="mt-1 font-body text-sm font-bold text-lavender-dark">
          {product.price.toLocaleString("vi-VN")}đ
        </p>
      </div>
    </Link>
  );
}
