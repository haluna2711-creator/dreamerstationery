import type { Metadata } from "next";
import { Baloo_2, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const baloo = Baloo_2({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
});

const vietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vietnam",
});

export const metadata: Metadata = {
  title: "Dreamer Stationery — Tiệm Tạp Hóa Mộng Mơ",
  description:
    "Văn phòng phẩm và đồ xinh cho những ai thích mơ mộng: sổ tay, bút, sticker, washi tape và hơn thế nữa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${baloo.variable} ${vietnam.variable} min-h-screen bg-cream font-body text-ink`}
      >
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
