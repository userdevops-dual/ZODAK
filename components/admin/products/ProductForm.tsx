
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import Image from "next/image";

export function ProductForm({ initialData }: { initialData?: any }) {
    const [images, setImages] = useState<string[]>(initialData?.images ? JSON.parse(initialData.images) : []);
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Derived values for editing
    const defaultSizes = initialData?.variants
        ? Array.from(new Set(initialData.variants.map((v: any) => v.size))).join(", ")
        : "";
    const defaultColors = initialData?.variants
        ? Array.from(new Set(initialData.variants.map((v: any) => v.color))).join(", ")
        : "";
    const defaultStock = initialData?.variants?.[0]?.stock || 100;

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (res.ok) {
                setImages((prev) => [...prev, data.url]);
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        // Parse comma-separated values
        const sizeString = formData.get("sizes") as string;
        const colorString = formData.get("colors") as string;

        const data = {
            id: initialData?.id,
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            category: formData.get("category"),
            stock: Number(formData.get("stock")),
            images,
            sizes: sizeString ? sizeString.split(",").map(s => s.trim()) : [],
            colors: colorString ? colorString.split(",").map(s => s.trim()) : [],
        };

        try {
            const method = initialData ? "PATCH" : "POST";
            const res = await fetch("/api/products", {
                method,
                body: JSON.stringify(data),
            });

            if (res.ok) {
                window.location.href = "/dashboard/products";
            } else {
                alert("Something went wrong.");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Basic Info */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input name="name" type="text" id="name" defaultValue={initialData?.name} placeholder="e.g. Oversized Wool Coat" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea name="description" id="description" defaultValue={initialData?.description} placeholder="Product details..." className="h-32" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input name="price" type="number" id="price" defaultValue={initialData?.price} placeholder="0.00" required step="0.01" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input name="category" type="text" id="category" defaultValue={initialData?.category?.name || initialData?.category} placeholder="Woman" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input name="stock" type="number" id="stock" defaultValue={defaultStock} placeholder="100" required />
                        </div>
                        <div className="space-y-2">
                        </div>
                    </div>
                </div>

                {/* Right Column: Variants & Media */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Label>Variants</Label>
                        <div className="space-y-4 p-4 bg-gray-50 border border-gray-100 rounded-sm">
                            <div className="space-y-2">
                                <Label htmlFor="sizes" className="text-xs uppercase tracking-wider text-gray-500">Sizes (Comma separated)</Label>
                                <Input name="sizes" id="sizes" defaultValue={defaultSizes} placeholder="S, M, L, XL" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="colors" className="text-xs uppercase tracking-wider text-gray-500">Colors (Comma separated)</Label>
                                <Input name="colors" id="colors" defaultValue={defaultColors} placeholder="Black, Beige, Navy" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label>Product Images</Label>
                        <div className="grid grid-cols-3 gap-4">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative aspect-square bg-gray-50 border border-gray-100 overflow-hidden group">
                                    <Image src={img} alt={`Product ${idx}`} fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 p-1 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-square border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors bg-gray-50 hover:bg-gray-100"
                            >
                                {isUploading ? (
                                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                                ) : (
                                    <>
                                        <ImagePlus className="w-6 h-6 text-gray-400" />
                                        <span className="text-xs text-gray-500 mt-2 font-medium uppercase tracking-wide">Add Image</span>
                                    </>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                            * First image will be the main product image.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => window.history.back()} className="uppercase tracking-widest text-xs font-bold">Cancel</Button>
                <Button type="submit" className="bg-black text-white hover:bg-neutral-800 uppercase tracking-widest text-xs font-bold px-8" disabled={loading || isUploading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {initialData ? "Update Product" : "Save Product"}
                </Button>
            </div>
        </form>
    )
}
