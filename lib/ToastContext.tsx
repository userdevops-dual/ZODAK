"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Toast {
    id: string;
    message: string;
    type?: "success" | "error" | "info";
    action?: {
        label: string;
        onClick: () => void;
    };
    link?: {
        label: string;
        href: string;
    };
}

interface ToastContextType {
    showToast: (toast: Omit<Toast, "id">) => void;
    hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((toast: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = { ...toast, id };
        setToasts((prev) => [...prev, newToast]);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideToast(id);
        }, 5000);
    }, []);

    const hideToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 max-w-md">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.95 }}
                            className="bg-black text-white px-6 py-4 shadow-2xl flex items-center gap-4 min-w-[320px]"
                        >
                            <ShoppingCart className="w-5 h-5 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{toast.message}</p>
                                {(toast.action || toast.link) && (
                                    <div className="flex gap-3 mt-3">
                                        {toast.link && (
                                            <Link
                                                href={toast.link.href}
                                                className="text-xs uppercase tracking-wider underline underline-offset-2 hover:text-neutral-300 transition-colors"
                                            >
                                                {toast.link.label}
                                            </Link>
                                        )}
                                        {toast.action && (
                                            <button
                                                onClick={toast.action.onClick}
                                                className="text-xs uppercase tracking-wider underline underline-offset-2 hover:text-neutral-300 transition-colors"
                                            >
                                                {toast.action.label}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => hideToast(toast.id)}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
}
