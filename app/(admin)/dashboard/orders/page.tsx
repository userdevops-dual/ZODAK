

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";

const getStatusColor = (status: string) => {
    switch (status) {
        case "DELIVERED": return "bg-green-100 text-green-800 hover:bg-green-100";
        case "SHIPPED": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
        case "PROCESSING": return "bg-purple-100 text-purple-800 hover:bg-purple-100";
        case "CANCELLED": return "bg-red-100 text-red-800 hover:bg-red-100";
        default: return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    }
}

export default async function OrdersPage() {
    const orders = await db.order.findMany({
        include: {
            user: true,
            items: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold uppercase tracking-tight">Orders</h1>
                <Button variant="outline" className="rounded-none">Export CSV</Button>
            </div>

            <div className="rounded-none border shadow-sm bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                                    <TableCell>{order.user?.name || order.user?.email || "Guest"}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.items.length} items</TableCell>
                                    <TableCell>${Number(order.total).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge className={`rounded-none font-normal ${getStatusColor(order.status)} border-0`}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="link" size="sm">
                                            <Link href={`/dashboard/orders/${order.id}`}>View Details</Link>
                                        </Button>
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
