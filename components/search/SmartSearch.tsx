"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

interface SearchResult {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
}

export function SmartSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ESC to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeSearch();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    // Real-time search filtering
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setIsLoading(true);

        const timer = setTimeout(() => {
            const searchTerm = query.toLowerCase().trim();

            const filtered = products
                .filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm) ||
                    product.gender.toLowerCase().includes(searchTerm)
                )
                .slice(0, 6)
                .map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    image: product.images[0]
                }));

            setResults(filtered);
            setIsLoading(false);
            setSelectedIndex(-1);
        }, 100);

        return () => clearTimeout(timer);
    }, [query]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            e.preventDefault();
            window.location.href = `/product/${results[selectedIndex].id}`;
        }
    };

    // Highlight matched text - minimal style
    const highlightMatch = (text: string, query: string) => {
        if (!query.trim()) return text;

        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, i) =>
            regex.test(part) ? (
                <span key={i} className="bg-black text-white px-0.5">{part}</span>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    };

    const openSearch = () => {
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 150);
    };

    const closeSearch = () => {
        setIsOpen(false);
        setQuery("");
        setResults([]);
    };

    return (
        <div ref={containerRef} className="relative z-50">
            {/* Search Trigger */}
            <button
                onClick={openSearch}
                className="group p-2.5 hover:bg-black/5 transition-all duration-300 touch-target"
                aria-label="Search"
            >
                <Search className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </button>

            {/* Luxury Minimal Search Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100]">
                    {/* Light Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                        onClick={closeSearch}
                    />

                    {/* Floating Search Container */}
                    <div className="relative flex flex-col items-center pt-[12vh] sm:pt-[18vh] px-4">
                        <div className="w-full max-w-xl">

                            {/* Elegant Search Bar */}
                            <div className="relative">
                                <div className="bg-white shadow-2xl overflow-hidden border-b-2 border-black">
                                    {/* Input Area */}
                                    <div className="flex items-center gap-4 p-5">
                                        <Search className={cn(
                                            "w-5 h-5 shrink-0 transition-opacity duration-300",
                                            isLoading ? "opacity-30" : "opacity-100"
                                        )} />

                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Search..."
                                            className="flex-1 text-lg font-light outline-none bg-transparent text-black placeholder:text-gray-300 tracking-wide"
                                            autoComplete="off"
                                        />

                                        {query && (
                                            <button
                                                onClick={() => setQuery("")}
                                                className="p-1.5 hover:bg-gray-100 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}

                                        <button
                                            onClick={closeSearch}
                                            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-gray-400 hover:text-black transition-colors px-3 py-1.5 border border-gray-200 hover:border-black"
                                        >
                                            <ArrowLeft className="w-3 h-3" />
                                            Back
                                        </button>
                                    </div>

                                    {/* Category Pills - Minimal */}
                                    {!query && (
                                        <div className="px-5 pb-5 flex gap-3">
                                            {["Men", "Women", "Kids"].map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setQuery(cat)}
                                                    className="px-4 py-2 text-xs uppercase tracking-[0.15em] border border-black hover:bg-black hover:text-white transition-all duration-300"
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Results */}
                            {(query && (results.length > 0 || !isLoading)) && (
                                <div className="mt-1 bg-white shadow-2xl border-t border-gray-100">

                                    {results.length > 0 ? (
                                        <>
                                            {/* Results Header */}
                                            <div className="px-5 py-3 border-b border-gray-100">
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                                                    {results.length} Results
                                                </span>
                                            </div>

                                            {/* Product Cards - Minimal */}
                                            <div className="max-h-[45vh] overflow-y-auto">
                                                {results.map((result, index) => (
                                                    <Link
                                                        key={result.id}
                                                        href={`/product/${result.id}`}
                                                        onClick={closeSearch}
                                                        className={cn(
                                                            "group flex items-center gap-5 p-4 border-b border-gray-50 transition-all duration-200",
                                                            "hover:bg-gray-50",
                                                            selectedIndex === index && "bg-gray-50"
                                                        )}
                                                    >
                                                        {/* Product Image */}
                                                        <div className="relative w-16 h-20 bg-gray-100 shrink-0 overflow-hidden">
                                                            <Image
                                                                src={result.image}
                                                                alt={result.name}
                                                                fill
                                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                        </div>

                                                        {/* Product Info */}
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium tracking-wide truncate">
                                                                {highlightMatch(result.name, query)}
                                                            </p>
                                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1">
                                                                {result.category}
                                                            </p>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="text-right shrink-0">
                                                            <p className="text-sm font-bold tracking-wide">
                                                                ${result.price}
                                                            </p>
                                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all ml-auto mt-2" />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>

                                            {/* View All */}
                                            <Link
                                                href={`/shop?search=${encodeURIComponent(query)}`}
                                                onClick={closeSearch}
                                                className="flex items-center justify-center gap-2 p-4 text-[11px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 group"
                                            >
                                                <span>View All Results</span>
                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </>
                                    ) : (
                                        /* No Results */
                                        <div className="py-16 px-6 text-center">
                                            <p className="text-sm tracking-wide mb-1">No products found</p>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Try a different search</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Hint Text */}
                            {!query && (
                                <div className="mt-8 text-center">
                                    <p className="text-white/50 text-xs uppercase tracking-[0.3em]">
                                        Try "Jacket" or "Dress"
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
