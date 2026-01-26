"use client";

import { ShieldCheck, Ruler, Snowflake, Timer } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: ShieldCheck,
        title: "Heavy GSM Fabric",
        description: "Engineered for durability and substantial feel."
    },
    {
        icon: Ruler,
        title: "Premium Stitching",
        description: "Double-needle construction for lasting wear."
    },
    {
        icon: Snowflake,
        title: "Winter Tested",
        description: "Thermal retention for extreme conditions."
    },
    {
        icon: Timer,
        title: "Limited Drops",
        description: "Small batch production. Never restocked."
    }
];

export function WhyZodakSection() {
    return (
        <section className="py-24 bg-white text-black border-b border-gray-100">
            <div className="container-mobile px-6 sm:px-12 lg:px-20 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="flex flex-col items-start space-y-4"
                        >
                            <div className="p-3 bg-gray-50 rounded-full">
                                <feature.icon className="w-6 h-6 text-black" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-[200px]">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
