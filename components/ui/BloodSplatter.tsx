"use client";

import { useEffect, useRef } from "react";

export function BloodSplatter() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        // Particles array
        const particles: Particle[] = [];
        const particleCount = 6; // Reduced to 6 for better performance

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas));
        }



        // Animation loop
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw(ctx);
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-overlay"
            style={{ filter: "blur(20px)", willChange: "transform" }} // Add blur and hardware acceleration hint
        />
    );
}

class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Random size between 1 and 4
        this.speedX = Math.random() * 0.5 - 0.25; // Slow horizontal movement
        this.speedY = Math.random() * 0.5 - 0.25; // Slow vertical movement
        this.opacity = Math.random() * 0.5 + 0.1; // Random opacity
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(180, 0, 0, ${this.opacity})`; // Dark red color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add a "flow" trail effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(139, 0, 0, 0.5)";
    }
}
