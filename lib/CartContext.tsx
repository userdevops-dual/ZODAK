"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
    id: string; // Unique ID for this specific cart entry (includes size/color combo)
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
    color: string;
    stockLimit: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, "id" | "quantity">, quantity?: number) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
    taxAmount: number;
    shippingCost: number;
    totalAmount: number;
    toast: { message: string, visible: boolean } | null;
    showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [toast, setToast] = useState<{ message: string, visible: boolean } | null>(null);

    // Pricing Logic Constants
    const TAX_RATE = 0.08; // 8%
    const SHIPPING_THRESHOLD = 200;
    const FLAT_SHIPPING_FEE = 15;

    const showToast = (message: string) => {
        setToast({ message, visible: true });
        setTimeout(() => setToast(null), 3000);
    };

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("zodak_cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart data", error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("zodak_cart", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = (newItem: Omit<CartItem, "id" | "quantity">, quantityToAdd: number = 1) => {
        setItems((currentItems) => {
            // Find if item with same productId, size, and color exists
            const existingItemIndex = currentItems.findIndex(
                (item) =>
                    item.productId === newItem.productId &&
                    item.size === newItem.size &&
                    item.color === newItem.color
            );

            showToast(`Added ${newItem.name} to bag`);

            if (existingItemIndex > -1) {
                const existingItem = currentItems[existingItemIndex];
                // Check stock limit
                const potentialQuantity = existingItem.quantity + quantityToAdd;
                const finalQuantity = Math.min(potentialQuantity, existingItem.stockLimit);

                const updatedItems = [...currentItems];
                updatedItems[existingItemIndex].quantity = finalQuantity;
                return updatedItems;
            } else {
                // Add new item with unique ID (productId + size + color)
                const cartItemId = `${newItem.productId}-${newItem.size}-${newItem.color}`;
                const finalQuantity = Math.min(quantityToAdd, newItem.stockLimit);
                return [...currentItems, { ...newItem, id: cartItemId, quantity: finalQuantity }];
            }
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItems((currentItems) => {
            if (quantity <= 0) {
                return currentItems.filter((item) => item.id !== id);
            }
            return currentItems.map((item) => {
                if (item.id === id) {
                    // Block increase if stock limit reached
                    const newQuantity = Math.min(quantity, item.stockLimit);
                    if (quantity > item.stockLimit) {
                        console.warn("Requested quantity exceeds stock limit");
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const removeFromCart = (id: string) => {
        const itemToRemove = items.find(i => i.id === id);
        if (itemToRemove) showToast(`Removed ${itemToRemove.name}`);
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Dynamic Pricing Calculations
    const taxAmount = subtotal * TAX_RATE;
    const shippingCost = subtotal > 0 && subtotal < SHIPPING_THRESHOLD ? FLAT_SHIPPING_FEE : 0;
    const totalAmount = subtotal + taxAmount + shippingCost;

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                totalItems,
                subtotal,
                taxAmount,
                shippingCost,
                totalAmount,
                toast,
                showToast
            }}
        >
            {children}

            {/* Global Mobile Toast */}
            {toast?.visible && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm bg-black text-white px-6 py-4 rounded-full shadow-2xl flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-center">
                        {toast.message}
                    </span>
                </div>
            )}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
