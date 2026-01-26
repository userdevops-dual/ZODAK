
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { adminMiddleware } from "@/lib/middleware";

export async function PATCH(req: Request) {
    try {
        const authError = await adminMiddleware();
        if (authError) return authError;

        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const order = await db.order.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("[ORDER_STATUS_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
