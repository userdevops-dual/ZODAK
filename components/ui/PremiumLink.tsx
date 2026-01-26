"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface PremiumLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    alwaysShowStars?: boolean;
}

export function PremiumLink({ href, children, className, alwaysShowStars = false }: PremiumLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    const [isHovered, setIsHovered] = useState(false);

    // Generate positions and colors for stars (Bright Red, Pink, Yellow, Green)
    const stars = [
        { top: "-15%", left: "10%", delay: "0s", size: "10px", color: "#FF0000" }, // Bright Red
        { top: "25%", left: "-20%", delay: "0.5s", size: "8px", color: "#FF00FF" }, // Bright Pink
        { top: "75%", left: "95%", delay: "1.2s", size: "12px", color: "#FFFF00" }, // Bright Yellow
        { top: "115%", left: "45%", delay: "0.8s", size: "9px", color: "#00FF00" }, // Bright Green
        { top: "35%", left: "105%", delay: "1.5s", size: "11px", color: "#FF1493" }, // Deep Pink
    ];

    return (
        <Link
            href={href}
            className={cn(
                "relative inline-block transition-all duration-500",
                isActive ? "premium-glow-active" : "opacity-80 hover:opacity-100",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative z-10">{children}</span>

            {/* Glow Effect Background (interactive) */}
            {(isHovered || isActive) && (
                <div className="absolute inset-[-6px] bg-black/5 blur-md rounded-lg -z-0 animate-pulse transition-opacity duration-500" />
            )}

            {/* Sparkling Colorful Stars - Hover or Always Active */}
            {(isHovered || alwaysShowStars) && stars.map((star, i) => (
                <div
                    key={i}
                    className="star-animation absolute pointer-events-none"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        animationDelay: star.delay,
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-full h-full overflow-visible filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]"
                        style={{
                            fill: star.color,
                            stroke: "#000000",
                            strokeWidth: "1px",
                            strokeLinejoin: "round"
                        }}
                    >
                        <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
                    </svg>
                </div>
            ))}
        </Link>
    );
}
