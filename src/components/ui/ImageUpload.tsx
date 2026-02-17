"use client";

import { useState, useCallback } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    onImagesChange: (urls: string[]) => void;
    existingImages?: string[];
}

export function ImageUpload({ onImagesChange, existingImages = [] }: ImageUploadProps) {
    const [images, setImages] = useState<string[]>(existingImages);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setUploading(true);
        try {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append("images", file);
            });

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Upload failed");
            }

            const data = await response.json();
            const newImages = [...images, ...data.urls];
            setImages(newImages);
            onImagesChange(newImages);
        } catch (error) {
            console.error("Upload error:", error);
            alert(error instanceof Error ? error.message : "Failed to upload images");
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files);
        }
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleUpload(e.target.files);
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        onImagesChange(newImages);
    };

    return (
        <div className="space-y-4">
            {/* Upload Zone */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${dragActive
                        ? "border-white bg-white/5"
                        : "border-white/20 hover:border-white/40"
                    } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
            >
                <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileInput}
                    className="hidden"
                    disabled={uploading}
                />

                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="w-12 h-12 text-white/40 animate-spin mb-4" />
                            <p className="text-white/60">Uploading images...</p>
                        </>
                    ) : (
                        <>
                            <Upload className="w-12 h-12 text-white/40 mb-4" />
                            <p className="text-white font-medium mb-1">
                                Drop images here or click to browse
                            </p>
                            <p className="text-neutral-400 text-sm">
                                JPG, PNG, or WebP • Max 5MB per file
                            </p>
                        </>
                    )}
                </label>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((url, index) => (
                        <div
                            key={index}
                            className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-white/10 group"
                        >
                            <img
                                src={url}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                Image {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {images.length === 0 && (
                <div className="text-center py-4 text-neutral-500 text-sm">
                    No images uploaded yet
                </div>
            )}
        </div>
    );
}
