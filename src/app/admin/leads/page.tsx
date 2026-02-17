import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    const leads = await prisma.lead.findMany({
        include: {
            car: {
                include: { images: true }
            }
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <header className="mb-12 flex justify-between items-center border-b border-white/10 pb-8">
                <div>
                    <Link href="/admin" className="flex items-center gap-2 text-neutral-400 hover:text-white mb-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-light tracking-wide">LEADS & INQUIRIES</h1>
                </div>
            </header>

            <div className="grid gap-6">
                {leads.map((lead) => (
                    <div key={lead.id} className="bg-neutral-900/50 border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-medium">{lead.name}</h3>
                                    <span className={`text-xs px-2 py-1 rounded border ${lead.status === "New" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-neutral-800 text-neutral-400 border-neutral-700"
                                        }`}>
                                        {lead.status}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1 text-neutral-400 text-sm mb-4">
                                    <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {lead.email}</div>
                                    <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {lead.phone}</div>
                                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(lead.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div className="bg-black/50 p-4 rounded-lg text-neutral-300 text-sm">
                                    "{lead.message}"
                                </div>
                            </div>

                            {lead.car && (
                                <div className="w-full md:w-64 bg-black rounded-lg p-3 border border-white/5 flex gap-3 items-center">
                                    <div className="w-16 h-12 bg-neutral-800 rounded flex-shrink-0 overflow-hidden">
                                        {lead.car.images[0] ? (
                                            <img src={lead.car.images[0].url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">No Img</div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium truncate">{lead.car.year} {lead.car.brand}</div>
                                        <div className="text-xs text-neutral-500 truncate">{lead.car.model}</div>
                                        <Link href={`/inventory/${lead.car.id}`} className="text-xs text-white underline mt-1 block">View Vehicle</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {leads.length === 0 && (
                    <div className="text-center py-12 text-neutral-500">
                        No inquiries received yet.
                    </div>
                )}
            </div>
        </div>
    );
}
