"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Loader2 } from "lucide-react";

export function InquiryForm({ carId, carName }: { carId: string, carName: string }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: `I'm interested in the ${carName}. Is it still available?`
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                carId
            };

            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Failed to submit inquiry");

            setSuccess(true);
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error(error);
            alert("Failed to submit inquiry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
                <h4 className="text-green-500 font-medium mb-2">Inquiry Sent!</h4>
                <p className="text-sm text-neutral-300 mb-4">
                    Thank you for your interest. Our team will contact you shortly.
                </p>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-sm underline text-neutral-400 hover:text-white"
                >
                    Send another inquiry
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-black border-neutral-800 focus:border-white/20"
                required
            />
            <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-black border-neutral-800 focus:border-white/20"
                required
            />
            <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-black border-neutral-800 focus:border-white/20"
                required
            />
            <textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-colors min-h-[100px] placeholder:text-neutral-600 text-sm"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Contact Dealer
            </button>
        </form>
    );
}
