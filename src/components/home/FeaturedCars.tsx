"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Car } from "@prisma/client"; // Use Prisma types

export function FeaturedCars({ cars }: { cars: any[] }) {
    if (cars.length === 0) {
        return <div className="text-neutral-500">No featured cars available.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cars.map((car, index) => (
                <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-neutral-900 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
                >
                    <div className="aspect-[4/3] overflow-hidden relative">
                        {car.images[0] ? (
                            <img
                                src={car.images[0].url}
                                alt={car.model}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-600">No Image</div>
                        )}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-medium border border-white/10">
                            {car.year}
                        </div>
                    </div>

                    <div className="p-6">
                        <h3 className="text-xl font-medium mb-1">{car.brand} {car.model}</h3>
                        <p className="text-neutral-400 text-sm mb-4">{car.mileage.toLocaleString()} km • {car.transmission}</p>

                        <div className="flex justify-between items-center pt-4 border-t border-white/5">
                            <span className="text-lg font-light">₹{car.price.toLocaleString('en-IN')}</span>
                            <Link href={`/inventory/${car.id}`} className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all">
                                Details <MoveRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
