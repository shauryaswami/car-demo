import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message, carId } = body;

        if (!name || !email || !phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                phone,
                message,
                carId,
            },
        });

        return NextResponse.json(lead);
    } catch (error) {
        console.error("Error creating lead:", error);
        return NextResponse.json({ error: "Error submitting inquiry" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const leads = await prisma.lead.findMany({
            include: {
                car: {
                    include: {
                        images: { take: 1 } // Include primary image
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(leads);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching leads" }, { status: 500 });
    }
}
