"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        // Get saved theme from localStorage
        const saved = localStorage.getItem("zodak-theme") as Theme | null;
        if (saved && (saved === "light" || saved === "dark")) {
            setTheme(saved);
            applyTheme(saved);
        }
    }, []);

    const applyTheme = (newTheme: Theme) => {
        const html = document.documentElement;
        if (newTheme === "dark") {
            html.classList.add("dark");
            html.style.colorScheme = "dark";
        } else {
            html.classList.remove("dark");
            html.style.colorScheme = "light";
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("zodak-theme", newTheme);
        applyTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
