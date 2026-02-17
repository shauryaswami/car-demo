import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cars = await prisma.car.findMany({
            include: {
                images: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(cars);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching cars" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { images, ...carData } = body;

        // Basic validation
        if (!carData.brand || !carData.model || !carData.price) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const car = await prisma.car.create({
            data: {
                ...carData,
                images: {
                    create: images.map((url: string) => ({ url })),
                },
            },
        });

        return NextResponse.json(car);
    } catch (error) {
        console.error("Error creating car:", error);
        return NextResponse.json({ error: "Error creating car" }, { status: 500 });
    }
}
