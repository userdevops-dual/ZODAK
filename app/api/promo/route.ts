import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Promo codes database (in production, store in DB)
const PROMO_CODES: Record<string, { discount: number; type: "percentage" | "fixed"; minOrder?: number }> = {
    "ZODAK10": { discount: 10, type: "percentage" },
    "ZODAK20": { discount: 20, type: "percentage", minOrder: 100 },
    "FREESHIP": { discount: 15, type: "fixed" }, // Equivalent to free shipping
    "WELCOME15": { discount: 15, type: "percentage" },
    "VIP25": { discount: 25, type: "percentage", minOrder: 200 }
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { code, subtotal } = body;

        if (!code) {
            return NextResponse.json(
                { error: "Promo code is required" },
                { status: 400 }
            );
        }

        const promoCode = PROMO_CODES[code.toUpperCase()];

        if (!promoCode) {
            return NextResponse.json(
                { error: "Invalid promo code" },
                { status: 400 }
            );
        }

        if (promoCode.minOrder && subtotal < promoCode.minOrder) {
            return NextResponse.json(
                { error: `Minimum order of $${promoCode.minOrder} required for this code` },
                { status: 400 }
            );
        }

        let discountAmount: number;
        if (promoCode.type === "percentage") {
            discountAmount = (subtotal * promoCode.discount) / 100;
        } else {
            discountAmount = promoCode.discount;
        }

        return NextResponse.json({
            valid: true,
            code: code.toUpperCase(),
            discount: promoCode.discount,
            type: promoCode.type,
            discountAmount: Math.round(discountAmount * 100) / 100,
            message: promoCode.type === "percentage"
                ? `${promoCode.discount}% discount applied!`
                : `$${promoCode.discount} discount applied!`
        });
    } catch (error) {
        console.error("[PROMO_POST]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
