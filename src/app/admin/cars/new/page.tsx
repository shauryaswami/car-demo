"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Loader2 } from "lucide-react";

export default function NewCarPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        price: "",
        mileage: "",
        fuelType: "Petrol",
        transmission: "Automatic",
        color: "",
        description: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                year: Number(formData.year),
                price: Number(formData.price),
                mileage: Number(formData.mileage),
                images: images,
            };

            const res = await fetch("/api/cars", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to create car");

            router.push("/admin");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error creating car");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-light mb-8">Add New Vehicle</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Brand"
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            required
                        />
                        <Input
                            label="Model"
                            value={formData.model}
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                            required
                        />
                        <Input
                            label="Year"
                            type="number"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                            required
                        />
                        <Input
                            label="Price ($)"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                        <Input
                            label="Mileage"
                            type="number"
                            value={formData.mileage}
                            onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                            required
                        />
                        <div className="w-full">
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Fuel Type</label>
                            <select
                                className="w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                                value={formData.fuelType}
                                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                            >
                                <option>Petrol</option>
                                <option>Diesel</option>
                                <option>Electric</option>
                                <option>Hybrid</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Transmission</label>
                            <select
                                className="w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                                value={formData.transmission}
                                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                            >
                                <option>Automatic</option>
                                <option>Manual</option>
                                <option>PDK</option>
                            </select>
                        </div>
                        <Input
                            label="Color"
                            value={formData.color}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
                        <textarea
                            className="w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors min-h-[100px]"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-4">Vehicle Images</label>
                        <ImageUpload onImagesChange={setImages} existingImages={images} />
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2 text-neutral-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Create Vehicle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
