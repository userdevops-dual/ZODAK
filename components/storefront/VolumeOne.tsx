import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

async function getVolumeOneProducts() {
    try {
        const products = await db.product.findMany({
            take: 4,
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                variants: true
            }
        });
        return products;
    } catch (error) {
        console.error("Error fetching volume one products:", error);
        return [];
    }
}

export async function VolumeOne() {
    const products = await getVolumeOneProducts();

    if (products.length === 0) return null;

    return (
        <section className="py-20 px-6 sm:px-12 lg:px-20 bg-white">
            <div className="flex items-end justify-between mb-12 border-b border-black/10 pb-6 max-w-4xl mx-auto">
                <div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-thin uppercase tracking-tighter leading-[0.8]">
                        Volume<br />One
                    </h2>
                </div>
                <Link href="/shop" className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest hover:underline">
                    View All <ArrowUpRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 gap-0 border border-gray-200">
                    {products.map((product) => {
                        let productImage = "/placeholder.jpg";
                        try {
                            if (product.images) {
                                const parsed = JSON.parse(product.images);
                                if (Array.isArray(parsed) && parsed.length > 0) {
                                    productImage = parsed[0];
                                }
                            }
                        } catch {
                            // Fallback
                        }

                        return (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="group relative bg-white aspect-square overflow-hidden block border border-gray-200"
                            >
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={productImage}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 text-white">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest">{product.category?.name}</p>
                                        <h3 className="font-bold text-lg leading-tight uppercase tracking-wide">{product.name}</h3>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="font-mono text-sm">${Number(product.price).toFixed(2)}</span>
                                        <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white text-black">View</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent sm:hidden text-white">
                                    <h3 className="font-medium text-sm">{product.name}</h3>
                                    <p className="text-xs opacity-80">${Number(product.price).toFixed(2)}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link href="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-black pb-1">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
