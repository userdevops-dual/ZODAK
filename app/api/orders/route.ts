import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { adminMiddleware } from "@/lib/middleware";

export async function POST(req: Request) {
    try {
        const session = await auth();

        const body = await req.json();
        const { items, total, shippingDetails } = body;

        if (!items || items.length === 0) {
            return new NextResponse("No items in order", { status: 400 });
        }

        const order = await db.order.create({
            data: {
                userId: session?.user?.id || null,
                total: parseFloat(total),
                status: "PENDING",
                items: {
                    create: items.map((item: { productId: string; quantity: number; price: number }) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: parseFloat(String(item.price))
                    }))
                }
            },
            include: {
                items: true
            }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("[ORDERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await auth();

        // If admin, return all orders
        const userRole = (session?.user as { role?: string })?.role;

        let orders;
        if (userRole === "ADMIN") {
            orders = await db.order.findMany({
                include: {
                    user: true,
                    items: {
                        include: { product: true }
                    }
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        } else if (session?.user?.id) {
            // Regular user: only their orders
            orders = await db.order.findMany({
                where: { userId: session.user.id },
                include: {
                    items: {
                        include: { product: true }
                    }
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        } else {
            return NextResponse.json([]);
        }

        return NextResponse.json(orders);
    } catch (error) {
        console.error("[ORDERS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const authError = await adminMiddleware();
        if (authError) return authError;

        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return new NextResponse("Order ID and status required", { status: 400 });
        }

        const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
        if (!validStatuses.includes(status)) {
            return new NextResponse("Invalid status", { status: 400 });
        }

        const order = await db.order.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("[ORDERS_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
