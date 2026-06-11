"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

export interface FeatureFlag {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    shortcut?: string;
}

const DEFAULT_FLAGS: FeatureFlag[] = [
    {
        id: "mock-api-errors",
        name: "Simular erros de API",
        description: "Injeta falhas aleatórias nas chamadas de serviço.",
        enabled: false,
        shortcut: "Shift+1",
    },
    {
        id: "debug-panel",
        name: "Painel de debug",
        description: "Exibe informações de estado nos componentes.",
        enabled: false,
        shortcut: "Shift+2",
    },
    {
        id: "verbose-logging",
        name: "Log detalhado",
        description: "Imprime logs completos de contexto no console.",
        enabled: false,
        shortcut: "Shift+3",
    },
];

const STORAGE_KEY = "dev:feature-flags";

interface FeatureFlagContextData {
    flags: FeatureFlag[];
    toggleFlag: (id: string) => void;
    isFlagEnabled: (id: string) => boolean;
}

const FeatureFlagContext = createContext<FeatureFlagContextData>({} as FeatureFlagContextData);

export function FeatureFlagsProvider({ children }: { children: ReactNode }) {
    const [flags, setFlags] = useState<FeatureFlag[]>(DEFAULT_FLAGS);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return;
            const savedMap: Record<string, boolean> = JSON.parse(saved);
            setFlags((prev) =>
                prev.map((f) => (f.id in savedMap ? { ...f, enabled: savedMap[f.id] } : f))
            );
        } catch {
            // ignora storage corrompido
        }
    }, []);

    const toggleFlag = useCallback((id: string) => {
        setFlags((prev) => {
            const next = prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f));
            const map = Object.fromEntries(next.map((f) => [f.id, f.enabled]));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
            return next;
        });
    }, []);

    const isFlagEnabled = useCallback(
        (id: string) => flags.find((f) => f.id === id)?.enabled ?? false,
        [flags]
    );

    return (
        <FeatureFlagContext.Provider value={{ flags, toggleFlag, isFlagEnabled }}>
            {children}
        </FeatureFlagContext.Provider>
    );
}

export function useFeatureFlags() {
    return useContext(FeatureFlagContext);
}

export function useFeatureFlag(flagId: string): boolean {
    const { isFlagEnabled } = useFeatureFlags();
    return isFlagEnabled(flagId);
}
