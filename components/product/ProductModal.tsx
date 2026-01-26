"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Loader2, Check } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/lib/ToastContext";

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Reset states when modal opens/closes
    useEffect(() => {
        if (isOpen && product) {
            setSelectedSize(null);
            setSelectedColor(product.colors[0]);
            setQuantity(1);
            setIsAdded(false);
            setCurrentImageIndex(0);
        }
    }, [isOpen, product]);

    if (!product) return null;

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }

        setIsAdding(true);
        setTimeout(() => {
            addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size: selectedSize,
                color: selectedColor || product.colors[0],
                stockLimit: product.stockLimit
            }, quantity);
            setIsAdding(false);
            setIsAdded(true);

            // Show toast with cart link
            showToast({
                message: `${product.name} added to your cart`,
                type: "success",
                link: {
                    label: "View Cart",
                    href: "/cart"
                },
                action: {
                    label: "Continue Shopping",
                    onClick: onClose
                }
            });
        }, 800);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl max-h-[90vh] bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur shadow-sm rounded-full hover:bg-black hover:text-white transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left: Image Section */}
                        <div className="md:w-1/2 relative bg-neutral-100 h-[40vh] md:h-auto overflow-hidden group">
                            <motion.div
                                className="h-full w-full flex"
                                animate={{ x: `-${currentImageIndex * 100}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                {product.images.map((img, i) => (
                                    <div key={i} className="min-w-full h-full relative">
                                        <Image
                                            src={img}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                ))}
                            </motion.div>

                            {/* Image Nav Arrows */}
                            {product.images.length > 1 && (
                                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => setCurrentImageIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                                        className="p-2 bg-white/90 backdrop-blur shadow-md hover:bg-white"
                                    >
                                        <ArrowRight className="w-4 h-4 rotate-180" />
                                    </button>
                                    <button
                                        onClick={() => setCurrentImageIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                                        className="p-2 bg-white/90 backdrop-blur shadow-md hover:bg-white"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            {/* Image Dots */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-black/10 backdrop-blur rounded-full">
                                {product.images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImageIndex(i)}
                                        className={cn(
                                            "w-1.5 h-1.5 rounded-full transition-all",
                                            currentImageIndex === i ? "bg-white w-4" : "bg-white/40"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right: Info Section */}
                        <div className="md:w-1/2 p-6 md:p-10 flex flex-col h-full overflow-y-auto">
                            <div className="mb-6">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2 block">{product.category}</span>
                                <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-2">{product.name}</h2>
                                <p className="text-xl font-medium">${product.price.toFixed(2)}</p>
                            </div>

                            <div className="mb-8">
                                <p className="text-xs text-neutral-500 leading-relaxed font-light line-clamp-3">
                                    {product.description}
                                </p>
                                <Link
                                    href={`/product/${product.id}`}
                                    className="text-xs underline underline-offset-2 text-black mt-2 inline-block font-medium"
                                >
                                    Full product details
                                </Link>
                            </div>

                            {/* Color Selection */}
                            <div className="mb-6">
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3 font-semibold">Color: {selectedColor}</h3>
                                <div className="flex gap-2.5">
                                    {product.colors.map((color) => {
                                        const bg = color.toLowerCase().includes('black') ? '#000' : color.toLowerCase().includes('grey') ? '#666' : color.toLowerCase().includes('navy') ? '#1a1a40' : color.toLowerCase().includes('white') || color.toLowerCase().includes('cream') || color.toLowerCase().includes('ivory') ? '#f5f5f5' : color.toLowerCase().includes('brown') ? '#8B4513' : color.toLowerCase().includes('red') ? '#991b1b' : color.toLowerCase().includes('blue') ? '#1d4ed8' : color.toLowerCase().includes('sand') ? '#d2b48c' : color.toLowerCase().includes('olive') ? '#3f6212' : '#ddd';
                                        return (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={cn(
                                                    "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                                                    selectedColor === color ? "border-black" : "border-transparent"
                                                )}
                                                style={{ backgroundColor: bg }}
                                                title={color}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Select Size</h3>
                                    <button className="text-[10px] underline text-neutral-400">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={cn(
                                                "min-w-[50px] h-12 px-4 border text-[11px] font-medium transition-all duration-300",
                                                selectedSize === size
                                                    ? "bg-black border-black text-white"
                                                    : "bg-white border-neutral-200 text-neutral-800 hover:border-black"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & Add to Bag - STICKY ON MOBILE */}
                            <div className="mt-auto space-y-4 pt-6 border-t border-neutral-100 bg-white sticky bottom-0 left-0 right-0 py-4 md:static z-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Quantity</h3>
                                    <div className="flex items-center border border-neutral-200">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-10 h-10 flex items-center justify-center text-xs font-medium border-x border-neutral-200">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stockLimit, quantity + 1))}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdding || isAdded}
                                    className={cn(
                                        "w-full h-14 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500",
                                        isAdded
                                            ? "bg-green-600 text-white"
                                            : "bg-black text-white hover:bg-neutral-900"
                                    )}
                                >
                                    {isAdding ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : isAdded ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Product Added
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-4 h-4" />
                                            Add to Bag — ${(product.price * quantity).toFixed(2)}
                                        </>
                                    )}
                                </button>

                                {isAdded && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-2"
                                    >
                                        <Link
                                            href="/cart"
                                            className="flex-1 h-12 flex items-center justify-center text-[10px] uppercase tracking-wider bg-neutral-100 text-black hover:bg-neutral-200 transition-colors"
                                        >
                                            View Cart
                                        </Link>
                                        <button
                                            onClick={onClose}
                                            className="flex-1 h-12 flex items-center justify-center text-[10px] uppercase tracking-wider border border-neutral-200 text-neutral-500 hover:text-black transition-colors"
                                        >
                                            Keep Shopping
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
