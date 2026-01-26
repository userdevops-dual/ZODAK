
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Package } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Package, label: "Products", href: "/dashboard/products" },
    { icon: ShoppingBag, label: "Orders", href: "/dashboard/orders" },
    { icon: Users, label: "Customers", href: "/dashboard/customers" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-black text-white min-h-screen hidden md:flex flex-col border-r border-neutral-800">
            <div className="p-8 border-b border-neutral-800">
                <h1 className="text-2xl font-bold tracking-[0.2em] uppercase">ZODAK</h1>
                <span className="text-xs text-neutral-500 uppercase tracking-widest">Admin Panel</span>
            </div>

            <nav className="flex-1 p-6 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-wider transition-colors hover:text-white",
                                isActive
                                    ? "text-white bg-neutral-900 border-l-2 border-white"
                                    : "text-neutral-400 hover:bg-neutral-900/50"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-neutral-800">
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-3 px-4 py-3 w-full text-sm uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors text-left"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
