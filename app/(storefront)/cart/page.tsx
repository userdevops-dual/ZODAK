"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Loader2, Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
    const {
        items,
        updateQuantity,
        removeFromCart,
        subtotal,
        taxAmount,
        shippingCost,
        totalAmount,
        totalItems
    } = useCart();

    const [promoCode, setPromoCode] = useState("");
    const [promoLoading, setPromoLoading] = useState(false);
    const [promoError, setPromoError] = useState("");
    const [promoSuccess, setPromoSuccess] = useState("");
    const [discount, setDiscount] = useState(0);

    const applyPromoCode = async () => {
        if (!promoCode.trim()) return;

        setPromoLoading(true);
        setPromoError("");
        setPromoSuccess("");

        try {
            const res = await fetch("/api/promo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: promoCode, subtotal })
            });

            const data = await res.json();

            if (!res.ok) {
                setPromoError(data.error || "Invalid code");
                setDiscount(0);
            } else {
                setPromoSuccess(data.message);
                setDiscount(data.discountAmount);
            }
        } catch {
            setPromoError("Failed to apply code");
        } finally {
            setPromoLoading(false);
        }
    };

    const finalTotal = Math.max(0, (totalAmount || 0) - (discount || 0));

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-4 py-16 text-center bg-black text-white">
                <div className="mb-8 p-6 bg-neutral-900 rounded-full">
                    <ShoppingBag className="w-12 h-12 text-gray-300" />
                </div>
                <h1 className="text-2xl font-bold uppercase tracking-[0.2em] mb-4">Your bag is empty</h1>
                <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
                    Discover our latest collection and find the perfect pieces to complete your wardrobe.
                </p>
                <Button asChild className="rounded-none bg-white text-black px-10 py-7 uppercase tracking-[0.15em] text-xs font-bold hover:bg-neutral-200 transition-all duration-300">
                    <Link href="/shop">Start Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen pt-14 sm:pt-16 lg:pt-24 pb-40 lg:pb-12">
            <div className="container-mobile mx-auto">
                {/* Minimal Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 lg:mb-16 gap-3 sm:gap-4 border-b border-neutral-800 pb-4 sm:pb-6 lg:pb-8">
                    <div>
                        <div className="flex items-center gap-4 mb-3 sm:mb-4">
                            <Link href="/shop" className="group flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 hover:text-white transition-colors inline-flex touch-target">
                                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                                Back to Shopping
                            </Link>
                            <Link href="/" className="group flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 hover:text-white transition-colors inline-flex touch-target border-l border-neutral-800 pl-4">
                                Home
                            </Link>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em]">Shopping Bag</h1>
                    </div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.1em] text-gray-500 font-medium">
                        {totalItems} {totalItems === 1 ? 'Item' : 'Items'} in your bag
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-6 sm:space-y-10 lg:space-y-12">
                        {items.map((item, index) => (
                            <div key={item.id || index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 pb-6 sm:pb-10 lg:pb-12 last:pb-0 border-b border-neutral-800 last:border-0 group">
                                {/* Product Image */}
                                <div className="relative aspect-[3/4] w-full sm:w-40 lg:w-48 bg-neutral-900 overflow-hidden shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Item Details */}
                                <div className="flex flex-1 flex-col justify-between py-1">
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex justify-between items-start gap-3 sm:gap-4">
                                            <div>
                                                <h3 className="text-base sm:text-lg lg:text-xl font-medium uppercase tracking-wide sm:tracking-wider mb-1">
                                                    <Link href={`/product/${item.productId}`} className="hover:underline underline-offset-4 decoration-1 text-white">{item.name}</Link>
                                                </h3>
                                                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 font-semibold mb-2 sm:mb-3">Ref. {item.productId.substring(0, 8)}</p>
                                                <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400">
                                                    <span>Color: <span className="text-white font-medium">{item.color}</span></span>
                                                    <span>Size: <span className="text-white font-medium">{item.size}</span></span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">${item.price.toFixed(2)} / each</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-8 sm:mt-10">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-1 border border-neutral-800 bg-neutral-900 shadow-sm overflow-hidden text-white">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-4 sm:p-3 hover:bg-neutral-800 transition-colors disabled:opacity-20 touch-target flex items-center justify-center"
                                                    disabled={item.quantity <= 0}
                                                >
                                                    <Minus className="w-4 h-4 sm:w-3 sm:h-3" />
                                                </button>
                                                <span className="text-sm sm:text-base font-black w-10 sm:w-8 text-center tabular-nums">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-4 sm:p-3 hover:bg-neutral-800 transition-colors disabled:opacity-20 touch-target flex items-center justify-center"
                                                    disabled={item.quantity >= item.stockLimit}
                                                >
                                                    <Plus className="w-4 h-4 sm:w-3 sm:h-3" />
                                                </button>
                                            </div>
                                            {item.quantity >= item.stockLimit && (
                                                <p className="text-[9px] text-amber-600 font-bold uppercase tracking-wider">Stock limit reached</p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-red-500 transition-colors py-2 px-1"
                                            title="Remove from bag"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary - Sticky Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-20 h-fit">
                        <div className="bg-neutral-900 border border-neutral-800 p-5 space-y-5">
                            <h2 className="text-base font-bold uppercase tracking-[0.2em] border-b border-neutral-800 pb-3 text-white">Summary</h2>

                            <div className="space-y-2 text-xs uppercase tracking-[0.15em] font-medium">
                                <div className="flex justify-between text-neutral-400">
                                    <span>Subtotal</span>
                                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-400">
                                    <span>Shipping</span>
                                    <span className={cn("font-bold text-white", shippingCost === 0 && "text-white")}>
                                        {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-neutral-400">
                                    <span>Sales Tax (8%)</span>
                                    <span className="text-white font-bold">${taxAmount.toFixed(2)}</span>
                                </div>

                                {shippingCost > 0 && (
                                    <div className="bg-black/40 p-3 text-[9px] normal-case tracking-normal font-normal text-neutral-400 leading-relaxed">
                                        <span className="font-bold uppercase tracking-widest text-[8px] block mb-1 text-white">ZODAK Premium Shipping</span>
                                        Add <span className="font-bold text-white">${(200 - subtotal).toFixed(2)}</span> for free shipping.
                                    </div>
                                )}

                                {discount > 0 && (
                                    <div className="flex justify-between text-white">
                                        <span>Discount</span>
                                        <span className="font-bold">-${discount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-neutral-800">
                                    <div className="flex justify-between text-base font-black tracking-[0.1em]">
                                        <span>Total</span>
                                        <span>${finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Promo Code</p>
                                <div className="flex bg-black border border-neutral-800">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                        className="bg-transparent px-3 py-2 text-xs w-full focus:outline-none uppercase tracking-widest text-white placeholder:text-neutral-600"
                                    />
                                    <button
                                        onClick={applyPromoCode}
                                        disabled={promoLoading}
                                        className="px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 text-white transition-colors border-l border-neutral-800 shrink-0 disabled:opacity-50"
                                    >
                                        {promoLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Apply"}
                                    </button>
                                </div>
                                {promoError && (
                                    <p className="text-red-500 text-[10px] flex items-center gap-1">
                                        <X className="w-3 h-3" /> {promoError}
                                    </p>
                                )}
                                {promoSuccess && (
                                    <p className="text-white text-[10px] flex items-center gap-1">
                                        <Check className="w-3 h-3" /> {promoSuccess}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <Button asChild className="w-full bg-white text-black hover:bg-neutral-200 rounded-none py-5 text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <Link href="/checkout">Proceed to Checkout</Link>
                                </Button>

                                <div className="flex flex-col items-center gap-3 pt-1">
                                    <div className="flex justify-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default text-white">
                                        {/* Visa */}
                                        <div className="h-5 w-8 flex items-center justify-center p-0.5" title="Visa">
                                            <svg viewBox="0 0 36 11" fill="currentColor" className="w-full h-full">
                                                <path d="M14.653 0l-2.072 10.603H8.381L11.597 0h3.056zm9.255 10.375c-.714 0-1.258-.22-1.572-.733L19.56 1.834h3.193l.634 3.328c.189 1.05.79 1.488 1.405 1.488.083 0 .157-.005.228-.016L24.588 1.83H28l-2.28 10.435c-.482-.047-1.118-.11-1.89-.11M36 10.603h-2.887c-.896 0-1.613-.538-1.928-1.78l-2.618-9.92h3.582l.53 2.92c.138.748.561 1.096 1.157 1.096.398 0 .805-.183.805-.183L33.953 0H36v10.603m-23.73-10.6L9.623 7.828c-.138.657-.611.85-1.121.85-.062 0-.256-.007-.406-.023L9.62 1.83h3.55L12.27 10.6H8.97S4.168 2.058 4.095 1.76C3.93 1.135 2.14.73 0 .54v-.52h6.634c.82 0 1.517.585 1.706 1.442l.666 3.66L10.59.003h1.68z" />
                                            </svg>
                                        </div>
                                        {/* Mastercard */}
                                        <div className="h-5 w-8 flex items-center justify-center p-0.5" title="Mastercard">
                                            <svg viewBox="0 0 24 18" className="w-full h-full">
                                                <circle cx="9" cy="9" r="9" fill="#EB001B" fillOpacity="0.8" />
                                                <circle cx="15" cy="9" r="9" fill="#F79E1B" fillOpacity="0.8" />
                                            </svg>
                                        </div>
                                        {/* Apple Pay */}
                                        <div className="h-5 w-8 flex items-center justify-center p-0.5" title="Apple Pay">
                                            <svg viewBox="0 0 54 22" fill="currentColor" className="w-full h-full">
                                                <path d="M7.749 7.37c-.035-2.022 1.66-2.992 1.733-3.037-.946-1.378-2.42-1.57-2.94-1.59-1.25-.13-2.443.737-3.078.737-.633 0-1.616-.72-2.66-.7-2.735.02-5.26 1.638-6.666 4.155-1.42 2.535-.37 6.275 1.002 8.324.673 1.003 1.47 2.13 2.52 2.088 1.01-.04 1.39-.675 2.615-.675 1.22 0 1.572.673 2.637.653 1.085-.022 1.77-1.026 2.434-2.046.764-1.17 1.08-2.304 1.09-2.36-.024-.01-2.13-.853-2.15-3.376M5.56 2.083c.563-.715.942-1.71.838-2.705-.812.034-1.796.565-2.376 1.272-.518.625-.972 1.636-.85 2.602.905.074 1.832-.46 2.388-1.168" />
                                                <path d="M19.16 11.23h1.492v-3.79h2.327v-1.19h-5.07v1.19h2.327l.002 3.79h-.002zM27.276 11.232l-1.077-4.982h-1.32l-.994 4.982h1.167l.192-1.127h1.696l.205 1.127h1.13zm-1.847-1.956l.488-2.784.62 2.784h-1.108zM31.295 12.834c.552 0 .963-.12 1.303-.346v-1.16c-.22.18-.553.308-.887.308-.557 0-.756-.37-.756-1.14l.002-3.053h1.583v-1.19h-1.583V4.86h-1.164v1.39h-.84v1.19h.84v3.1c0 1.503.626 2.292 1.502 2.292" />
                                                <path d="M12.915 11.23h1.37V6.25h1.75c1.284 0 2.09.845 2.09 2.06s-.8 2.09-2.074 2.09h-.615v.83h2.64v1.19h-5.16v-1.19zm2.46-3.83h-.326v1.94h.478c.557 0 .86-.33.86-.92 0-.66-.377-1.02-.998-1.02" />
                                                <path d="M43.085 13.91l.836-7.662h-1.2l-.37 5.047-.39-5.047h-1.428l-1.366 7.66h1.135l.89-6.32.1.378.337 4.29h1.12l.334-4.29.1-.378.697 6.322zM48.115 11.23h1.164v-1.28c.356.96 1.092 1.455 1.956 1.455 1.324 0 2.75-1.144 2.75-3.69 0-2.327-1.422-3.62-2.748-3.62-.962 0-1.666.43-1.92 1.16V4.08h-1.202v7.15zm1.53-5.918c0-1.71.79-2.484 1.696-2.484.975 0 1.706.84 1.706 2.512 0 1.673-.757 2.45-1.748 2.45-.965 0-1.655-.83-1.655-2.477" />
                                            </svg>
                                        </div>
                                        {/* PayPal */}
                                        <div className="h-5 w-8 flex items-center justify-center p-0.5" title="PayPal">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#003087]">
                                                <path d="M20.067 8.478c.969-.385 1.25-1.905.655-3.32-.42-1.01-1.306-1.72-2.274-2.07C17.152 2.622 14.86 2.62 14.86 2.62H8.385l-.766 4.88-.363 2.306-.05 2.126-.145.92-.88 5.6h3.407l.488-3.093s.06-.356.402-.387l.21.016 1.636-.01c2.25 0 4.07-.677 5.088-2.675.292-.563.38-1.27.13-1.834h.002c1.232-.016 2.12-.524 2.525-1.928z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-[8px] text-gray-400 uppercase tracking-[0.2em] text-center">
                                        Secure Checkout · Powered by ZODAK Global
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Button - Luxury Style */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-xl border-t border-neutral-800 p-5 safe-area-bottom z-40">
                <div className="flex justify-between items-center px-2 mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">Estimated Total</span>
                    <span className="text-xl font-black tracking-tight">${finalTotal.toFixed(2)}</span>
                </div>
                <Button asChild className="w-full bg-white text-black rounded-none py-8 text-xs font-black uppercase tracking-[0.3em] shadow-2xl active:scale-[0.98] transition-all">
                    <Link href="/checkout">Complete Checkout</Link>
                </Button>
            </div>
        </div>
    );
}
