"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Simple analytics tracking - in production, replace with Google Analytics or similar
interface PageViewEvent {
    path: string;
    timestamp: Date;
    referrer: string;
}

interface CartEvent {
    type: "add" | "remove" | "checkout";
    productId?: string;
    quantity?: number;
    total?: number;
    timestamp: Date;
}

class Analytics {
    private static instance: Analytics;
    private pageViews: PageViewEvent[] = [];
    private cartEvents: CartEvent[] = [];

    private constructor() {
        // Load from localStorage on init
        if (typeof window !== "undefined") {
            const savedPageViews = localStorage.getItem("zodak_analytics_pageviews");
            const savedCartEvents = localStorage.getItem("zodak_analytics_cart");
            if (savedPageViews) this.pageViews = JSON.parse(savedPageViews);
            if (savedCartEvents) this.cartEvents = JSON.parse(savedCartEvents);
        }
    }

    static getInstance(): Analytics {
        if (!Analytics.instance) {
            Analytics.instance = new Analytics();
        }
        return Analytics.instance;
    }

    trackPageView(path: string) {
        const event: PageViewEvent = {
            path,
            timestamp: new Date(),
            referrer: typeof document !== "undefined" ? document.referrer : ""
        };
        this.pageViews.push(event);
        this.save();
        console.log("[Analytics] Page View:", path);
    }

    trackCartEvent(type: "add" | "remove" | "checkout", data?: { productId?: string; quantity?: number; total?: number }) {
        const event: CartEvent = {
            type,
            ...data,
            timestamp: new Date()
        };
        this.cartEvents.push(event);
        this.save();
        console.log("[Analytics] Cart Event:", type, data);
    }

    getStats() {
        return {
            totalPageViews: this.pageViews.length,
            uniquePaths: [...new Set(this.pageViews.map(p => p.path))].length,
            cartAdds: this.cartEvents.filter(e => e.type === "add").length,
            checkouts: this.cartEvents.filter(e => e.type === "checkout").length,
            conversionRate: this.pageViews.length > 0
                ? ((this.cartEvents.filter(e => e.type === "checkout").length / this.pageViews.length) * 100).toFixed(2)
                : 0
        };
    }

    private save() {
        if (typeof window !== "undefined") {
            localStorage.setItem("zodak_analytics_pageviews", JSON.stringify(this.pageViews.slice(-1000)));
            localStorage.setItem("zodak_analytics_cart", JSON.stringify(this.cartEvents.slice(-500)));
        }
    }
}

export const analytics = Analytics.getInstance();

// React hook for page view tracking
export function useAnalytics() {
    const pathname = usePathname();

    useEffect(() => {
        analytics.trackPageView(pathname);
    }, [pathname]);

    return analytics;
}

// Provider component
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    useAnalytics();
    return <>{ children } </>;
}
