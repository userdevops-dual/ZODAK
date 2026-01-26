import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received" }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const filename = Date.now() + "-" + file.name.replaceAll(" ", "_");

        // Ensure uploads dir exists (absolute path)
        const uploadDir = path.join(process.cwd(), "public/uploads");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Ignore if exists
        }

        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, Buffer.from(buffer));

        return NextResponse.json({
            success: true,
            url: `/uploads/${filename}`
        });

    } catch (error: any) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
    }
}
