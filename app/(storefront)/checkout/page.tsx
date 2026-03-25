"use client";

import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowLeft, Check, Lock, ShieldCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";

export default function CheckoutPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // Form State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const { items, subtotal, taxAmount, shippingCost, totalAmount, clearCart, removeFromCart, totalItems } = useCart();

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Create order in database
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    total: totalAmount,
                    shippingDetails: {
                        firstName,
                        lastName,
                        email,
                        address,
                        city,
                        postalCode
                    }
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText);
            }

            setIsProcessing(false);
            setIsSuccess(true);
            
            // Scroll to top instantly so they see the confirmation and confetti
            window.scrollTo({ top: 0, behavior: "smooth" });
            
            // --- 8K ULTRA-QUALITY LUXURY CONFETTI ---
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 9999, scalar: 1.2, colors: ['#FFFF00', '#FF0000', '#0000FF', '#FF69B4'] };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 60 * (timeLeft / duration);
                
                // Wide burst
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    gravity: 0.8,
                    drift: randomInRange(-0.5, 0.5)
                }));
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    gravity: 0.8,
                    drift: randomInRange(-0.5, 0.5)
                }));
            }, 250);

            // Immediate Big Center Burst
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#FFFF00', '#FF0000', '#0000FF', '#FF69B4'],
                scalar: 1.5,
                zIndex: 10000,
                gravity: 0.7,
                startVelocity: 60
            });

            // Note: Auto-redirect removed per user request. User will manually navigate via button.
            clearCart();
        } catch (error) {
            console.error("Checkout error:", error);
            setIsProcessing(false);
            alert("There was an error processing your order. Please try again.");
        }
    };

    if (items.length === 0 && !isSuccess) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Your Bag is Empty</h1>
                <p className="text-gray-500 mb-8">You haven&apos;t added any items to your bag yet.</p>
                <Button asChild className="rounded-none bg-white text-black px-8 py-6 uppercase tracking-widest text-sm font-bold hover:bg-neutral-200">
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
                <div className="relative mb-10 w-24 h-24 flex items-center justify-center bg-[#22C55E] rounded-full shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-in zoom-in duration-500">
                    <Check className="w-12 h-12 text-white" strokeWidth={4} />
                </div>
                <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-[0.3em] mb-6">Order Confirmed</h1>
                <p className="text-neutral-400 mb-12 max-w-lg mx-auto text-sm lg:text-base leading-relaxed tracking-wide uppercase">
                    Thank you for your purchase. We&apos;ve sent a detailed confirmation email to your registry. Your order will be shipped shortly.
                </p>
                <div className="flex flex-col items-center gap-4">
                    <Button asChild className="rounded-none bg-white text-black px-10 py-7 uppercase tracking-[0.2em] text-xs font-black hover:bg-neutral-200 transition-all">
                        <Link href="/">Back to Home Page</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen pb-32 lg:pb-0">
            {/* Minimal Checkout Header */}
            <div className="border-b border-neutral-800 py-4 sm:py-6 lg:py-8 safe-area-top">
                <div className="container-mobile mx-auto flex justify-between items-center">
                    <Link href="/cart" className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-gray-400 hover:text-black transition-colors touch-target">
                        <ArrowLeft className="w-3 h-3" />
                        <span className="hidden sm:inline">Back to Bag</span>
                        <span className="sm:hidden">Bag</span>
                    </Link>
                    <Link href="/" className="text-lg sm:text-xl lg:text-2xl font-bold tracking-[0.2em] sm:tracking-[0.3em]">ZODAK</Link>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                        <Lock className="w-3 h-3" />
                        <span className="hidden sm:inline">Secure Checkout</span>
                        <span className="sm:hidden">Secure</span>
                    </div>
                </div>
            </div>

            <div className="container-mobile mx-auto py-6 sm:py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 max-w-7xl mx-auto">

                    {/* Left: Shipping & Payment Form */}
                    <div className="lg:col-span-7 space-y-8 sm:space-y-10 lg:space-y-12">
                        <form onSubmit={handleCheckout} className="space-y-8 sm:space-y-10 lg:space-y-12">
                            {/* Shipping Information */}
                            <div className="space-y-6 sm:space-y-8">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black text-[10px] sm:text-xs font-bold">1</span>
                                    <h2 className="text-base sm:text-lg lg:text-xl font-bold uppercase tracking-wider sm:tracking-widest">Shipping Address</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                                    <div className="space-y-2 sm:space-y-3">
                                        <Label className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-gray-400">First Name</Label>
                                        <Input required value={firstName} onChange={e => setFirstName(e.target.value)} className="rounded-none border-neutral-800 bg-neutral-900 focus:border-white h-12 sm:h-13 lg:h-14 touch-target text-white" />
                                    </div>
                                    <div className="space-y-2 sm:space-y-3">
                                        <Label className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">Last Name</Label>
                                        <Input required value={lastName} onChange={e => setLastName(e.target.value)} className="rounded-none border-neutral-800 bg-neutral-900 focus:border-white h-12 sm:h-13 lg:h-14 touch-target text-white" />
                                    </div>
                                    <div className="sm:col-span-2 space-y-2 sm:space-y-3">
                                        <Label className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">Email Address</Label>
                                        <Input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="rounded-none border-neutral-800 bg-neutral-900 focus:border-white h-12 sm:h-13 lg:h-14 touch-target text-white" />
                                    </div>
                                    <div className="sm:col-span-2 space-y-2 sm:space-y-3">
                                        <Label className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">Street Address</Label>
                                        <Input required value={address} onChange={e => setAddress(e.target.value)} className="rounded-none border-neutral-800 bg-neutral-900 focus:border-white h-12 sm:h-13 lg:h-14 touch-target text-white" />
                                    </div>
                                    <div className="space-y-2 sm:space-y-3">
                                        <Label className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">City / District</Label>
                                        <Input required value={city} onChange={e => setCity(e.target.value)} className="rounded-none border-neutral-800 bg-neutral-900 focus:border-white h-12 sm:h-13 lg:h-14 touch-target text-white" />
                                    </div>
                                    <div className="space-y-2 sm:space-y-3">
                                        <Label className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">Postal Code</Label>
                                        <Input required value={postalCode} onChange={e => setPostalCode(e.target.value)} className="rounded-none border-neutral-800 bg-neutral-900 focus:border-white h-12 sm:h-13 lg:h-14 touch-target text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Selection */}
                            <div className="space-y-8 pt-8 border-t border-neutral-800">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-xs font-bold">2</span>
                                    <h2 className="text-xl font-bold uppercase tracking-widest">Payment Method</h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-neutral-900 p-8 border border-neutral-800 space-y-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] uppercase tracking-widest font-bold">Credit / Debit Card</span>
                                            <div className="flex gap-2">
                                                <div className="h-4 w-7 bg-gray-300 rounded-[2px]"></div>
                                                <div className="h-4 w-7 bg-gray-300 rounded-[2px]"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] uppercase tracking-widest font-bold">Card Number</Label>
                                                <Input className="rounded-none border-neutral-700 bg-black focus:border-white h-12 text-white placeholder:text-neutral-600" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <Label className="text-[10px] uppercase tracking-widest font-bold">Expiry Date</Label>
                                                    <Input className="rounded-none border-neutral-700 bg-black focus:border-white h-12 text-white placeholder:text-neutral-600" />
                                                </div>
                                                <div className="space-y-3">
                                                    <Label className="text-[10px] uppercase tracking-widest font-bold">CVV</Label>
                                                    <Input className="rounded-none border-neutral-700 bg-black focus:border-white h-12 text-white placeholder:text-neutral-600" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <Button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full bg-white text-black hover:bg-neutral-200 rounded-none h-16 text-sm font-black uppercase tracking-[0.2em] shadow-xl transition-all"
                                >
                                    {isProcessing ? "Processing Security Protocol..." : `Complete Purchase · $${totalAmount.toFixed(2)}`}
                                </Button>
                                <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 font-medium">
                                    <ShieldCheck className="w-4 h-4" />
                                    <p className="text-[10px] uppercase tracking-widest">AES-256 Bit Encrypted Transaction</p>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right: Order Summary Sidebar */}
                    <div className="lg:col-span-5">
                        <div className="bg-neutral-900 p-10 space-y-10 sticky top-32 border border-neutral-800">
                            <h2 className="text-lg font-bold uppercase tracking-[0.15em] border-b border-neutral-800 pb-6">Your Order ({totalItems})</h2>

                            <div className="space-y-8 max-h-[40vh] overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-neutral-700">
                                {items.map((item, index) => (
                                    <div key={item.id || index} className="flex gap-4 group relative">
                                        <div className="relative aspect-[3/4] h-24 bg-neutral-800 overflow-hidden shrink-0 border border-neutral-800">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-between py-1 flex-1">
                                            <div>
                                                <h4 className="text-xs font-bold uppercase tracking-wider">{item.name}</h4>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Size: {item.size || "M"} · Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-xs font-bold tracking-widest">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            title="Remove item"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-neutral-800 text-xs uppercase tracking-widest">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Shipping</span>
                                    <span className="text-white font-bold">{shippingCost === 0 ? "Complimentary" : `$${shippingCost.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Sales Tax (8%)</span>
                                    <span className="text-white font-bold">${taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="pt-6 flex justify-between text-lg font-black tracking-widest border-t border-neutral-800">
                                    <span>Total Amount</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-black p-6 border border-neutral-800 space-y-4">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-white" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Global Fashion Standards</p>
                                </div>
                                <p className="text-[9px] text-gray-400 leading-relaxed uppercase tracking-widest">
                                    All personal data and payment details are encrypted. By placing an order, you agree to our terms & conditions.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
