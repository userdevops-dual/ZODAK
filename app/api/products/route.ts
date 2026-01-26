import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { adminMiddleware } from "@/lib/middleware";

export async function POST(req: Request) {
    try {
        const authError = await adminMiddleware();
        if (authError) return authError;

        const body = await req.json();
        const { name, description, price, category, images, sizes, colors, stock } = body;

        if (!name || !price || !category) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Ensure category exists
        let categoryRecord = await db.category.findUnique({
            where: { name: category }
        });

        if (!categoryRecord) {
            categoryRecord = await db.category.create({
                data: { name: category }
            });
        }

        const product = await db.product.create({
            data: {
                name,
                description: description || "",
                price: parseFloat(price),
                categoryId: categoryRecord.id,
                images: JSON.stringify(images || []),
            },
        });

        // Logic to create variants
        const sizeList = sizes && sizes.length > 0 ? sizes : ["One Size"];
        const colorList = colors && colors.length > 0 ? colors : ["Default"];

        for (const size of sizeList) {
            for (const color of colorList) {
                await db.productVariant.create({
                    data: {
                        productId: product.id,
                        size,
                        color,
                        stock: Number(stock) || 0
                    }
                });
            }
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("[PRODUCTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const products = await db.product.findMany({
            include: {
                category: true,
                variants: true
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("[PRODUCTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const authError = await adminMiddleware();
        if (authError) return authError;

        const body = await req.json();
        const { id, name, description, price, images } = body;

        if (!id) {
            return new NextResponse("Product ID required", { status: 400 });
        }

        const product = await db.product.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(description && { description }),
                ...(price && { price: parseFloat(price) }),
                ...(images && { images: JSON.stringify(images) })
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("[PRODUCTS_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const authError = await adminMiddleware();
        if (authError) return authError;

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return new NextResponse("Product ID required", { status: 400 });
        }

        await db.product.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Product deleted" });
    } catch (error) {
        console.error("[PRODUCTS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
