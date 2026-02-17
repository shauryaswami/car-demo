import { Award, Shield, Users, TrendingUp } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black" />
                <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                    <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-6">
                        ABOUT LUXE MOTORS
                    </h1>
                    <p className="text-neutral-400 text-xl">
                        India's Premier Destination for Luxury Automobiles
                    </p>
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                    <div>
                        <h2 className="text-4xl font-light mb-6">Our Story</h2>
                        <div className="space-y-4 text-neutral-300 leading-relaxed">
                            <p>
                                Founded in the heart of New Delhi, Luxe Motors has established itself as
                                India's most trusted name in luxury automotive retail. We specialize in
                                curating an exclusive collection of the world's finest automobiles.
                            </p>
                            <p>
                                With over a decade of experience in the luxury car segment, we understand
                                the discerning tastes of India's elite. Our showroom in Connaught Place
                                showcases an impeccable selection of premium vehicles from the world's
                                most prestigious manufacturers.
                            </p>
                            <p>
                                Every vehicle in our collection is meticulously inspected, certified, and
                                prepared to meet the highest standards of excellence. We don't just sell
                                cars; we deliver dreams on wheels.
                            </p>
                        </div>
                    </div>
                    <div className="aspect-video bg-neutral-900 rounded-2xl border border-white/10 flex items-center justify-center">
                        <p className="text-neutral-500">Showroom Image Placeholder</p>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-32">
                    <h2 className="text-4xl font-light text-center mb-16">Why Choose Luxe Motors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-neutral-900/30 border border-white/10 rounded-xl p-8 hover:border-white/30 transition-colors">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-medium mb-3">Premium Selection</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Handpicked collection of the world's most prestigious luxury vehicles,
                                each meeting our stringent quality standards.
                            </p>
                        </div>

                        <div className="bg-neutral-900/30 border border-white/10 rounded-xl p-8 hover:border-white/30 transition-colors">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-medium mb-3">Certified Quality</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Every vehicle undergoes comprehensive inspection and certification
                                to ensure absolute peace of mind.
                            </p>
                        </div>

                        <div className="bg-neutral-900/30 border border-white/10 rounded-xl p-8 hover:border-white/30 transition-colors">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-medium mb-3">Expert Guidance</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Our team of luxury automotive specialists provides personalized
                                consultation to help you find your perfect vehicle.
                            </p>
                        </div>

                        <div className="bg-neutral-900/30 border border-white/10 rounded-xl p-8 hover:border-white/30 transition-colors">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-medium mb-3">Trusted Legacy</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Over a decade of excellence in serving India's luxury car
                                enthusiasts with integrity and professionalism.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="bg-gradient-to-br from-neutral-900/50 to-black border border-white/10 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-light mb-6">Our Mission</h2>
                    <p className="text-neutral-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        To redefine luxury automotive retail in India by offering an unparalleled
                        selection of premium vehicles, backed by exceptional service and unwavering
                        commitment to customer satisfaction. We strive to make every purchase a
                        memorable journey into automotive excellence.
                    </p>
                </div>
            </div>
        </div>
    );
}
