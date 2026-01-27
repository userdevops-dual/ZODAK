"use client";

import { useState, useEffect, useCallback } from "react";
import { Product, getProductById } from "./products";

const STORAGE_KEY = "zodak_recently_viewed";
const MAX_ITEMS = 5;

export function useRecentlyViewed() {
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

    const loadFromStorage = useCallback(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const productIds = JSON.parse(stored) as string[];
                const products = productIds
                    .map(id => getProductById(id))
                    .filter((p): p is Product => p !== undefined);
                setRecentlyViewed(products);
            }
        } catch (error) {
            console.error("Failed to load recently viewed:", error);
        }
    }, []);

    // Load from localStorage on mount and listen for updates
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadFromStorage();

        const handleUpdate = () => loadFromStorage();
        window.addEventListener("recentlyViewedUpdated", handleUpdate);

        return () => {
            window.removeEventListener("recentlyViewedUpdated", handleUpdate);
        };
    }, [loadFromStorage]);

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

            // Trigger update event
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
