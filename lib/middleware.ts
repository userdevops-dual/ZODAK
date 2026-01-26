import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function adminMiddleware() {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json(
            { error: "Unauthorized - Please login" },
            { status: 401 }
        );
    }

    const userRole = (session.user as { role?: string }).role;

    if (userRole !== "ADMIN") {
        return NextResponse.json(
            { error: "Forbidden - Admin access required" },
            { status: 403 }
        );
    }

    return null; // Authorized
}

export async function authMiddleware() {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json(
            { error: "Unauthorized - Please login" },
            { status: 401 }
        );
    }

    return null; // Authorized
}
