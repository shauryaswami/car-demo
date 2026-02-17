"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2574&auto=format&fit=crop"
                    alt="Luxury Car Hero"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="container mx-auto px-6 relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white mb-6">
                        ELEVATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">YOUR DRIVE</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 font-light"
                >
                    Discover an exclusive collection of the world's most prestigious automotive masterpieces.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link
                        href="/inventory"
                        className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors uppercase tracking-widest text-sm"
                    >
                        View Inventory
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
