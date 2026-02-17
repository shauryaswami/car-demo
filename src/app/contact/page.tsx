import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black" />
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-light tracking-wider mb-4">
                        GET IN TOUCH
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Visit our showroom or reach out to our luxury car specialists
                    </p>
                </div>
            </div>

            {/* Contact Information */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* Contact Details */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-light mb-8">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">Showroom Address</h3>
                                        <p className="text-neutral-400">
                                            Luxe Motors Premium Showroom<br />
                                            Connaught Place, Block A<br />
                                            New Delhi - 110001<br />
                                            India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">Phone</h3>
                                        <p className="text-neutral-400">
                                            +91 98765 43210<br />
                                            +91 98765 43211
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">Email</h3>
                                        <p className="text-neutral-400">
                                            info@luxemotors.in<br />
                                            sales@luxemotors.in
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">Business Hours</h3>
                                        <p className="text-neutral-400">
                                            Monday - Saturday: 10:00 AM - 8:00 PM<br />
                                            Sunday: 11:00 AM - 6:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-neutral-900/30 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-light mb-6">Send us a Message</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                                    placeholder="Tell us about your requirements..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bg-neutral-900/30 border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-light mb-6">Visit Our Showroom</h2>
                    <div className="aspect-video bg-neutral-800 rounded-lg flex items-center justify-center">
                        <p className="text-neutral-500">
                            Map integration placeholder - Connaught Place, New Delhi
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
