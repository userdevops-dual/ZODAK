"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { products, Product, getProductById } from "@/lib/products";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";

export function RecentlyViewedSection() {
    const [recentProducts, setRecentProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getRecentlyViewedIds, addToHistory } = useRecentlyViewed();

    // Load recently viewed products
    useEffect(() => {
        const loadRecentlyViewed = () => {
            const ids = getRecentlyViewedIds();
            const loadedProducts = ids
                .map((id) => getProductById(id))
                .filter((p): p is Product => p !== undefined);
            setRecentProducts(loadedProducts);
        };

        loadRecentlyViewed();

        // Listen for updates
        const handleUpdate = () => loadRecentlyViewed();
        window.addEventListener("recentlyViewedUpdated", handleUpdate);
        return () => window.removeEventListener("recentlyViewedUpdated", handleUpdate);
    }, [getRecentlyViewedIds]);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        addToHistory(product);
    };

    if (recentProducts.length === 0) {
        return null;
    }

    return (
        <section className="py-12 bg-neutral-50 border-t border-gray-100">
            <div className="container-mobile px-6 sm:px-12 lg:px-20 mb-8">
                <h3 className="text-xl sm:text-2xl font-light uppercase tracking-widest mb-2">
                    Recently Viewed
                </h3>
                <div className="h-[1px] w-full bg-gray-200"></div>
            </div>

            <div className="container-mobile px-6 sm:px-12 lg:px-20">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {recentProducts.map((product) => (
                        <div key={product.id}>
                            <ProductCard
                                product={product}
                                onQuickView={handleQuickView}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
