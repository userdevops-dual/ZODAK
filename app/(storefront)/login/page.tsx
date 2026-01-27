"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <Link href="/" className="text-3xl font-bold tracking-[0.3em]">ZODAK</Link>
                    <p className="mt-4 text-sm uppercase tracking-widest text-gray-500">Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest font-bold">Email Address</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="rounded-none border-gray-200 focus:border-black h-14 touch-target"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label className="text-[10px] uppercase tracking-widest font-bold">Password</Label>
                            <Link href="/forgot-password" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black">
                                Forgot Password?
                            </Link>
                        </div>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="rounded-none border-gray-200 focus:border-black h-14 touch-target"
                            placeholder="••••••••"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-black text-white hover:bg-neutral-800 rounded-none uppercase tracking-[0.2em] text-xs font-bold touch-target"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                    </Button>
                </form>

                {/* Signup Link */}
                <div className="text-center pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-black font-bold uppercase tracking-wider text-xs hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>

                {/* Continue as Guest */}
                <div className="text-center">
                    <Link href="/shop" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black">
                        Continue as Guest →
                    </Link>
                </div>
            </div>
        </div>
    );
}
