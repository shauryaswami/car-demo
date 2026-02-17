import { prisma } from "@/lib/prisma";
import { InventoryGrid } from "@/components/inventory/InventoryGrid";

export const dynamic = "force-dynamic";

export default async function InventoryPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // Fetch all cars for client-side filtering (dynamic and instant)
    // If thousands, we'd paginate server-side, but for "dealership" < 100 is typical.
    const cars = await prisma.car.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    // Serialize keys
    const serializedCars = cars.map(car => ({
        ...car,
        createdAt: car.createdAt.toISOString(),
        updatedAt: car.updatedAt.toISOString(),
    }));

    // Handle initial search/make filter from URL if present?
    // We can pass searchParams to client component to set initial state.

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-light mb-4">Our Collection</h1>
                <p className="text-neutral-400 mb-12 max-w-2xl">
                    Browse our extensive inventory of premium vehicles. Use the filters to find your perfect match.
                </p>

                <InventoryGrid cars={serializedCars as any} initialSearch={searchParams?.search as string} />
            </div>
        </div>
    );
}
