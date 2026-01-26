
"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash, Edit, CheckCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export function ProductActions({ id }: { id: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            setIsLoading(true);
            const res = await fetch(`/api/products?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert("Delete failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/products/${id}`} className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Product
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} disabled={isLoading} className="text-red-600 cursor-pointer">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Product
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
