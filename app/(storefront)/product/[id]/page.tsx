"use client";

import { useState, use } from "react";
import Image from "next/image";
import { products, getProductById } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import { notFound } from "next/navigation";
import { Check, Loader2, ChevronDown, ChevronLeft, ChevronRight, Truck, RotateCcw, Shield, Minus, Plus, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const product = getProductById(resolvedParams.id);
    const { addToCart } = useCart();

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || "");
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const router = useRouter();

    if (!product) notFound();

    const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

    const handleAddToBag = () => {
        if (!selectedSize) { setSizeError(true); return; }
        setIsAdding(true);
        setSizeError(false);
        setTimeout(() => {
            addToCart({ productId: product.id, name: product.name, price: product.price, image: product.images[0], size: selectedSize, color: selectedColor, stockLimit: product.stockLimit });
            setIsAdding(false);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }, 400);
    };

    const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? null : id);

    return (
        <>
            <div className="min-h-screen bg-black pt-16 text-white">
                {/* Product Section */}
                <div className="container mx-auto px-4 py-6">
                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4 mb-6">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="text-[10px] uppercase tracking-widest h-8 px-2 hover:bg-neutral-900 text-white flex items-center gap-1"
                        >
                            <ChevronLeft className="w-3 h-3" />
                            Back to collection
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-[10px] uppercase tracking-widest h-8 px-2 hover:bg-neutral-900 text-white flex items-center gap-1"
                        >
                            <Link href="/">
                                <Home className="w-3 h-3" />
                                Home
                            </Link>
                        </Button>
                    </div>

                    <div className="lg:grid lg:grid-cols-12 lg:gap-10">

                        {/* Image Gallery - Swipe Enabled on Mobile */}
                        <div className="lg:col-span-6 mb-8 lg:mb-0 h-full">
                            <div className="relative aspect-[3/4] w-full bg-neutral-900 overflow-hidden rounded-sm">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentImageIndex}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full h-full"
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={(_, info) => {
                                            if (info.offset.x < -50) {
                                                setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
                                            } else if (info.offset.x > 50) {
                                                setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
                                            }
                                        }}
                                    >
                                        <Image
                                            src={product.images[currentImageIndex]}
                                            alt={product.name}
                                            fill
                                            priority
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Pagination Dots for Mobile */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
                                    {product.images.map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "w-1.5 h-1.5 rounded-full transition-all",
                                                currentImageIndex === i ? "bg-white w-4" : "bg-white/20"
                                            )}
                                        />
                                    ))}
                                </div>

                                {product.images.length > 1 && (
                                    <div className="hidden lg:block">
                                        <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md text-white shadow-xl flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md text-white shadow-xl flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails - Desktop Only */}
                            {product.images.length > 1 && (
                                <div className="hidden lg:flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                                    {product.images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentImageIndex(i)}
                                            className={cn(
                                                "w-20 h-24 relative border transition-all shrink-0",
                                                currentImageIndex === i ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-100"
                                            )}
                                        >
                                            <Image src={img} alt="" fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="lg:col-span-6 lg:pl-10">
                            {/* Title & Price - Optimized for Fold */}
                            <div className="mb-6 lg:mb-8">
                                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-2">{product.category}</p>
                                <h1 className="text-2xl lg:text-4xl font-bold uppercase tracking-tight mb-2 leading-none">{product.name}</h1>
                                <div className="flex items-baseline gap-3">
                                    <p className="text-xl lg:text-2xl font-black">${product.price.toFixed(2)}</p>
                                    {product.price > 100 && <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest bg-green-50 px-2 py-1">Premium Quality</span>}
                                </div>
                            </div>

                            {/* Description - Compact on mobile */}
                            <p className="text-sm lg:text-base text-neutral-400 mb-8 leading-relaxed max-w-xl">{product.description}</p>

                            {/* Color */}
                            <div className="mb-4">
                                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Color: <span className="text-neutral-700">{selectedColor}</span></p>
                                <div className="flex gap-2">
                                    {product.colors.map((color) => {
                                        const bg = color.toLowerCase().includes('black') ? '#000' : color.toLowerCase().includes('grey') || color.toLowerCase().includes('charcoal') ? '#555' : color.toLowerCase().includes('navy') ? '#1a1a40' : color.toLowerCase().includes('white') || color.toLowerCase().includes('ivory') ? '#f5f5f5' : color.toLowerCase().includes('brown') ? '#8B4513' : color.toLowerCase().includes('blue') ? '#4169E1' : '#ddd';
                                        return (
                                            <button key={color} onClick={() => setSelectedColor(color)} className={cn("w-8 h-8 rounded-full border-2 transition-all", selectedColor === color ? "border-white scale-110" : "border-transparent")} style={{ backgroundColor: bg }} />
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Size */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">Select Size</p>
                                    <button className="text-[10px] underline text-neutral-400">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false); }} className={cn("min-w-[44px] h-10 px-3 border text-xs transition-all", selectedSize === size ? "border-white bg-white text-black" : "border-neutral-800 text-neutral-400 hover:border-white hover:text-white")}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {sizeError && <p className="text-red-500 text-xs mt-1">Please select a size</p>}
                            </div>

                            {/* Quantity */}
                            <div className="mb-5">
                                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Quantity</p>
                                <div className="inline-flex items-center border border-neutral-800">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-neutral-900 text-white">
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-10 h-9 flex items-center justify-center text-sm border-x border-neutral-800 text-white">{quantity}</span>
                                    <button onClick={() => setQuantity(Math.min(product.stockLimit, quantity + 1))} className="w-9 h-9 flex items-center justify-center hover:bg-neutral-900 text-white">
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="hidden lg:flex gap-3 mb-5">
                                <button onClick={handleAddToBag} disabled={isAdding || isAdded} className={cn("flex-1 h-12 text-xs uppercase tracking-wider transition-all font-bold", isAdded ? "bg-green-600 text-white" : "bg-white text-black hover:bg-neutral-200")}>
                                    {isAdding ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : isAdded ? <span className="flex items-center justify-center gap-1"><Check className="w-4 h-4" />Added</span> : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
                                </button>
                                <button className="flex-1 h-12 text-xs uppercase tracking-wider border border-white text-white hover:bg-white hover:text-black transition-all font-bold">
                                    Buy Now
                                </button>
                            </div>

                            {/* Trust */}
                            <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-wider text-neutral-400 py-4 border-t border-neutral-800">
                                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Free Shipping</span>
                                <span className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5" /> 30-Day Returns</span>
                                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure Payment</span>
                            </div>

                            {/* Accordions */}
                            <div className="border-t border-neutral-800">
                                {[
                                    { id: "specs", title: "Specifications", content: `Category: ${product.category} • For: ${product.gender} • Available in ${product.sizes.length} sizes` },
                                    { id: "care", title: "Care Instructions", content: "Machine wash cold with similar colors. Do not bleach. Tumble dry low. Iron on low if needed." }
                                ].map((item) => (
                                    <div key={item.id} className="border-b border-neutral-800">
                                        <button onClick={() => toggleAccordion(item.id)} className="w-full flex items-center justify-between py-3">
                                            <span className="text-xs uppercase tracking-wider">{item.title}</span>
                                            <ChevronDown className={cn("w-4 h-4 transition-transform", openAccordion === item.id && "rotate-180")} />
                                        </button>
                                        <div className={cn("overflow-hidden transition-all", openAccordion === item.id ? "max-h-32 pb-3" : "max-h-0")}>
                                            <p className="text-xs text-neutral-400 leading-relaxed">{item.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related */}
                <div className="border-t border-neutral-800 py-24 mb-20 lg:mb-0 mt-10 lg:mt-24">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-widest mb-12">You May Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-900/90 backdrop-blur-xl border-t border-neutral-800 p-4 safe-area-bottom z-50">
                <div className="flex gap-3">
                    <div className="w-1/3 border border-neutral-800 flex items-center justify-between text-white">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-full h-12 flex items-center justify-center">
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold w-full text-center">{quantity}</span>
                        <button onClick={() => setQuantity(Math.min(product.stockLimit, quantity + 1))} className="w-full h-12 flex items-center justify-center">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <button
                        onClick={handleAddToBag}
                        disabled={isAdding || isAdded}
                        className={cn(
                            "flex-1 h-12 text-xs font-black uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 active:scale-95",
                            sizeError ? "bg-red-900/50 text-red-200 border border-red-800" :
                                isAdded ? "bg-green-600 text-white" : "bg-white text-black"
                        )}
                    >
                        {isAdding ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> :
                            isAdded ? "Added to Bag ✓" :
                                sizeError ? "Select Size First" :
                                    `Add — $${(product.price * quantity).toFixed(0)}`}
                    </button>
                </div>
                {sizeError && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest text-center mt-2 animate-bounce">Please choose a size</p>}
            </div>
        </>
    );
}
