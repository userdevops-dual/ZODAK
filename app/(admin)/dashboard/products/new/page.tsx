
import { ProductForm } from "@/components/admin/products/ProductForm";

export default function NewProductPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold uppercase tracking-tight">Add New Product</h1>
                <p className="text-muted-foreground">Create a new product for your store.</p>
            </div>
            <div className="bg-white p-8 border shadow-sm">
                <ProductForm />
            </div>
        </div>
    );
}
