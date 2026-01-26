"use client";

import Link from "next/link";
import { Mail, ChevronRight, ArrowUp } from "lucide-react";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-neutral-950 text-white">

            {/* Mobile Footer - Clean Accordion Style */}
            <div className="md:hidden">
                {/* Brand Header */}
                <div className="px-5 py-8 text-center border-b border-neutral-800">
                    <Link href="/">
                        <h2 className="text-lg font-black tracking-[0.3em] mb-2">ZODAK</h2>
                    </Link>
                    <p className="text-neutral-500 text-xs tracking-wide">Redefining Modern Fashion</p>
                </div>

                {/* Links List */}
                <div className="divide-y divide-neutral-800">
                    <Link href="/shop" className="flex items-center justify-between px-5 py-4 hover:bg-neutral-900 transition-colors">
                        <span className="text-sm">Shop All</span>
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                    </Link>
                    <Link href="/shop" className="flex items-center justify-between px-5 py-4 hover:bg-neutral-900 transition-colors">
                        <span className="text-sm">Hoods</span>
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                    </Link>
                    <Link href="/about" className="flex items-center justify-between px-5 py-4 hover:bg-neutral-900 transition-colors">
                        <span className="text-sm">About Us</span>
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                    </Link>
                    <Link href="/contact" className="flex items-center justify-between px-5 py-4 hover:bg-neutral-900 transition-colors">
                        <span className="text-sm">Contact</span>
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                    </Link>
                </div>

                {/* Social & Contact */}
                <div className="px-5 py-6 border-t border-neutral-800">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 mb-4">Follow Us</p>
                    <div className="flex items-center gap-6">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Email */}
                <div className="px-5 py-4 border-t border-neutral-800">
                    <a href="mailto:hello@zodak.com" className="flex items-center gap-3 text-sm text-neutral-400">
                        <Mail className="w-4 h-4" />
                        hello@zodak.com
                    </a>
                </div>

                {/* Copyright */}
                <div className="px-5 py-4 border-t border-neutral-800 flex items-center justify-between">
                    <p className="text-[10px] text-neutral-600">© {new Date().getFullYear()} ZODAK</p>
                    <button onClick={scrollToTop} className="text-[10px] text-neutral-600 flex items-center gap-1">
                        Top <ArrowUp className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Desktop Footer - Full Layout */}
            <div className="hidden md:block">
                <div className="container mx-auto px-6 py-16 lg:py-20">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div>
                            <Link href="/">
                                <h2 className="text-2xl font-black tracking-[0.3em] mb-4">ZODAK</h2>
                            </Link>
                            <p className="text-neutral-400 text-sm mb-4">Redefining Modern Fashion</p>
                            <p className="text-neutral-500 text-xs leading-relaxed mb-6">
                                Premium quality clothing crafted for the modern individual.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Shop */}
                        <div>
                            <h3 className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-6">Shop</h3>
                            <ul className="space-y-3">
                                <li><Link href="/shop" className="text-sm text-neutral-300 hover:text-white transition-colors">All Products</Link></li>
                                <li><Link href="/shop" className="text-sm text-neutral-300 hover:text-white transition-colors">Hoods</Link></li>
                                <li><Link href="/shop?category=oversized" className="text-sm text-neutral-300 hover:text-white transition-colors">Oversized</Link></li>
                                <li><Link href="/shop?category=heavyweight" className="text-sm text-neutral-300 hover:text-white transition-colors">Heavyweight</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-6">Company</h3>
                            <ul className="space-y-3">
                                <li><Link href="/about" className="text-sm text-neutral-300 hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="text-sm text-neutral-300 hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="/account" className="text-sm text-neutral-300 hover:text-white transition-colors">My Account</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-6">Contact</h3>
                            <ul className="space-y-3">
                                <li><a href="mailto:hello@zodak.com" className="text-sm text-neutral-300 hover:text-white transition-colors">hello@zodak.com</a></li>
                                <li><a href="tel:+15550000000" className="text-sm text-neutral-300 hover:text-white transition-colors">+1 (555) 000-0000</a></li>
                                <li><span className="text-sm text-neutral-300">New York, NY</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Desktop Bottom */}
                <div className="border-t border-neutral-800">
                    <div className="container mx-auto px-6 py-6 flex items-center justify-between">
                        <p className="text-xs text-neutral-500">© {new Date().getFullYear()} ZODAK · All rights reserved</p>
                        <button onClick={scrollToTop} className="text-xs text-neutral-500 hover:text-white transition-colors flex items-center gap-1.5">
                            Back to top <ArrowUp className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
