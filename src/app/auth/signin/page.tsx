"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid credentials");
            } else {
                router.push("/admin");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred");
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left: Branding */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-neutral-900 border-r border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2694')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-light tracking-widest text-white">LUXE MOTORS</h1>
                </div>
                <div className="relative z-10">
                    <p className="text-neutral-400 text-lg max-w-md">
                        "The ultimate destination for premium automotive excellence. Manage your inventory with precision."
                    </p>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center p-8 bg-black">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-light text-white mb-2">Welcome Back</h2>
                        <p className="text-neutral-400">Enter your credentials to access the dashboard.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                placeholder="admin@luxurycars.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group"
                        >
                            Sign In
                            <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
