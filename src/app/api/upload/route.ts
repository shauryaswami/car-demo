import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const files = formData.getAll("images") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }

        const uploadedUrls: string[] = [];

        for (const file of files) {
            // Validate file type
            const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                return NextResponse.json(
                    { error: `Invalid file type: ${file.type}. Only JPG, PNG, and WebP are allowed.` },
                    { status: 400 }
                );
            }

            // Validate file size (5MB max)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                return NextResponse.json(
                    { error: `File too large: ${file.name}. Maximum size is 5MB.` },
                    { status: 400 }
                );
            }

            // Generate unique filename
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 15);
            const extension = path.extname(file.name);
            const filename = `${timestamp}-${randomString}${extension}`;

            // Convert file to buffer
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Save file to public/uploads
            const uploadPath = path.join(process.cwd(), "public", "uploads", filename);
            await writeFile(uploadPath, buffer);

            // Add URL to response
            uploadedUrls.push(`/uploads/${filename}`);
        }

        return NextResponse.json({ urls: uploadedUrls }, { status: 200 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Failed to upload images" }, { status: 500 });
    }
}
