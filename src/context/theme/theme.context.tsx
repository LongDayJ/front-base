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

export function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [activeTheme, setActiveTheme] = useState<ThemeName>("padrao");

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
        if (saved && saved in THEMES) {
            setActiveTheme(saved);
        }
    }, []);

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
