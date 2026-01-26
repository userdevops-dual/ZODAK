
"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export function OrderStatusActions({ id, currentStatus }: { id: string, currentStatus: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onUpdateStatus = async (status: string) => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/orders/status", {
                method: "PATCH",
                body: JSON.stringify({ id, status }),
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating status");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={isLoading} className="uppercase tracking-widest text-xs font-bold">
                    {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Update Status"}
                    {!isLoading && <ChevronDown className="w-4 h-4 ml-2" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {STATUSES.map((status) => (
                    <DropdownMenuItem
                        key={status}
                        onClick={() => onUpdateStatus(status)}
                        disabled={status === currentStatus}
                        className="cursor-pointer font-medium"
                    >
                        {status}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
