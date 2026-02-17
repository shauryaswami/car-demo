import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CarGallery } from "../../../components/cars/CarGallery";
import { InquiryForm } from "../../../components/cars/InquiryForm";
import { Calendar, Gauge, Fuel, Cog, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const car = await prisma.car.findUnique({
        where: { id },
        include: { images: true },
    });

    return {
        title: car ? `${car.year} ${car.brand} ${car.model} | Luxe Motors` : "Vehicle Not Found",
    };
}

export default async function CarDetailPage({ params }: Props) {
    const { id } = await params
    const car = await prisma.car.findUnique({
        where: { id },
        include: { images: true },
    });

    if (!car) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <Link
                    href="/inventory"
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Inventory
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-white/10 pb-8">
                    <div>
                        <div className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-2">
                            {car.year} • {car.brand}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-light mb-2">{car.model}</h1>
                        <div className="flex gap-4 text-sm text-neutral-400">
                            <span className="flex items-center gap-1"><Gauge className="w-4 h-4" /> {car.mileage.toLocaleString()} km</span>
                            <span className="flex items-center gap-1"><Fuel className="w-4 h-4" /> {car.fuelType}</span>
                            <span className="flex items-center gap-1"><Cog className="w-4 h-4" /> {car.transmission}</span>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0 text-right">
                        <div className="text-3xl font-light">₹{car.price.toLocaleString('en-IN')}</div>
                        {car.sold ? (
                            <span className="inline-block px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded mt-2 text-sm font-medium">SOLD OUT</span>
                        ) : (
                            <span className="inline-block px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded mt-2 text-sm font-medium">AVAILABLE</span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content (Gallery + Specs) */}
                    <div className="lg:col-span-2 space-y-12">
                        <CarGallery images={car.images.map(img => img.url)} />

                        <div>
                            <h2 className="text-2xl font-light mb-6 border-b border-white/5 pb-2">Vehicle Overview</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-neutral-900/30 p-6 rounded-xl border border-white/5">
                                <SpecItem label="Year" value={car.year} icon={<Calendar className="w-5 h-5" />} />
                                <SpecItem label="Mileage" value={`${car.mileage.toLocaleString()} km`} icon={<Gauge className="w-5 h-5" />} />
                                <SpecItem label="Transmission" value={car.transmission} icon={<Cog className="w-5 h-5" />} />
                                <SpecItem label="Fuel Type" value={car.fuelType} icon={<Fuel className="w-5 h-5" />} />
                                <SpecItem label="Exterior Color" value={car.color} />
                                <SpecItem label="Stock #" value={`INV-${car.id.slice(-6).toUpperCase()}`} />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-light mb-6 border-b border-white/5 pb-2">Description</h2>
                            <div className="prose prose-invert max-w-none text-neutral-300 font-light leading-relaxed whitespace-pre-line">
                                {car.description}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Inquiry Form) */}
                    <div className="lg:col-span-1">
                        <div className="bg-neutral-900 border border-white/10 rounded-xl p-8 sticky top-24">
                            <h3 className="text-xl font-light mb-2">Interested in this car?</h3>
                            <p className="text-neutral-400 text-sm mb-6">
                                Fill out the form below and our sales team will contact you shortly.
                            </p>
                            <InquiryForm carId={car.id} carName={`${car.year} ${car.brand} ${car.model}`} />

                            <div className="mt-8 border-t border-white/10 pt-6 space-y-4">
                                <Benefit text="Premium Financing Available" />
                                <Benefit text="Worldwide Delivery" />
                                <Benefit text="Comprehensive Warranty" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SpecItem({ label, value, icon }: { label: string, value: string | number, icon?: React.ReactNode }) {
    return (
        <div>
            <div className="text-neutral-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
                {icon} {label}
            </div>
            <div className="text-white font-medium">{value}</div>
        </div>
    )
}

function Benefit({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-sm text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-white" />
            {text}
        </div>
    )
}
