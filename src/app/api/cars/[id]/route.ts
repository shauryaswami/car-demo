import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const car = await prisma.car.findUnique({
            where: { id },
            include: { images: true }, // Ensure images are included
        });

        if (!car) {
            return NextResponse.json({ error: "Car not found" }, { status: 404 });
        }

        return NextResponse.json(car);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching car" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params
        await prisma.car.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting car" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params
        const body = await request.json();
        const { images, ...carData } = body;

        // Update basic fields
        const car = await prisma.car.update({
            where: { id },
            data: {
                ...carData,
            },
        });

        // Handle images if provided (complex: simplified here to just add new ones or replace?)
        // For MVP, we might skip complex image update logic or just wipe and recreate
        // Let's assume we don't update images in this simple PUT for now, or just handle basic fields.
        // If images are passed, we could delete all and recreate:
        if (images) {
            await prisma.carImage.deleteMany({ where: { carId: id } });
            await prisma.carImage.createMany({
                data: images.map((url: string) => ({ url, carId: id }))
            })
        }

        return NextResponse.json(car);
    } catch (error) {
        return NextResponse.json({ error: "Error updating car" }, { status: 500 });
    }
}
