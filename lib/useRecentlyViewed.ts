"use client";

import { useState, useEffect } from "react";
import { Product } from "./products";

const STORAGE_KEY = "zodak_recently_viewed";
const MAX_ITEMS = 5;

export function useRecentlyViewed() {
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const productIds = JSON.parse(stored) as string[];
                // We'll need to fetch the full product data
                // For now, just store the IDs
                setRecentlyViewed(productIds as any);
            }
        } catch (error) {
            console.error("Failed to load recently viewed:", error);
        }
    }, []);

    const addToHistory = (product: Product) => {
        try {
            // Get current IDs
            const stored = localStorage.getItem(STORAGE_KEY);
            let ids: string[] = stored ? JSON.parse(stored) : [];

            // Remove if already exists (to move to front)
            ids = ids.filter((id) => id !== product.id);

            // Add to front
            ids.unshift(product.id);

            // Keep only MAX_ITEMS
            ids = ids.slice(0, MAX_ITEMS);

            // Save back to localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));

            // Update state (we'll need to convert IDs back to products)
            // For now, trigger a re-fetch
            const event = new CustomEvent("recentlyViewedUpdated");
            window.dispatchEvent(event);
        } catch (error) {
            console.error("Failed to add to history:", error);
        }
    };

    const getRecentlyViewedIds = (): string[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Failed to get recently viewed IDs:", error);
            return [];
        }
    };

    return {
        recentlyViewed,
        addToHistory,
        getRecentlyViewedIds,
    };
}
