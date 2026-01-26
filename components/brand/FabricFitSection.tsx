"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FabricFitSection() {
    return (
        <section className="py-24 bg-neutral-50 border-b border-gray-100">
            <div className="container-mobile px-6 sm:px-12 lg:px-20 mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 space-y-8"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light uppercase tracking-tighter text-black">
                            Obsessive<br />
                            <span className="font-bold">Detailing</span>
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">The Fabric</h3>
                                <p className="text-neutral-600 font-light leading-relaxed">
                                    Our proprietary 450GSM cotton fleece is brushed on the inside for softness and tightly woven on the outside for structure (and presence).
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">The Fit</h3>
                                <p className="text-neutral-600 font-light leading-relaxed">
                                    Dropped shoulders. Boxy chest. Cropped waist. Designed to sit perfectly on the hip, elongating the legs while providing a powerful silhouette.
                                </p>
                            </div>

                            <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-8">
                                <div>
                                    <span className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Model Height</span>
                                    <span className="font-medium">6'1" (185cm)</span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Wearing Size</span>
                                    <span className="font-medium">Large (L)</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative aspect-square sm:aspect-[4/3] bg-gray-200 overflow-hidden"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=2070"
                            alt="Fabric Detail Close-up"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold">450 GSM Cotton</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
