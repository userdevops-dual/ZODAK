import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Loader } from "@/components/ui/Loader";
import { Providers } from "@/components/Providers";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ZODAK | Luxury Fashion",
  description: "Premium Global Fashion Brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${outfit.variable} antialiased font-sans`}
      >
        <Loader />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
