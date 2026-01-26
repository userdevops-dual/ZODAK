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
            <div className="min-h-screen bg-white pt-16">
                {/* Product Section */}
                <div className="container mx-auto px-4 py-4">
                    {/* Navigation Buttons - Smaller & Professional */}
                    <div className="flex items-center gap-3 mb-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="text-[9px] uppercase tracking-widest h-7 px-1.5 hover:bg-neutral-100 flex items-center gap-1"
                        >
                            <ChevronLeft className="w-2.5 h-2.5" />
                            Back
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-[9px] uppercase tracking-widest h-7 px-1.5 hover:bg-neutral-100 flex items-center gap-1 border-l border-neutral-100 pl-3 rounded-none"
                        >
                            <Link href="/">
                                <Home className="w-2.5 h-2.5" />
                                Home
                            </Link>
                        </Button>
                    </div>

                    <div className="lg:grid lg:grid-cols-12 lg:gap-10">

                        {/* Image Gallery - Swipe Enabled on Mobile */}
                        <div className="lg:col-span-6 mb-8 lg:mb-0">
                            <div className="relative aspect-[4/5] w-full bg-neutral-100 overflow-hidden">
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
                                                currentImageIndex === i ? "bg-black w-4" : "bg-black/20"
                                            )}
                                        />
                                    ))}
                                </div>

                                {product.images.length > 1 && (
                                    <div className="hidden lg:block">
                                        <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails - Desktop Only */}
                            {product.images.length > 1 && (
                                <div className="hidden lg:grid grid-cols-5 gap-3 mt-4">
                                    {product.images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentImageIndex(i)}
                                            className={cn(
                                                "aspect-[3/4] relative border-2 transition-all",
                                                currentImageIndex === i ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                                            )}
                                        >
                                            <Image src={img} alt="" fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="lg:col-span-6 lg:pl-10 mt-6 lg:mt-0">
                            {/* Title & Price - Compact Shopify Style */}
                            <div className="mb-4 lg:mb-6">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-1">{product.category}</p>
                                <h1 className="text-xl lg:text-3xl font-bold uppercase tracking-tight mb-1 leading-tight">{product.name}</h1>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-lg lg:text-2xl font-black text-neutral-900">${product.price.toFixed(0)}</p>
                                    {product.price > 100 && <span className="text-[8px] text-green-600 font-bold uppercase tracking-widest bg-green-50 px-1.5 py-0.5">Verified Premium</span>}
                                </div>
                            </div>

                            {/* Description - Compact */}
                            <p className="text-[13px] lg:text-sm text-neutral-500 mb-6 leading-relaxed max-w-xl">{product.description}</p>

                            {/* Color - Smaller Circles */}
                            <div className="mb-4">
                                <p className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 mb-2">Color: <span className="text-black">{selectedColor}</span></p>
                                <div className="flex gap-2">
                                    {product.colors.map((color) => {
                                        const bg = color.toLowerCase().includes('black') ? '#000' : color.toLowerCase().includes('grey') || color.toLowerCase().includes('charcoal') ? '#555' : color.toLowerCase().includes('navy') ? '#1a1a40' : color.toLowerCase().includes('white') || color.toLowerCase().includes('ivory') ? '#f5f5f5' : color.toLowerCase().includes('brown') ? '#8B4513' : color.toLowerCase().includes('blue') ? '#4169E1' : '#ddd';
                                        return (
                                            <button key={color} onClick={() => setSelectedColor(color)} className={cn("w-6 h-6 rounded-full border transition-all", selectedColor === color ? "ring-2 ring-black ring-offset-2 scale-110" : "border-neutral-200")} style={{ backgroundColor: bg }} />
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Size - Compact Grid */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Select Size</p>
                                    <button className="text-[9px] underline text-neutral-400 font-bold uppercase">Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {product.sizes.map((size) => (
                                        <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false); }} className={cn("min-w-[40px] h-9 px-2 border text-[10px] font-black transition-all", selectedSize === size ? "border-black bg-black text-white" : "border-neutral-100 hover:border-black text-neutral-600 shadow-sm")}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {sizeError && <p className="text-red-600 text-[9px] font-bold uppercase mt-1 animate-pulse tracking-wide">Please choose a size</p>}
                            </div>

                            {/* Quantity - Minimal */}
                            <div className="mb-6">
                                <p className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 mb-2">Qty</p>
                                <div className="inline-flex items-center border border-neutral-100 bg-neutral-50 rounded-sm">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-white text-neutral-400">
                                        <Minus className="w-2.5 h-2.5" />
                                    </button>
                                    <span className="w-8 h-8 flex items-center justify-center text-[11px] font-bold border-x border-neutral-100 text-black">{quantity}</span>
                                    <button onClick={() => setQuantity(Math.min(product.stockLimit, quantity + 1))} className="w-8 h-8 flex items-center justify-center hover:bg-white text-neutral-400">
                                        <Plus className="w-2.5 h-2.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="hidden lg:flex gap-3 mb-5">
                                <button onClick={handleAddToBag} disabled={isAdding || isAdded} className={cn("flex-1 h-12 text-xs uppercase tracking-wider transition-all", isAdded ? "bg-green-600 text-white" : "bg-black text-white hover:bg-neutral-800")}>
                                    {isAdding ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : isAdded ? <span className="flex items-center justify-center gap-1"><Check className="w-4 h-4" />Added</span> : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
                                </button>
                                <button className="flex-1 h-12 text-xs uppercase tracking-wider border border-black hover:bg-black hover:text-white transition-all">
                                    Buy Now
                                </button>
                            </div>

                            {/* Trust */}
                            <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-wider text-neutral-400 py-4 border-t border-neutral-100">
                                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Free Shipping</span>
                                <span className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5" /> 30-Day Returns</span>
                                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure Payment</span>
                            </div>

                            {/* Accordions */}
                            <div className="border-t border-neutral-100">
                                {[
                                    { id: "specs", title: "Specifications", content: `Category: ${product.category} • For: ${product.gender} • Available in ${product.sizes.length} sizes` },
                                    { id: "care", title: "Care Instructions", content: "Machine wash cold with similar colors. Do not bleach. Tumble dry low. Iron on low if needed." }
                                ].map((item) => (
                                    <div key={item.id} className="border-b border-neutral-100">
                                        <button onClick={() => toggleAccordion(item.id)} className="w-full flex items-center justify-between py-3">
                                            <span className="text-xs uppercase tracking-wider">{item.title}</span>
                                            <ChevronDown className={cn("w-4 h-4 transition-transform", openAccordion === item.id && "rotate-180")} />
                                        </button>
                                        <div className={cn("overflow-hidden transition-all", openAccordion === item.id ? "max-h-32 pb-3" : "max-h-0")}>
                                            <p className="text-xs text-neutral-500 leading-relaxed">{item.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related */}
                <div className="border-t border-neutral-100 py-10 mb-20 lg:mb-0">
                    <div className="container mx-auto px-4">
                        <h2 className="text-sm uppercase tracking-widest mb-6">You May Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky CTA - Forced Priority */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-neutral-100 p-3 safe-area-bottom z-[70] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <div className="flex gap-2">
                    <div className="w-[30%] border border-neutral-100 flex items-center justify-between rounded-sm">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-full h-11 flex items-center justify-center">
                            <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[11px] font-black w-full text-center">{quantity}</span>
                        <button onClick={() => setQuantity(Math.min(product.stockLimit, quantity + 1))} className="w-full h-11 flex items-center justify-center">
                            <Plus className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <button
                        onClick={handleAddToBag}
                        disabled={isAdding || isAdded}
                        className={cn(
                            "flex-1 h-11 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl transition-all duration-300 active:scale-95 rounded-sm",
                            sizeError ? "bg-red-50 text-red-600" :
                                isAdded ? "bg-green-600 text-white" : "bg-black text-white"
                        )}
                    >
                        {isAdding ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> :
                            isAdded ? "Added ✓" :
                                sizeError ? "Choice Required" :
                                    `Add — $${(product.price * quantity).toFixed(0)}`}
                    </button>
                </div>
                {sizeError && <p className="text-red-500 text-[8px] font-black uppercase tracking-widest text-center mt-1.5 animate-bounce">Selection pending...</p>}
            </div>
        </>
    );
}
