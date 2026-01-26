
import { db } from "@/lib/db";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await db.product.findUnique({
        where: { id },
        include: {
            variants: true,
            category: true
        }
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold uppercase tracking-tight">Edit Product</h1>
                <p className="text-muted-foreground">Manage product details and inventory.</p>
            </div>
            <div className="bg-white p-8 border shadow-sm">
                <ProductForm initialData={product} />
            </div>
        </div>
    );
}
