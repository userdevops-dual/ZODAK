"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
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

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  // Select first 4 hoodies for the "Featured" section
  const featuredHoodies = products.filter(p => p.category.toLowerCase() === "hoodies").slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative h-[100dvh] w-full bg-black overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 opacity-60">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_24fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter text-white mix-blend-difference">
              ZODAK
            </h1>
            <p className="text-sm sm:text-lg md:text-xl font-light uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto leading-relaxed">
              Crafted for the cold. Designed for presence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button asChild className="bg-white text-black hover:bg-neutral-200 rounded-none h-14 px-8 uppercase tracking-widest font-bold text-xs sm:text-sm">
                <Link href="#volume-one">Volume One</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none h-14 px-8 uppercase tracking-widest font-bold text-xs sm:text-sm">
                <Link href="/shop">View Collection</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED / SIGNATURE HOODIES */}
      <section id="signature-series" className="py-12 lg:py-24 bg-black overflow-hidden">
        <div className="container-mobile mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl lg:text-5xl font-light uppercase tracking-tighter leading-tight">
              Signature<br />Series
            </h2>
            <PremiumLink href="/shop" className="hidden sm:block text-sm uppercase tracking-widest text-neutral-500 hover:text-black transition-colors">
              View All
            </PremiumLink>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-8 max-w-5xl mx-auto">
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
