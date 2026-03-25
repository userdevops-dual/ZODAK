import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { adminMiddleware } from "@/lib/middleware";
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {
        const session = await auth();

        const body = await req.json();
        const { items, total, shippingDetails } = body;

        if (!items || items.length === 0) {
            return new NextResponse("No items in order", { status: 400 });
        }

        // Validate product IDs to avoid Foreign Key constraint errors for the demo
        const validItemData = [];
        for (const item of items) {
            const productExists = await db.product.findUnique({
                where: { id: item.productId }
            });
            
            if (productExists) {
                validItemData.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: parseFloat(String(item.price))
                });
            }
        }

        const order = await db.order.create({
            data: {
                userId: session?.user?.id || null,
                total: parseFloat(total),
                status: "PENDING",
                items: {
                    create: validItemData
                }
            },
            include: {
                items: true
            }
        });

        // Async Email Dispatch using Resend (Non-blocking)
        try {
            if (shippingDetails?.email && process.env.RESEND_API_KEY) {
                const resend = new Resend(process.env.RESEND_API_KEY);
                
                await resend.emails.send({
                    from: 'ZODAK Orders <hello@zodak.com>',
                    to: shippingDetails.email,
                    subject: 'ZODAK - Order Confirmation',
                    html: `
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; background-color: #000; color: #fff; max-width: 600px; margin: 0 auto;">
                            <div style="text-align: center; margin-bottom: 40px;">
                                <h1 style="font-size: 24px; font-weight: 900; letter-spacing: 4px; margin: 0; text-transform: uppercase;">Z O D A K</h1>
                            </div>
                            
                            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 20px; letter-spacing: 1px; text-transform: uppercase;">Order Confirmed</h2>
                            <p style="font-size: 14px; color: #a3a3a3; line-height: 1.6; margin-bottom: 30px;">
                                Hello ${shippingDetails.firstName || 'Valued Customer'},<br><br>
                                Thank you for your purchase. Your order has been securely processed and is currently being prepared for shipment.
                            </p>
                            
                            <div style="background-color: #111; border: 1px solid #222; padding: 20px; margin-bottom: 40px;">
                                <h3 style="font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 10px; margin-top: 0; margin-bottom: 20px;">Order Details</h3>
                                
                                ${items.map((item: { productId: string; quantity: number; price: number }) => `
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                        <div>
                                            <p style="margin: 0; font-size: 14px; font-weight: 600;">Product Reference ${item.productId.substring(0,8).toUpperCase()}</p>
                                            <p style="margin: 4px 0 0 0; font-size: 12px; color: #888;">Qty: ${item.quantity}</p>
                                        </div>
                                        <p style="margin: 0; font-size: 14px; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                `).join('')}
                                
                                <div style="border-top: 1px solid #333; margin-top: 20px; padding-top: 15px; display: flex; justify-content: space-between; font-weight: 700; font-size: 16px;">
                                    <span style="letter-spacing: 1px; text-transform: uppercase; font-size: 12px;">Total Amount</span>
                                    <span>$${parseFloat(total).toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <p style="font-size: 12px; color: #666; text-align: center; line-height: 1.5;">
                                If you have any questions, please reply to this email or contact us at hello@zodak.com.<br><br>
                                © ${new Date().getFullYear()} ZODAK GLOBAL. All rights reserved.
                            </p>
                        </div>
                    `
                });
            }
        } catch (emailError) {
            console.error("[EMAIL_DISPATCH_ERROR]", emailError);
        }

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
