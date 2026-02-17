"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MoveRight, Filter, X } from "lucide-react";

// Types matching the serialized data
type Car = {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    color: string;
    images: { url: string }[];
    sold: boolean;
};

export function InventoryGrid({ cars, initialSearch }: { cars: Car[]; initialSearch?: string }) {
    const [search, setSearch] = useState(initialSearch || "");
    const [selectedBrand, setSelectedBrand] = useState("All");
    const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);

    // Extract unique brands
    const brands = useMemo(() => {
        const b = new Set(cars.map((c) => c.brand));
        return ["All", ...Array.from(b)];
    }, [cars]);

    // Filter and Sort
    const filteredCars = useMemo(() => {
        let result = cars;

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (c) =>
                    c.brand.toLowerCase().includes(q) ||
                    c.model.toLowerCase().includes(q)
            );
        }

        if (selectedBrand !== "All") {
            result = result.filter((c) => c.brand === selectedBrand);
        }

        if (priceSort) {
            result = [...result].sort((a, b) =>
                priceSort === "asc" ? a.price - b.price : b.price - a.price
            );
        }

        return result;
    }, [cars, search, selectedBrand, priceSort]);

    return (
        <div>
            {/* Filters Bar */}
            <div className="bg-neutral-900 border border-white/5 rounded-xl p-6 mb-8 sticky top-24 z-30 shadow-xl backdrop-blur-md bg-opacity-90">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                        />
                        {search && (
                            <button onClick={() => setSearch("")} className="absolute right-3 top-3 text-neutral-500 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Brand Filter */}
                    <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                    >
                        {brands.map((b) => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={priceSort || ""}
                        onChange={(e) => setPriceSort(e.target.value as "asc" | "desc" | null)}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                    >
                        <option value="">Sort by Price</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>

                    {/* Results Count */}
                    <div className="flex items-center justify-end text-neutral-400 text-sm">
                        {filteredCars.length} vehicles found
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredCars.map((car) => (
                        <motion.div
                            layout
                            key={car.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="bg-neutral-900 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all group"
                        >
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <Link href={`/inventory/${car.id}`}>
                                    {car.images[0] ? (
                                        <img
                                            src={car.images[0].url}
                                            alt={car.model}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-600">
                                            No Image
                                        </div>
                                    )}
                                </Link>
                                {car.sold && <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded uppercase tracking-wider">Sold</div>}
                            </div>

                            <div className="p-6">
                                <div className="text-xs text-neutral-500 uppercase tracking-widest mb-1">{car.brand}</div>
                                <h3 className="text-xl font-medium mb-4">{car.model}</h3>
                                <div className="grid grid-cols-2 gap-y-2 text-sm text-neutral-400 mb-6 border-b border-white/5 pb-6">
                                    <div>{car.year}</div>
                                    <div className="text-right">{car.mileage.toLocaleString()} km</div>
                                    <div>{car.transmission}</div>
                                    <div className="text-right">{car.fuelType}</div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-light">₹{car.price.toLocaleString('en-IN')}</div>
                                    <Link href={`/inventory/${car.id}`} className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-neutral-200 transition-colors">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredCars.length === 0 && (
                <div className="py-24 text-center">
                    <p className="text-neutral-500 text-lg">No vehicles match your criteria.</p>
                    <button
                        onClick={() => { setSearch(""); setSelectedBrand("All"); setPriceSort(null); }}
                        className="mt-4 text-white hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
