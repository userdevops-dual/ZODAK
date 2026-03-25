"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Product } from "@/lib/products";

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
    theme?: "light" | "dark";
    isExpanding?: boolean;
}

export function ProductCard({ product, theme = "light", isExpanding = false }: ProductCardProps) {
    const { id, name, price, images, category, description } = product;
    const { addToCart } = useCart();
    
    const [isHovered, setIsHovered] = useState(false);
    const [activeImg, setActiveImg] = useState(0);

    const subTextColor = theme === "dark" ? "text-white/60" : "text-gray-400";
    const colorsList = product.colors || ['Black', 'White'];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovered && images.length > 1) {
            interval = setInterval(() => {
                setActiveImg((prev) => (prev + 1) % images.length);
            }, 3000);
        } else {
            setActiveImg(0);
        }
        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({ productId: id, name, price, image: images[0] || "/placeholder.jpg", size: "M", color: colorsList[0], stockLimit: 5 });
    };

    return (
        <div 
            className="group relative block w-full h-full bg-black overflow-hidden isolate"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isExpanding ? (
                // --- EXPANDING MODE: MATHEMATICAL ACCORDION ---
                <div className={`flex h-full transition-[width,transform] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-[250%] lg:group-hover:w-[100%]`}>
                    {/* LEFT SIDE: Image & Title (Main Card) */}
                    <Link href={`/product/${id}`} className="relative flex flex-col h-full shrink-0 group/link bg-neutral-950 border-r border-transparent lg:group-hover:border-neutral-800 transition-colors overflow-hidden w-[40%]">
                        <div className="relative aspect-[3/4] overflow-hidden w-full flex-1">
                            <Image
                                src={images[activeImg] || images[0] || "/placeholder.jpg"}
                                alt={name}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                className="object-cover transition-transform duration-[3000ms] ease-linear lg:group-hover/link:scale-105"
                            />
                            {/* Slideshow Progress Bar */}
                            {images.length > 1 && isHovered && (
                                <div className="absolute bottom-2 left-4 right-4 hidden lg:flex gap-1 z-30">
                                    {images.map((_, i) => (
                                        <div key={i} className="h-[2px] flex-1 bg-white/20 overflow-hidden">
                                            {activeImg === i && (
                                                <div className="h-full bg-white w-full animate-[grow-width_3s_linear]" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Condensed Title Bar */}
                        <div className="py-4 px-3 bg-black z-20 w-full shrink-0">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white mb-2 line-clamp-1">{name}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black tracking-widest text-white">${Number(price).toFixed(0)}</span>
                            </div>
                        </div>
                    </Link>

                    {/* RIGHT SIDE: Dedicated Specifications */}
                    <div className="h-full w-[60%] shrink-0 flex flex-col p-4 sm:p-6 bg-neutral-900 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 delay-[50ms]">
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-base sm:text-lg font-black tracking-widest text-white">${Number(price).toFixed(0)}</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 mb-6 line-clamp-4 leading-relaxed tracking-wide">
                            {description || "Premium minimalist piece tailored for contemporary aesthetics and maximum comfort."}
                        </p>
                        <div className="mb-auto">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-600 font-bold mb-3">Quick Add Size</p>
                            <div className="grid grid-cols-4 gap-2">
                                {['S','M','L','XL'].map(s => (
                                    <button key={s} onClick={handleAddToCart} className="border border-neutral-800 py-1.5 text-[10px] text-white hover:bg-white hover:text-black font-bold transition-colors">{s}</button>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleAddToCart} className="w-full bg-white text-black py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors mt-4">Add to Cart</button>
                    </div>
                </div>
            ) : (
                // --- STANDARD MODE: THE ORIGINAL LOOK ---
                <div className="flex flex-col h-full w-full">
                    <Link href={`/product/${id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 block">
                        <Image
                            src={images[activeImg] || images[0] || "/placeholder.jpg"}
                            alt={name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            className="object-cover transition-transform duration-[3000ms] ease-linear lg:group-hover:scale-105"
                        />
                        {/* Tags */}
                        <div className="absolute top-2 left-2 z-20">
                            <span className="bg-black/90 px-2 py-1 text-[9px] uppercase tracking-widest font-bold text-white shadow-xl">{category}</span>
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 lg:group-hover:opacity-100 transition-opacity z-10" />
                        {/* Quick Add Button */}
                        <div className="absolute bottom-4 left-4 right-4 z-30 opacity-0 translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                            <button 
                                onClick={handleAddToCart}
                                className="w-full bg-white text-black py-3 text-[9px] font-black uppercase tracking-[0.2em] pointer-events-auto hover:bg-black hover:text-white transition-all shadow-2xl"
                            >
                                Quick Add
                            </button>
                        </div>
                    </Link>
                    <div className="py-4 px-1">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white">{name}</h3>
                            <span className="text-[11px] sm:text-xs font-black tracking-widest text-white">${Number(price).toFixed(0)}</span>
                        </div>
                        <p className={`text-[9px] uppercase tracking-widest ${subTextColor}`}>+ {product.colors?.length || 2} Colors</p>
                    </div>
                </div>
            )}
        </div>
    );
}
