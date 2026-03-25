"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/");
                router.refresh();
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white px-4 pt-24 sm:pt-32 relative overflow-hidden">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-neutral-950 via-black to-neutral-900 opacity-40" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-sm space-y-8 relative z-10 p-6 sm:p-8 border border-neutral-900 bg-black/50 backdrop-blur-xl"
            >
                {/* Header Section (Compact) */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-sm font-black uppercase tracking-[0.3em] text-white">Member Access</h1>
                    </motion.div>
                </div>

                {/* Form (Compact) */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-red-950/30 border border-red-900/50 text-red-400 text-[10px] p-3 text-center uppercase tracking-widest"
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.div
                        className="space-y-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="space-y-1.5 group">
                            <Label className="text-[9px] uppercase tracking-[0.2em] font-medium text-neutral-400 group-focus-within:text-white transition-colors">
                                Email
                            </Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-none bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-white focus:bg-black h-11 text-xs tracking-wider transition-all duration-300 pointer-events-auto"
                            />
                        </div>

                        <div className="space-y-1.5 group">
                            <div className="flex justify-between items-center">
                                <Label className="text-[9px] uppercase tracking-[0.2em] font-medium text-neutral-400 group-focus-within:text-white transition-colors">
                                    Password
                                </Label>
                                <Link href="/forgot-password" className="text-[9px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="rounded-none bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-white focus:bg-black h-11 text-xs tracking-wider transition-all duration-300 pr-10 pointer-events-auto"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors focus:outline-none"
                                >
                                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="pt-2"
                    >
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-white text-black hover:bg-neutral-200 rounded-none uppercase tracking-[0.2em] text-[10px] font-black transition-all duration-300 transform active:scale-95"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Sign In"}
                        </Button>
                    </motion.div>
                </form>

                {/* Footer Section */}
                <motion.div
                    className="space-y-6 pt-6 border-t border-neutral-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest text-neutral-500">
                            New to Zodak?{" "}
                            <Link href="/signup" className="text-white ml-1 font-black hover:underline transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </div>

                    <div className="text-center">
                        <Link href="/shop" className="text-[9px] uppercase tracking-[0.25em] text-neutral-600 hover:text-white transition-colors inline-flex items-center gap-1 group">
                            Continue as Guest
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
