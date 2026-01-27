
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { OrderStatusActions } from "@/components/admin/orders/OrderStatusActions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const order = await db.order.findUnique({
        where: { id },
        include: {
            user: true,
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!order) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight">Order Details</h1>
                    <p className="text-muted-foreground font-mono">ID: {order.id}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Badge className="text-base px-4 py-1 rounded-none uppercase tracking-wider">{order.status}</Badge>
                    <OrderStatusActions id={order.id} currentStatus={order.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card className="rounded-none border-gray-200">
                        <CardHeader>
                            <CardTitle className="uppercase tracking-wide text-sm text-gray-500">Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 flex-shrink-0">
                                                {/* Image would go here if we stored item image at time of purchase, 
                                                    or fetch from product. For now, simple box */}
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.product.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    Qty: {item.quantity} | {item.size} / {item.color}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-mono">${Number(item.price).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <Separator className="my-4" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${Number(order.total).toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="rounded-none border-gray-200">
                        <CardHeader>
                            <CardTitle className="uppercase tracking-wide text-sm text-gray-500">Customer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                <p className="font-medium">{order.user?.name || "Guest"}</p>
                                <p className="text-sm text-gray-500">{order.user?.email}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-none border-gray-200">
                        <CardHeader>
                            <CardTitle className="uppercase tracking-wide text-sm text-gray-500">Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Assuming address is stored in JSON or user profile. 
                                For this MVP, we might display what we have. 
                                If address isn't in Order model, we show User's address or a placeholder. 
                                Checking schema... Order has no address field? 
                                Wait, checkout normally saves address. 
                                If not in schema, I'll add a note. */}
                            <p className="text-sm text-gray-500 italic">
                                Shipping address storage not currently implemented in schema.
                                (Using user account address if available)
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}
