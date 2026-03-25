"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Crown, Star, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function MemberPlusPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black pt-20 overflow-hidden relative">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-[#D4AF37]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-[#D4AF37]/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            </div>

            <main className="relative z-10 container mx-auto px-4 py-12 lg:py-24">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center space-y-8 mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-md"
                        >
                            <Crown className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37]">The Inner Circle</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter"
                        >
                            MEMBER <span className="text-[#D4AF37] relative inline-block">
                                +
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -top-4 -right-4"
                                >
                                    <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                                </motion.span>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed uppercase tracking-widest font-medium"
                        >
                            Exclusivity refined. Own any Zodak Hoodie to unlock a lifetime of prestige and performance.
                        </motion.p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                        {[
                            {
                                icon: <Star className="w-6 h-6" />,
                                title: "10% Lifetime Discount",
                                desc: "Every subsequent purchase, automatically applied to your elite status."
                            },
                            {
                                icon: <ShieldCheck className="w-6 h-6" />,
                                title: "Priority Access",
                                desc: "Be the first to secure limited drops and seasonal collection capsules."
                            },
                            {
                                icon: <Crown className="w-6 h-6" />,
                                title: "Bespoke Packaging",
                                desc: "Your orders arrive in exclusive Member+ black & gold premium boxing."
                            }
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                                className="group p-8 border border-neutral-900 bg-neutral-950/50 backdrop-blur-md hover:border-[#D4AF37]/50 transition-all duration-500"
                            >
                                <div className="text-[#D4AF37] mb-6 transform group-hover:scale-110 transition-transform duration-500">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-white">
                                    {benefit.title}
                                </h3>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-loose">
                                    {benefit.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="relative group overflow-hidden border border-[#D4AF37]/20 bg-gradient-to-br from-neutral-950 to-black p-12 text-center"
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] mb-6">How to Join</h2>
                        <p className="text-neutral-400 text-xs uppercase tracking-[0.25em] mb-10 max-w-lg mx-auto leading-loose">
                            Purchase any <span className="text-white font-black">Zodak Hoodie</span> to instantly upgrade your account to Member+ status.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild className="h-16 px-12 bg-[#D4AF37] text-black hover:bg-[#B8860B] rounded-none uppercase tracking-[0.3em] font-black text-[10px] transition-all relative overflow-hidden group">
                                <Link href="/shop?category=hoodies">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Browse Hoodies <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="h-16 px-12 border-neutral-800 text-white hover:bg-neutral-900 rounded-none uppercase tracking-[0.3em] font-black text-[10px]">
                                <Link href="/login">Verify Status</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Floating Ornamental Elements */}
            <div className="absolute top-1/2 left-10 w-px h-64 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent opacity-50" />
            <div className="absolute top-1/2 right-10 w-px h-64 bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent opacity-50" />
        </div>
    );
}
