"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Loader() {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = "auto";

            // Allow exit animation to finish before removing from DOM
            setTimeout(() => {
                setShouldRender(false);
            }, 800);
        }, 2500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!shouldRender) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-700",
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-[2px] md:gap-[4px] overflow-hidden">
                    {["Z", "O", "D", "A", "K"].map((letter, i) => (
                        <span
                            key={i}
                            className="text-4xl md:text-6xl font-bold tracking-[0.1em] opacity-0 animate-fade-in-up"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>

                <div className="w-16 md:w-24 h-[1px] bg-black/80 opacity-0 animate-grow-width" style={{ animationDelay: "800ms" }} />
            </div>
        </div>
    );
}
