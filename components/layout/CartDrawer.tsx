"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
    const { items, totalItems, totalAmount, updateQuantity, removeFromCart } = useCart();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-transparent touch-target">
                    <ShoppingBag className="w-5 h-5 text-inherit" />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col h-full bg-neutral-900 border-l border-neutral-800 text-white">
                <SheetHeader className="p-6 border-b border-neutral-800 flex flex-row items-center justify-between">
                    <SheetTitle className="text-sm uppercase tracking-[0.2em] font-black">
                        Your Bag ({totalItems})
                    </SheetTitle>
                    <SheetClose className="opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </SheetClose>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                            <div className="p-4 bg-neutral-800 rounded-full">
                                <ShoppingBag className="w-8 h-8 text-neutral-400" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest font-bold mb-1">Your bag is empty</p>
                                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Start adding items to see them here</p>
                            </div>
                            <SheetClose asChild>
                                <Button asChild className="rounded-none bg-white text-black px-8 py-6 uppercase tracking-widest text-[10px] font-black mt-4 hover:bg-neutral-200">
                                    <Link href="/shop">Start Shopping</Link>
                                </Button>
                            </SheetClose>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative aspect-[3/4] w-20 bg-neutral-800 overflow-hidden shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-0.5">
                                    <div>
                                        <div className="flex justify-between items-start gap-2">
                                            <h4 className="text-[11px] uppercase tracking-widest font-bold leading-tight line-clamp-2">
                                                {item.name}
                                            </h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-neutral-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <p className="text-[9px] text-neutral-400 uppercase tracking-widest mt-1">
                                            {item.size} / {item.color}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center border border-neutral-700 bg-black shadow-sm overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 hover:bg-neutral-800 touch-target"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-[10px] font-black w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:bg-neutral-800 touch-target"
                                                disabled={item.quantity >= item.stockLimit}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <p className="text-[11px] font-black tracking-tight">
                                            ${(item.price * item.quantity).toFixed(0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 bg-neutral-900 border-t border-neutral-800 safe-area-bottom">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Estimated Total</span>
                            <span className="text-xl font-black">${totalAmount.toFixed(0)}</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <SheetClose asChild>
                                <Button asChild className="w-full h-14 bg-white text-black hover:bg-neutral-200 rounded-none text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
                                    <Link href="/checkout" className="flex items-center justify-center gap-2">
                                        Checkout <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button asChild variant="link" className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                                    <Link href="/cart">View Complete Bag</Link>
                                </Button>
                            </SheetClose>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
