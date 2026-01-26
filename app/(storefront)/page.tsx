"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PremiumHoodieSection } from "@/components/product/PremiumHoodieSection";
import { VolumeOneSection } from "@/components/product/VolumeOneSection";
import { WhyZodakSection } from "@/components/brand/WhyZodakSection";
import { FabricFitSection } from "@/components/brand/FabricFitSection";
import { FinalCtaSection } from "@/components/brand/FinalCtaSection";
import { PremiumLink } from "@/components/ui/PremiumLink";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { motion } from "framer-motion";

// Dot particles configuration for "Volume One" button animation
const dots = [
  { top: "-10%", left: "5%", delay: "0s", size: "5px" },   // Top-left (V)
  { top: "85%", left: "30%", delay: "0.5s", size: "4px" }, // Bottom-mid (u)
  { top: "-15%", left: "60%", delay: "1.2s", size: "6px" },// Top-mid (e)
  { top: "70%", left: "95%", delay: "0.8s", size: "5px" }, // Bottom-right (e)
  { top: "20%", left: "102%", delay: "1.5s", size: "4px" },// Far right (side)
];

export default function Home() {
  // Select first 4 hoodies for the "Featured" section
  const featuredHoodies = products.filter(p => p.category.toLowerCase() === "hoodies").slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative h-[100dvh] w-full bg-black overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 opacity-80">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6"
          >
            <h1
              className="text-7xl sm:text-8xl md:text-9xl font-thin uppercase tracking-tighter text-white mix-blend-difference"
            >
              ZODAK
            </h1>
            <p className="text-[11px] sm:text-lg md:text-xl font-light uppercase tracking-[0.2em] text-white/90 max-w-2xl mx-auto leading-relaxed px-6 -mt-2">
              Crafted for the cold. Designed for presence.
            </p>

            <div className="flex flex-col items-center sm:flex-row gap-3 justify-center pt-8">
              <Button
                className="bg-white text-black hover:bg-neutral-200 rounded-none h-10 md:h-14 px-4 md:px-8 uppercase tracking-widest text-[10px] sm:text-sm font-black w-48 sm:w-auto group relative overflow-visible"
                onClick={() => {
                  const section = document.getElementById('volume-one');
                  if (section) {
                    const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: "smooth"
                    });
                  }
                }}
              >
                <span className="relative z-10">Volume One</span>
                {/* Black Dot Animation on Hover */}
                {dots.map((dot, i) => (
                  <div
                    key={i}
                    className="absolute bg-black rounded-full star-animation pointer-events-none"
                    style={{
                      top: dot.top,
                      left: dot.left,
                      width: dot.size,
                      height: dot.size,
                      animationDelay: dot.delay
                    }}
                  />
                ))}
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none h-10 md:h-14 px-4 md:px-8 uppercase tracking-widest text-[10px] sm:text-sm font-black w-48 sm:w-auto">
                <Link href="/shop">View Collection</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED / SIGNATURE HOODIES */}
      <section id="signature-series" className="pt-24 pb-12 lg:py-24 bg-white overflow-hidden">
        <div className="container-mobile mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl lg:text-5xl font-light uppercase tracking-tighter leading-tight">
              Signature<br />Series
            </h2>
            <PremiumLink href="/shop" className="hidden sm:block text-sm uppercase tracking-widest text-neutral-500 hover:text-black transition-colors">
              View All
            </PremiumLink>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-8">
            {featuredHoodies.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <PremiumLink href="/shop" className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors border-b border-neutral-100 pb-2">
              Explore All Items
            </PremiumLink>
          </div>
        </div>
      </section>

      {/* 3. PREMIUM HOODIES (CAROUSEL) */}
      <PremiumHoodieSection />

      {/* 4. VOLUME ONE (EDITORIAL) - UNHIDDEN */}
      <VolumeOneSection />

      {/* 5. WHY ZODAK (TRUST) */}
      <WhyZodakSection />

      {/* 6. FABRIC & FIT */}
      <FabricFitSection />

      {/* 7. FINAL CTA */}
      <FinalCtaSection />

    </div>
  );
}
