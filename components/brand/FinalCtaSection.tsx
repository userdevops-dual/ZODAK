"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function FinalCtaSection() {
    return (
        <section className="py-32 bg-black text-white text-center relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
                        Own The<br />Season.
                    </h2>

                    <p className="text-neutral-400 uppercase tracking-[0.4em] text-xs sm:text-sm font-medium">
                        Limited drops. Global shipping.
                    </p>

                    <div className="pt-8">
                        <Button
                            asChild
                            className="bg-white text-black hover:bg-red-600 hover:text-white rounded-none h-14 px-10 text-sm uppercase tracking-widest font-bold transition-all hover:scale-105"
                        >
                            <Link href="/shop">Shop Zodak Hoodies</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
