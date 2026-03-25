"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
            } else {
                setIsSuccess(true);
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
                <Check className="w-16 h-16 text-green-600 mb-6" />
                <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">Account Created!</h1>
                <p className="text-gray-500 text-sm">Redirecting to login...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-white px-4 pt-24 sm:pt-32">
            <div className="w-full max-w-sm space-y-6">
                {/* Header Section (Compact) */}
                <div className="text-center">
                    <h1 className="text-sm font-black uppercase tracking-[0.3em] text-neutral-900">Create Account</h1>
                </div>

                {/* Form (Compact) */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 text-[10px] uppercase tracking-widest p-3 text-center animate-in fade-in slide-in-from-top-1">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <Label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-500">Full Name</Label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="rounded-none border-neutral-200 focus:border-black h-11 text-xs px-4"
                            placeholder=""
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-500">Email Address</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="rounded-none border-neutral-200 focus:border-black h-11 text-xs px-4"
                            placeholder=""
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-500">Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="rounded-none border-neutral-200 focus:border-black h-11 text-xs px-4 pr-10"
                                placeholder=""
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors focus:outline-none"
                            >
                                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-500">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="rounded-none border-neutral-200 focus:border-black h-11 text-xs px-4 pr-10"
                                placeholder=""
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors focus:outline-none"
                            >
                                {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-black text-white hover:bg-neutral-800 rounded-none uppercase tracking-[0.2em] text-[10px] font-black transition-all active:scale-95"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Register"}
                        </Button>
                    </div>
                </form>

                {/* Footer Section */}
                <div className="text-center pt-6 border-t border-neutral-100">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-black font-black hover:underline ml-1">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
