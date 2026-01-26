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
                <div className="flex items-center gap-[4px] md:gap-[8px] overflow-hidden">
                    {["Z", "O", "D", "A", "K"].map((letter, i) => (
                        <span
                            key={i}
                            className="text-6xl md:text-9xl font-black tracking-tighter text-transparent animate-fade-in-up"
                            style={{
                                animationDelay: `${i * 150}ms`,
                                WebkitTextStroke: "0.5px black",
                                animationFillMode: "forwards"
                            }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>

                <div className="w-24 md:w-48 h-[1px] bg-black/80 opacity-0 animate-grow-width" style={{ animationDelay: "800ms" }} />
            </div>
        </div>
    );
}
