"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { getProductById, Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";
import { BloodSplatter } from "../ui/BloodSplatter";

export function VolumeOneSection() {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addToHistory } = useRecentlyViewed();

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        addToHistory(product);
    };

    // Select 4 specific products for the grid
    const volumeOneProductIds = ["h1", "h6", "h7", "h10"];
    const displayProducts = volumeOneProductIds
        .map(id => getProductById(id))
        .filter((p): p is any => p !== undefined);

    // Blinking animation variants
    const blinkVariants: Variants = {
        blinking: {
            opacity: [1, 0.5, 1, 0.7, 1],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            }
        },
        static: {
            opacity: 1,
        }
    };

    return (
        <section
            className="relative w-full bg-black min-h-[100dvh]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Blood Effect Background */}
            <BloodSplatter />

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col lg:flex-row pt-20 pb-20 px-4 sm:px-12 lg:px-16 gap-8 lg:gap-16">

                {/* Left Column: Sticky Title (Desktop Only) */}
                <div className="w-full lg:flex-1 relative">
                    <div className="lg:sticky lg:top-0 h-auto lg:h-[100dvh] w-full flex flex-col justify-center overflow-hidden py-10 lg:py-0">
                        {/* Archive Release Label */}
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/60 font-medium mb-4 block">
                            Archive Release
                        </span>

                        {/* Volume One Title */}
                        <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter text-white leading-[0.85]">
                            Volume<br />
                            <motion.span
                                animate={{
                                    opacity: [1, 0.4, 1, 0.2, 1, 0.5, 1],
                                    color: ["#ff0000", "#8b0000", "#ff0000", "#500000", "#ff0000", "#8b0000", "#ff0000"], // Red blinking
                                    textShadow: [
                                        "0 0 20px rgba(255,0,0,0.5)",
                                        "0 0 10px rgba(255,0,0,0.2)",
                                        "0 0 20px rgba(255,0,0,0.5)",
                                        "0 0 5px rgba(255,0,0,0.1)",
                                        "0 0 20px rgba(255,0,0,0.5)",
                                        "0 0 10px rgba(255,0,0,0.2)",
                                        "0 0 20px rgba(255,0,0,0.5)"
                                    ]
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    times: [0, 0.1, 0.2, 0.4, 0.5, 0.8, 1]
                                }}
                                className="inline-block"
                            >
                                One
                            </motion.span>
                        </h2>
                    </div>
                </div>

                {/* Right Column: Product Grid */}
                <div className="w-full lg:flex-1 flex items-start justify-center pt-12 lg:pt-0">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl">
                        {displayProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={blinkVariants}
                                animate={isHovered ? "static" : "blinking"}
                                className="p-3"
                            >
                                <ProductCard
                                    product={product}
                                    theme="dark"
                                    onQuickView={handleQuickView}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
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
