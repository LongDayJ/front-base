"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

export interface DevUserProfile {
    id: string;
    name: string;
    initials: string;
    color: string;
    permissions: string[];
}

export const DEV_USER_PROFILES: DevUserProfile[] = [
    {
        id: "admin",
        name: "Administrador",
        initials: "AD",
        color: "#6366f1",
        permissions: ["ler", "escrever", "configurar"],
    },
    {
        id: "colaborador",
        name: "Colaborador",
        initials: "CO",
        color: "#10b981",
        permissions: ["ler", "escrever"],
    },
    {
        id: "leitor",
        name: "Leitor",
        initials: "LE",
        color: "#f59e0b",
        permissions: ["ler"],
    },
];

const STORAGE_KEY = "dev-user-profile";
const PERMISSIONS_KEY = "dev-user-permissions";

interface DevUserContextData {
    activeProfile: DevUserProfile;
    setProfile: (id: string) => void;
    profiles: DevUserProfile[];
}

const DevUserContext = createContext<DevUserContextData>({} as DevUserContextData);

export function DevUserProvider({ children }: { children: ReactNode }) {
    const [activeProfile, setActiveProfile] = useState<DevUserProfile>(DEV_USER_PROFILES[0]);

    useEffect(() => {
        const savedId = localStorage.getItem(STORAGE_KEY);
        const found = DEV_USER_PROFILES.find((p) => p.id === savedId);
        if (found) {
            setActiveProfile(found);
            localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(found.permissions));
        }
    }, []);

    const setProfile = useCallback((id: string) => {
        const found = DEV_USER_PROFILES.find((p) => p.id === id);
        if (!found) return;
        setActiveProfile(found);
        localStorage.setItem(STORAGE_KEY, id);
        localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(found.permissions));
    }, []);

    return (
        <DevUserContext.Provider value={{ activeProfile, setProfile, profiles: DEV_USER_PROFILES }}>
            {children}
        </DevUserContext.Provider>
    );
}

export function useDevUser() {
    return useContext(DevUserContext);
}
