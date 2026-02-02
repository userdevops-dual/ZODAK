"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 overflow-hidden relative">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-neutral-950 via-black to-neutral-900 opacity-40" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md space-y-10 relative z-10 p-8 sm:p-10 border border-neutral-900 bg-black/50 backdrop-blur-xl"
            >
                {/* Logo */}
                <div className="text-center space-y-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Link href="/" className="text-4xl md:text-5xl font-black tracking-tighter text-white mix-blend-difference hover:opacity-80 transition-opacity">
                            ZODAK
                        </Link>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-[10px] uppercase tracking-[0.3em] text-neutral-400"
                    >
                        Member Access
                    </motion.p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-red-950/30 border border-red-900/50 text-red-400 text-xs p-3 text-center tracking-wide"
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="space-y-2 group">
                            <Label className="text-[9px] uppercase tracking-[0.2em] font-medium text-neutral-400 group-focus-within:text-white transition-colors">
                                Email
                            </Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-none bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-white focus:bg-black h-12 text-sm tracking-wider transition-all duration-300"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-2 group">
                            <div className="flex justify-between items-center">
                                <Label className="text-[9px] uppercase tracking-[0.2em] font-medium text-neutral-400 group-focus-within:text-white transition-colors">
                                    Password
                                </Label>
                                <Link href="/forgot-password" className="text-[9px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                                    Forgot?
                                </Link>
                            </div>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="rounded-none bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-white focus:bg-black h-12 text-sm tracking-wider transition-all duration-300"
                                placeholder="••••••••"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-white text-black hover:bg-neutral-200 rounded-none uppercase tracking-[0.2em] text-[10px] font-bold transition-all duration-300 transform hover:tracking-[0.25em]"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                        </Button>
                    </motion.div>
                </form>

                {/* Footer Links */}
                <motion.div
                    className="space-y-6 pt-6 border-t border-neutral-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <div className="text-center">
                        <p className="text-xs text-neutral-500">
                            New to Zodak?{" "}
                            <Link href="/signup" className="text-white ml-2 font-bold uppercase tracking-wider text-[10px] hover:underline hover:text-neutral-300 transition-colors">
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
