"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: Search },
    { name: "Cart", href: "/cart", icon: ShoppingBag, showBadge: true },
    { name: "Account", href: "/account", icon: User },
];

export function MobileBottomNav() {
    const pathname = usePathname();
    const { totalItems } = useCart();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 md:hidden">
            <div className="flex items-center justify-around h-14 max-w-md mx-auto px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href === "/shop" && pathname.startsWith("/product"));

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center px-3 py-1.5",
                                "transition-colors duration-200",
                                isActive ? "text-black" : "text-gray-400"
                            )}
                        >
                            <div className="relative">
                                <item.icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />

                                {/* Cart Badge */}
                                {item.showBadge && totalItems > 0 && (
                                    <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                        {totalItems > 9 ? "9+" : totalItems}
                                    </span>
                                )}
                            </div>

                            <span className={cn(
                                "text-[9px] mt-0.5 tracking-wide",
                                isActive ? "font-semibold" : "font-normal"
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
