"use client";

import { CartProvider } from "@/lib/CartContext";
import { SessionProvider } from "next-auth/react";
import { AnalyticsProvider } from "@/lib/analytics";
import { ThemeProvider } from "@/lib/ThemeContext";
import { ToastProvider } from "@/lib/ToastContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider>
                <CartProvider>
                    <ToastProvider>
                        <AnalyticsProvider>
                            {children}
                        </AnalyticsProvider>
                    </ToastProvider>
                </CartProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
