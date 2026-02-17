import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import Image from "next/image";

// Force dynamic to ensure we see latest data
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    const cars = await prisma.car.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
    });

    const carsCount = await prisma.car.count();
    const leadsCount = await prisma.lead.count();

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <header className="mb-12 flex justify-between items-center border-b border-white/10 pb-8">
                <div>
                    <h1 className="text-3xl font-light tracking-wide">DASHBOARD</h1>
                    <p className="text-neutral-400 mt-2">Inventory Management System</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/admin/leads"
                        className="bg-neutral-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-neutral-700 transition-colors flex items-center gap-2"
                    >
                        View Leads
                    </Link>
                    <Link
                        href="/admin/cars/new"
                        className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Vehicle
                    </Link>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 rounded-xl bg-neutral-900/50 border border-white/5">
                    <h3 className="text-neutral-400 text-sm uppercase tracking-wider mb-2">
                        Total Inventory
                    </h3>
                    <p className="text-4xl font-light">{carsCount}</p>
                </div>
                <Link href="/admin/leads" className="p-6 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-white/20 transition-colors block">
                    <h3 className="text-neutral-400 text-sm uppercase tracking-wider mb-2">
                        Active Leads
                    </h3>
                    <p className="text-4xl font-light">{leadsCount}</p>
                </Link>
                <div className="p-6 rounded-xl bg-neutral-900/50 border border-white/5">
                    <h3 className="text-neutral-400 text-sm uppercase tracking-wider mb-2">
                        Total Value
                    </h3>
                    <p className="text-4xl font-light">
                        ₹
                        {cars
                            .reduce((acc, car) => acc + car.price, 0)
                            .toLocaleString('en-IN')}
                    </p>
                </div>
            </div>

            <h2 className="text-xl font-light mb-6">Current Inventory</h2>
            <div className="bg-neutral-900/30 rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-neutral-900 text-neutral-400 text-sm uppercase">
                        <tr>
                            <th className="p-4 font-medium">Vehicle</th>
                            <th className="p-4 font-medium">Price</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {cars.map((car) => (
                            <tr key={car.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 flex items-center gap-4">
                                    <div className="w-16 h-12 relative bg-neutral-800 rounded overflow-hidden">
                                        {car.images[0] ? (
                                            <div className="relative w-full h-full">
                                                <img src={car.images[0].url} alt={car.model} className="object-cover w-full h-full" />
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
                                                No Img
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">
                                            {car.year} {car.brand} {car.model}
                                        </div>
                                        <div className="text-sm text-neutral-500">
                                            {car.mileage.toLocaleString()} km • {car.fuelType}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-neutral-300">
                                    ₹{car.price.toLocaleString('en-IN')}
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`inline-block px-2 py-1 rounded text-xs border ${car.sold
                                            ? "border-red-500/30 text-red-500 bg-red-500/10"
                                            : "border-green-500/30 text-green-500 bg-green-500/10"
                                            }`}
                                    >
                                        {car.sold ? "SOLD" : "AVAILABLE"}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        {/* Delete Form */}
                                        <form
                                            action={async () => {
                                                "use server"
                                                await prisma.car.delete({ where: { id: car.id } })
                                                redirect("/admin")
                                            }}
                                        >
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {cars.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-neutral-500">
                                    No vehicles found. Add your first car to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
