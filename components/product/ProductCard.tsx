"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Plus } from "lucide-react";
import { Product } from "@/lib/products";

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
    theme?: "light" | "dark";
}

export function ProductCard({ product, onQuickView, theme = "light" }: ProductCardProps) {
    const { id, name, price, images, category } = product;
    const { addToCart } = useCart();

    const isDark = theme === "dark";
    const textColor = isDark ? "text-white" : "text-gray-900";
    const priceColor = isDark ? "text-white" : "text-black";
    const subTextColor = isDark ? "text-white/60" : "text-gray-400";
    const hoverBtnBg = isDark ? "hover:bg-white hover:text-black" : "hover:bg-white hover:text-black";

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            productId: id,
            name,
            price,
            image: images[0] || "/placeholder.jpg",
            size: "M",
            color: "Black",
            stockLimit: 5
        });
    };

    return (
        <div className="group relative block h-full">
            <Link href={`/product/${id}`} className="block h-full cursor-pointer">
                {/* Product Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800 rounded-sm sm:rounded-none">
                    <Image
                        src={images[0] || "/placeholder.jpg"}
                        alt={name}
                        fill
                        sizes="(max-width: 375px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 z-10 pointer-events-none">
                        <span className="bg-black/80 backdrop-blur-sm px-2 py-1 text-[9px] uppercase tracking-wider font-medium text-white">
                            {category}
                        </span>
                    </div>

                    {/* Mobile Quick Add Button */}
                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-2 right-2 z-20 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform md:hidden touch-target"
                        aria-label="Add to cart"
                    >
                        <Plus className="w-5 h-5" />
                    </button>

                    {/* Desktop Hover Add Button */}
                    <button
                        onClick={handleAddToCart}
                        className={`absolute bottom-0 left-0 right-0 z-20 bg-neutral-900/95 backdrop-blur-sm text-white py-3 uppercase tracking-wider text-xs font-bold border-t border-neutral-800 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block ${hoverBtnBg}`}
                    >
                        Add to Cart
                    </button>
                </div>

                {/* Product Info - Mobile Optimized */}
                <div className="py-4 px-2 space-y-1 sm:py-3 sm:px-0">
                    <h3 className="text-sm font-medium leading-tight line-clamp-2 uppercase tracking-wide text-white">
                        {name}
                    </h3>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold tracking-wider text-white">
                            ${Number(price).toFixed(0)}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider hidden sm:inline ${subTextColor}`}>
                            + 2 Colors
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
