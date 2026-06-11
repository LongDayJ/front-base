"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { themeAzulEscuro } from "@/styles/theme.azulEscuro";
import { themeAzulClaro } from "@/styles/theme.azulClaro";
import { themeVerdeClaro } from "@/styles/theme.verdeClaro";
import { themeVermelho } from "@/styles/theme.vermelho";
import { themeAmarelo } from "@/styles/theme.amarelo";

export type ThemeName = "padrao" | "azulEscuro" | "azulClaro" | "verdeClaro" | "vermelho" | "amarelo";

const THEMES = {
    padrao: theme,
    azulEscuro: themeAzulEscuro,
    azulClaro: themeAzulClaro,
    verdeClaro: themeVerdeClaro,
    vermelho: themeVermelho,
    amarelo: themeAmarelo,
} as const;

const STORAGE_KEY = "app-theme";

interface ThemeContextData {
    activeTheme: ThemeName;
    setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

function flattenObject(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
    return Object.entries(obj).reduce((acc, [key, val]) => {
        const fullKey = prefix ? `${prefix}-${key}` : key;
        if (typeof val === "string" || typeof val === "number") {
            acc[fullKey] = String(val);
        } else if (val !== null && typeof val === "object") {
            Object.assign(acc, flattenObject(val as Record<string, unknown>, fullKey));
        }
        return acc;
    }, {} as Record<string, string>);
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [activeTheme, setActiveTheme] = useState<ThemeName>("padrao");

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
        if (saved && saved in THEMES) {
            setActiveTheme(saved);
        }
    }, []);

    useEffect(() => {
        const flat = flattenObject(THEMES[activeTheme] as unknown as Record<string, unknown>, "theme");
        Object.entries(flat).forEach(([key, val]) => {
            document.documentElement.style.setProperty(`--${key}`, val);
        });
    }, [activeTheme]);

    const setTheme = useCallback((name: ThemeName) => {
        setActiveTheme(name);
        localStorage.setItem(STORAGE_KEY, name);
    }, []);

    return (
        <ThemeContext.Provider value={{ activeTheme, setTheme }}>
            <ThemeProvider theme={THEMES[activeTheme]}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    return useContext(ThemeContext);
}
