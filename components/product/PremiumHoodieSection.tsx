"use client";

import { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { products, Product } from "@/lib/products";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";

export function PremiumHoodieSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { recentlyViewed, addToHistory } = useRecentlyViewed();

  // Filter for hoodies only
  const hoodieProducts = products.filter(p => p.category.toLowerCase() === "hoodies");

  // Show recently viewed or all hoodies based on toggle
  const displayProducts = showRecent ? recentlyViewed : hoodieProducts;
  const totalProducts = displayProducts.length;

  // Auto-play carousel every 2 seconds
  useEffect(() => {
    if (isPaused || totalProducts === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalProducts);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, totalProducts]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalProducts);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalProducts) % totalProducts);
  };

  const handleToggleRecent = () => {
    setShowRecent(!showRecent);
    setCurrentIndex(0);
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    addToHistory(product);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      handlePrev();
    } else if (info.offset.x < -threshold) {
      handleNext();
    }
  };

  // Get visible products: show prev, current (center), and next
  const getVisibleProducts = () => {
    if (totalProducts === 0) return [];

    const prevIndex = (currentIndex - 1 + totalProducts) % totalProducts;
    const nextIndex = (currentIndex + 1) % totalProducts;

    return [
      { product: displayProducts[prevIndex], position: 'prev' },
      { product: displayProducts[currentIndex], position: 'center' },
      { product: displayProducts[nextIndex], position: 'next' },
    ];
  };

  return (
    <section
      className="group/slider relative min-h-[600px] lg:h-[100dvh] w-full bg-white flex flex-col justify-center overflow-hidden border-t border-neutral-50 py-10 sm:py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Background Text Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <h2 className="text-[10vw] leading-none font-bold text-gray-100 uppercase tracking-tighter opacity-5">
          Premium
        </h2>
      </div>

      <div className="relative z-10 w-full">
        <div className="container-mobile mx-auto px-4 sm:px-12 lg:px-20 mb-8 sm:mb-12 text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 block mb-2 font-bold">
              Premium Drops
            </span>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter text-black leading-none max-w-[200px] sm:max-w-none">
              {showRecent ? "Recently Viewed" : "Exclusive Hoodies"}
            </h3>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
              {totalProducts > 0 ? `${currentIndex + 1} / ${totalProducts}` : "0 / 0"}
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Navigation Arrows - Desktop Only */}
          <button
            onClick={handlePrev}
            disabled={totalProducts === 0}
            className="absolute left-4 lg:left-8 top-[40%] -translate-y-1/2 z-30 w-12 h-12 hidden md:flex items-center justify-center bg-black text-white rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-500 shadow-2xl disabled:hidden hover:scale-110 active:scale-90"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            disabled={totalProducts === 0}
            className="absolute right-4 lg:right-8 top-[40%] -translate-y-1/2 z-30 w-12 h-12 hidden md:flex items-center justify-center bg-black text-white rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-500 shadow-2xl disabled:hidden hover:scale-110 active:scale-90"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Recently Viewed Toggle Button */}
          <button
            onClick={handleToggleRecent}
            className="absolute right-4 lg:right-8 top-[55%] z-30 px-5 py-3 md:px-4 md:py-2 flex items-center gap-2 bg-black text-white text-[10px] sm:text-xs uppercase tracking-[0.15em] rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
            aria-label="Toggle Recently Viewed"
          >
            <Clock className="w-3 h-3" />
            <span>{showRecent ? "All" : "Recent"}</span>
          </button>

          {/* Carousel Track */}
          <motion.div
            className="overflow-hidden py-4 px-4 sm:px-8"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-3 sm:gap-4 justify-center items-center">
              {totalProducts === 0 ? (
                <div className="text-center py-20">
                  <p className="text-neutral-400 text-sm">
                    {showRecent ? "No recently viewed products" : "No products available"}
                  </p>
                </div>
              ) : (
                getVisibleProducts().map(({ product, position }, idx) => (
                  <motion.div
                    key={`${product.id}-${currentIndex}-${position}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: position === 'center' ? 1 : 0.9,
                      scale: position === 'center' ? 1.1 : 0.92,
                      x: position === 'prev' ? -15 : position === 'next' ? 15 : 0
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`w-[180px] sm:w-[220px] md:w-[260px] flex-shrink-0 ${position === 'center' ? 'z-10' : 'z-0'
                      }`}
                    whileHover={position === 'center' ? { scale: 1.12 } : {}}
                  >
                    <ProductCard
                      product={product}
                      onQuickView={position === 'center' ? handleQuickView : undefined}
                    />
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Dots Indicator - Below */}
          <div className="flex gap-2 justify-center mt-4">
            {displayProducts.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? "bg-black" : "bg-gray-300"
                  }`}
                animate={{
                  width: idx === currentIndex ? 32 : 6,
                  scale: idx === currentIndex ? 1 : 0.9
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Touch Interaction Hint (Mobile) */}
      <div className="absolute bottom-6 left-0 w-full text-center sm:hidden z-10">
        <span className="text-[8px] uppercase tracking-[0.3em] text-neutral-400 animate-pulse">
          Swipe to Explore
        </span>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
