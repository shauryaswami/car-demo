"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function CarGallery({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (images.length === 0) {
        return (
            <div className="aspect-video bg-neutral-900 rounded-xl flex items-center justify-center text-neutral-500">
                No images available
            </div>
        )
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="rounded-xl overflow-hidden border border-white/5 bg-neutral-900">
            {/* Main Image */}
            <div className="relative aspect-[16/9] group">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt="Car View"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur p-2 rounded-full text-white hover:bg-white hover:text-black transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft className="w-6 h-6 ml-[-2px]" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur p-2 rounded-full text-white hover:bg-white hover:text-black transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight className="w-6 h-6 mr-[-2px]" />
                        </button>
                    </>
                )}

                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs text-white">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto bg-black">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative w-24 aspect-[4/3] rounded overflow-hidden flex-shrink-0 border-2 transition-all ${currentIndex === idx ? "border-white" : "border-transparent opacity-50 hover:opacity-100"
                                }`}
                        >
                            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
