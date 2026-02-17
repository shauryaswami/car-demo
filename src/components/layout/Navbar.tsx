"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-light tracking-widest text-white">
                    LUXE MOTORS
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                    <Link href="/inventory" className="text-neutral-300 hover:text-white transition-colors">
                        INVENTORY
                    </Link>
                    <Link href="/about" className="text-neutral-300 hover:text-white transition-colors">
                        ABOUT
                    </Link>
                    <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">
                        CONTACT
                    </Link>
                    <Link
                        href="/inventory"
                        className="px-6 py-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
                    >
                        Find Your Car
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 py-8 px-6 flex flex-col gap-6">
                    <Link
                        href="/inventory"
                        className="text-lg text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Inventory
                    </Link>
                    <Link
                        href="/about"
                        className="text-lg text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="text-lg text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Contact
                    </Link>
                    <Link
                        href="/admin"
                        className="text-lg text-neutral-500"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Admin Login
                    </Link>
                </div>
            )}
        </nav>
    );
}
