"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Package, User, LogOut, Settings, Heart, Loader2, ChevronLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Order {
    id: string;
    total: number;
    status: string;
    createdAt: string;
    items: { quantity: number; price: number; product: { name: string } }[];
}

export default function AccountPage() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            fetchOrders();
        }
    }, [session]);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            if (res.ok) {
                const data = await res.json();
                setOrders(data.slice(0, 5)); // Show last 5 orders
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
                <User className="w-16 h-16 text-gray-300 mb-6" />
                <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">Sign In Required</h1>
                <p className="text-gray-500 mb-8">Please sign in to view your account</p>
                <div className="flex gap-4">
                    <Button asChild className="rounded-none bg-black text-white px-8 py-6 uppercase tracking-widest">
                        <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-none px-8 py-6 uppercase tracking-widest">
                        <Link href="/signup">Create Account</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-16 bg-white">
            <div className="container-mobile mx-auto max-w-5xl px-4">
                {/* Navigation Buttons */}
                <div className="flex items-center gap-4 mb-8">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                        className="text-[10px] uppercase tracking-widest h-8 px-2 hover:bg-neutral-100 flex items-center gap-1"
                    >
                        <ChevronLeft className="w-3 h-3" />
                        Back
                    </Button>
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-[10px] uppercase tracking-widest h-8 px-2 hover:bg-neutral-100 flex items-center gap-1"
                    >
                        <Link href="/">
                            <Home className="w-3 h-3" />
                            Home
                        </Link>
                    </Button>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 pb-8 border-b border-gray-100">
                    <div>
                        <h1 className="text-3xl font-bold uppercase tracking-[0.1em]">My Account</h1>
                        <p className="text-gray-500 mt-1">Welcome back, {session.user.name || session.user.email}</p>
                    </div>
                    <Button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        variant="outline"
                        className="rounded-none uppercase tracking-widest text-xs"
                    >
                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="space-y-2">
                        <button className="w-full flex items-center gap-3 p-4 bg-black text-white text-sm uppercase tracking-wider">
                            <Package className="w-4 h-4" /> Orders
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-sm uppercase tracking-wider">
                            <Heart className="w-4 h-4" /> Wishlist
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-sm uppercase tracking-wider">
                            <Settings className="w-4 h-4" /> Settings
                        </button>
                    </div>

                    {/* Orders */}
                    <div className="lg:col-span-2">
                        <h2 className="text-lg font-bold uppercase tracking-widest mb-6">Recent Orders</h2>

                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="w-6 h-6 animate-spin" />
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-12 border border-dashed border-gray-200">
                                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No orders yet</p>
                                <Button asChild className="mt-4 rounded-none bg-black text-white uppercase tracking-widest">
                                    <Link href="/shop">Start Shopping</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="border border-gray-100 p-4 sm:p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-400">Order #{order.id.slice(0, 8)}</p>
                                                <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`text-[10px] uppercase tracking-widest px-3 py-1 ${order.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                                                order.status === "SHIPPED" ? "bg-blue-100 text-blue-700" :
                                                    "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">
                                            {order.items.length} item(s)
                                        </div>
                                        <div className="text-lg font-bold">${Number(order.total).toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
