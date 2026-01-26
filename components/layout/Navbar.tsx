"use client";

import Link from "next/link";
import { ShoppingBag, Menu, User, LogOut, LayoutDashboard, ChevronLeft, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { SmartSearch } from "@/components/search/SmartSearch";
import { PremiumLink } from "@/components/ui/PremiumLink";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "./CartDrawer";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === "/";
    const { totalItems } = useCart();
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                isScrolled || !isHome
                    ? "bg-white text-black border-b border-gray-100 py-2 sm:py-3"
                    : "bg-transparent text-white py-3 sm:py-4 lg:py-5"
            )}
        >
            <div className="container-mobile mx-auto flex items-center justify-between safe-area-top">
                {/* Mobile Menu */}
                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-transparent touch-target">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 bg-white border-r">
                            <div className="flex flex-col h-full text-black">
                                <div className="p-6 border-b border-gray-100">
                                    <Link href="/" className="text-2xl font-bold tracking-[0.3em] text-black">ZODAK</Link>
                                </div>
                                <nav className="flex-1 p-6 space-y-1">
                                    {["HOODS"].map((item) => (
                                        <SheetClose asChild key={item}>
                                            <PremiumLink
                                                href="/shop"
                                                className="block py-4 text-lg uppercase tracking-widest border-b border-gray-50 text-black"
                                                alwaysShowStars
                                            >
                                                {item}
                                            </PremiumLink>
                                        </SheetClose>
                                    ))}
                                    <SheetClose asChild>
                                        <Link href="/about" className="block py-4 text-lg uppercase tracking-widest hover:pl-2 transition-all border-b border-gray-50 text-black">
                                            About
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link href="/contact" className="block py-4 text-lg uppercase tracking-widest hover:pl-2 transition-all border-b border-gray-50 text-black">
                                            Contact
                                        </Link>
                                    </SheetClose>
                                </nav>
                                <div className="p-6 border-t border-gray-100 space-y-3">
                                    {session?.user ? (
                                        <>
                                            <SheetClose asChild>
                                                <Link href="/account" className="block w-full py-3 text-center border border-black uppercase tracking-widest text-sm">
                                                    My Account
                                                </Link>
                                            </SheetClose>
                                            <button
                                                onClick={() => signOut({ callbackUrl: "/" })}
                                                className="w-full py-3 text-center border border-gray-200 uppercase tracking-widest text-sm text-gray-500"
                                            >
                                                Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <SheetClose asChild>
                                                <Link href="/login" className="block w-full py-3 text-center bg-black text-white uppercase tracking-widest text-sm">
                                                    Sign In
                                                </Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/signup" className="block w-full py-3 text-center border border-black uppercase tracking-widest text-sm">
                                                    Create Account
                                                </Link>
                                            </SheetClose>
                                        </>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Logo */}
                <div className="flex items-center">
                    <AnimatePresence>
                        {(!isHome || isScrolled) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link href="/" className="text-lg md:text-2xl font-bold tracking-[0.3em]">
                                    ZODAK
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {["HOODS"].map((item) => (
                        <PremiumLink
                            key={item}
                            href="/shop"
                            className="text-sm uppercase tracking-widest font-medium"
                            alwaysShowStars
                        >
                            {item}
                        </PremiumLink>
                    ))}
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
                    <SmartSearch />

                    {/* Admin Link - Only for Admins */}
                    {(session?.user as any)?.role === "ADMIN" && (
                        <Link href="/dashboard" title="Admin Dashboard">
                            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-transparent touch-target text-red-600">
                                <LayoutDashboard className="w-5 h-5" />
                            </Button>
                        </Link>
                    )}

                    {/* User Icon - Desktop */}
                    {session?.user ? (
                        <Link href="/account">
                            <Button variant="ghost" size="icon" className="md:flex hidden hover:bg-transparent touch-target">
                                <User className="w-5 h-5" />
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button variant="ghost" size="icon" className="md:flex hidden hover:bg-transparent touch-target">
                                <User className="w-5 h-5" />
                            </Button>
                        </Link>
                    )}

                    <div className="hidden md:block">
                        <CartDrawer />
                    </div>
                </div>
            </div>
        </header>
    );
}
