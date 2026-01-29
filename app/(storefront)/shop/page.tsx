"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Filter, ChevronDown, X, Check, SlidersHorizontal, ChevronLeft, Home } from "lucide-react";
import { products } from "@/lib/products";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SortOption = "relevant" | "newest" | "price-low" | "price-high" | "name-az" | "name-za";

const sortOptions: { value: SortOption; label: string }[] = [
    { value: "relevant", label: "Most Relevant" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-az", label: "Alphabetical (A–Z)" },
    { value: "name-za", label: "Alphabetical (Z–A)" },
];

const categories = [
    { id: "oversized", label: "Oversized" },
    { id: "zip-up", label: "Zip-Up" },
    { id: "pullover", label: "Pullover" },
    { id: "cropped", label: "Cropped" },
    { id: "heavyweight", label: "Heavyweight" },
];

export default function ShopPage() {
    const [sortBy, setSortBy] = useState<SortOption>("relevant");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const router = useRouter();

    // Toggle category selection
    const toggleCategory = (categoryId: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(c => c !== categoryId)
                : [...prev, categoryId]
        );
    };

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        // Since store is now ONLY hoodies, we filter by category='hoodies' by default
        const result = products.filter(p =>
            p.category.toLowerCase().includes('hood') ||
            p.name.toLowerCase().includes('hood')
        );

        // Sub-category filter (if any logic exists for it in data, otherwise just show all)
        if (selectedCategories.length > 0) {
            // (Mocking sub-category filter since our current data is basic)
            // result = result.filter(p => selectedCategories.includes(p.subCategory.toLowerCase()));
        }

        // Sort
        switch (sortBy) {
            case "newest":
                result.reverse();
                break;
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "name-az":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-za":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        return result;
    }, [sortBy, selectedCategories]);

    const clearFilters = () => {
        setSelectedCategories([]);
    };

    const hasActiveFilters = selectedCategories.length > 0;
    const activeFilterCount = selectedCategories.length;

    return (
        <div className="pt-16 sm:pt-20 lg:pt-24 min-h-screen bg-black text-white">
            {/* Header Bar */}
            <div className="sticky top-14 sm:top-16 lg:top-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4 pt-4 -mb-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="text-[10px] uppercase tracking-widest h-8 px-2 text-neutral-400 hover:text-white hover:bg-neutral-900 flex items-center gap-1"
                        >
                            <ChevronLeft className="w-3 h-3" />
                            Back
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-[10px] uppercase tracking-widest h-8 px-2 text-neutral-400 hover:text-white hover:bg-neutral-900 flex items-center gap-1"
                        >
                            <Link href="/">
                                <Home className="w-3 h-3" />
                                Home
                            </Link>
                        </Button>
                    </div>

                    <div className="flex items-center justify-between h-14">
                        {/* Left: Title & Count */}
                        <div className="flex items-center gap-4">
                            <h1 className="text-sm sm:text-base font-bold uppercase tracking-[0.15em]">
                                Hoods
                            </h1>
                            <span className="text-xs text-neutral-400">
                                {filteredProducts.length} items
                            </span>
                        </div>

                        {/* Right: Filter & Sort */}
                        <div className="flex items-center gap-2">
                            {/* Filter Button */}
                            <button
                                onClick={() => setShowFilterPanel(true)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider",
                                    "border border-neutral-800 hover:border-white transition-colors text-neutral-300",
                                    hasActiveFilters && "border-white bg-white text-black"
                                )}
                            >
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Filter</span>
                                {activeFilterCount > 0 && (
                                    <span className="ml-1 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>

                            {/* Sort Button */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                                    className="flex items-center gap-2 px-4 py-2 text-xs uppercase text-neutral-300 tracking-wider border border-neutral-800 hover:border-white transition-colors"
                                >
                                    <span className="hidden sm:inline">Sort</span>
                                    <ChevronDown className={cn(
                                        "w-3.5 h-3.5 transition-transform",
                                        showSortDropdown && "rotate-180"
                                    )} />
                                </button>

                                {showSortDropdown && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowSortDropdown(false)} />
                                        <div className="absolute right-0 top-full mt-1 w-56 bg-black border border-neutral-800 shadow-xl z-50">
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => {
                                                        setSortBy(option.value);
                                                        setShowSortDropdown(false);
                                                    }}
                                                    className={cn(
                                                        "flex items-center justify-between w-full px-4 py-3 text-sm text-left text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors",
                                                        sortBy === option.value && "bg-neutral-900 text-white font-medium"
                                                    )}
                                                >
                                                    {option.label}
                                                    {sortBy === option.value && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-neutral-900 rounded-full flex items-center justify-center">
                            <Filter className="w-6 h-6 text-neutral-600" />
                        </div>
                        <p className="text-neutral-500 mb-2">No hoods found</p>
                        <button onClick={clearFilters} className="text-sm text-white underline">
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            {/* Filter Panel */}
            {showFilterPanel && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowFilterPanel(false)} />
                    <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-black border-l border-neutral-800 shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                            <h2 className="text-lg font-bold uppercase tracking-widest">Filters</h2>
                            <button onClick={() => setShowFilterPanel(false)} className="p-2">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4">Style</h3>
                                <div className="space-y-1">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => toggleCategory(category.id)}
                                            className={cn(
                                                "flex items-center justify-between w-full px-4 py-3 text-sm text-neutral-400 transition-colors",
                                                selectedCategories.includes(category.id) ? "bg-neutral-900 text-white font-medium" : "hover:bg-neutral-900 hover:text-white"
                                            )}
                                        >
                                            <span>{category.label}</span>
                                            <div className={cn("w-5 h-5 border flex items-center justify-center transition-colors", selectedCategories.includes(category.id) ? "bg-white border-white text-black" : "border-neutral-700")}>
                                                {selectedCategories.includes(category.id) && <Check className="w-3 h-3" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-neutral-800 flex gap-3">
                            <button onClick={clearFilters} className="flex-1 py-3 text-xs uppercase tracking-widest font-medium border border-neutral-700 text-neutral-300 hover:border-white hover:text-white transition-colors">Reset</button>
                            <button onClick={() => setShowFilterPanel(false)} className="flex-1 py-3 text-xs uppercase tracking-widest font-medium bg-white text-black hover:bg-neutral-200 transition-colors">Apply</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
