"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function FinalCtaSection() {
    return (
        <section className="py-16 lg:py-32 bg-black text-white text-center relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 lg:space-y-8"
                >
                    <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
                        Own The<br />Season.
                    </h2>

                    <p className="text-neutral-400 uppercase tracking-[0.4em] text-[10px] sm:text-sm font-black">
                        Limited drops. Global shipping.
                    </p>

                    <div className="pt-6">
                        <Button
                            asChild
                            className="bg-white text-black hover:bg-neutral-200 rounded-none h-10 md:h-14 px-4 md:px-10 text-[10px] md:text-sm uppercase tracking-[0.2em] font-black transition-all hover:scale-105 w-48 sm:w-auto mx-auto"
                        >
                            <Link href="/shop">Shop Zodak Hoodies</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
