

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ProductActions } from "@/components/admin/products/ProductActions";

export default async function ProductsPage() {
    const products = await db.product.findMany({
        include: {
            category: true,
            variants: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold uppercase tracking-tight">Products</h1>
                <Button asChild className="bg-black text-white hover:bg-neutral-800 rounded-none">
                    <Link href="/dashboard/products/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                    </Link>
                </Button>
            </div>

            <div className="rounded-none border shadow-sm bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Variants</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{product.name}</span>
                                            <span className="text-xs text-muted-foreground truncate max-w-[200px]">{product.description}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{product.category?.name}</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                            {product.variants.length} options
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ProductActions id={product.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
