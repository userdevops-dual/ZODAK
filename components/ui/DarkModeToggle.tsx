"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { cn } from "@/lib/utils";

export function DarkModeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);

        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check initial scroll position

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent hydration mismatch - render nothing on server
    if (!isMounted) {
        return null;
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "fixed bottom-20 md:bottom-8 right-4 md:right-6 z-50",
                "w-12 h-12 rounded-full",
                "flex items-center justify-center",
                "transition-all duration-500 ease-out",
                "shadow-lg hover:shadow-xl",
                isDark
                    ? "bg-white text-black"
                    : "bg-neutral-900 text-white",
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none",
                isHovered && "scale-110"
            )}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div className={cn(
                "transition-transform duration-500",
                isDark ? "rotate-0" : "rotate-180"
            )}>
                {isDark ? (
                    <Sun className="w-5 h-5" />
                ) : (
                    <Moon className="w-5 h-5" />
                )}
            </div>

            <div className={cn(
                "absolute inset-0 rounded-full transition-opacity duration-300",
                isDark ? "bg-white/20" : "bg-white/10",
                isHovered ? "opacity-100" : "opacity-0"
            )} />
        </button>
    );
}
