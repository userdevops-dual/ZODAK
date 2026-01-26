"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
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
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <Link href="/" className="text-3xl font-bold tracking-[0.3em]">ZODAK</Link>
                    <p className="mt-4 text-sm uppercase tracking-widest text-gray-500">Create your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest font-bold">Full Name</Label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="rounded-none border-gray-200 focus:border-black h-14 touch-target"
                            placeholder="John Doe"
                        />
                    </div>

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
                        <Label className="text-[10px] uppercase tracking-widest font-bold">Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="rounded-none border-gray-200 focus:border-black h-14 touch-target"
                            placeholder="Min. 6 characters"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest font-bold">Confirm Password</Label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                    </Button>
                </form>

                {/* Login Link */}
                <div className="text-center pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-black font-bold uppercase tracking-wider text-xs hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
