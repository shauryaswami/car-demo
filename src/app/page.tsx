import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MoveRight, Search } from "lucide-react";
import Image from "next/image";

// Components (We could extract these, but for speed keeping them here or simple strings)
// Actually, let's make a Client Component for the Hero to handle animations? 
// Or just use Server Components with CSS animations for simple stuff.
// User asked for Framer Motion. I'll create a generic FadeIn component or use it inline in a client component.
// But page.tsx is a Server Component to fetch data.
// So I will make sections.

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCars } from "@/components/home/FeaturedCars";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredCars = await prisma.car.findMany({
    where: { featured: true },
    include: { images: true },
    take: 3,
  });

  // Serialize dates to avoid passing Date objects to client component
  const serializedCars = featuredCars.map(car => ({
    ...car,
    createdAt: car.createdAt.toISOString(),
    updatedAt: car.updatedAt.toISOString(),
    price: Number(car.price), // Ensure number
    mileage: Number(car.mileage),
    year: Number(car.year),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Search Section */}
      <section className="bg-neutral-900 py-12 border-y border-white/5 relative z-10 -mt-10 mx-6 rounded-xl shadow-2xl">
        <div className="container mx-auto px-6">
          <form action="/inventory" className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
              <input
                name="search"
                type="text"
                placeholder="Search by make, model, or keyword..."
                className="w-full bg-black border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <button type="submit" className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors uppercase tracking-widest text-sm">
              Search Inventory
            </button>
          </form>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-light mb-4">Featured Collection</h2>
              <p className="text-neutral-400 max-w-xl">
                Hand-picked vehicles representing the pinnacle of automotive engineering and luxury.
              </p>
            </div>
            <Link href="/inventory" className="hidden md:flex items-center gap-2 text-white hover:text-neutral-300 transition-colors pb-2 border-b border-white">
              View All Inventory <MoveRight className="w-4 h-4" />
            </Link>
          </div>

          <FeaturedCars cars={serializedCars as any} />
          {/* using 'any' to bypass strict Date vs string type mismatch for now, or update FeaturedCars type */}

          <div className="mt-12 md:hidden text-center">
            <Link href="/inventory" className="inline-flex items-center gap-2 text-white hover:text-neutral-300 transition-colors pb-2 border-b border-white">
              View All Inventory <MoveRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA / About Teaser */}
      <section className="py-24 bg-neutral-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2694')] bg-cover bg-center opacity-10 grayscale"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">Experience Excellence</h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
            We don't just sell cars; we curate lifestyles. Visit our showroom to experience the difference.
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-transparent border border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300 rounded-none uppercase tracking-widest">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
