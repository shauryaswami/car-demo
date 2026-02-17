import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-neutral-900 text-white py-16 border-t border-white/5">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <h3 className="text-xl font-light tracking-widest">LUXE MOTORS</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        Redefining the luxury car buying experience. Premium selection, exceptional service.
                    </p>
                </div>

                <div>
                    <h4 className="font-medium mb-4">Navigation</h4>
                    <ul className="space-y-2 text-sm text-neutral-400">
                        <li><Link href="/inventory" className="hover:text-white transition-colors">Inventory</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-medium mb-4">Contact</h4>
                    <ul className="space-y-2 text-sm text-neutral-400">
                        <li>Connaught Place, Block A</li>
                        <li>New Delhi - 110001, India</li>
                        <li>+91 98765 43210</li>
                        <li>info@luxemotors.in</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-medium mb-4">Hours</h4>
                    <ul className="space-y-2 text-sm text-neutral-400">
                        <li>Mon - Sat: 10AM - 8PM</li>
                        <li>Sunday: 11AM - 6PM</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-sm text-neutral-600">
                © {new Date().getFullYear()} Luxe Motors. All rights reserved.
            </div>
        </footer>
    );
}
