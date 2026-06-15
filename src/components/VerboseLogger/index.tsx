"use client";

import { useEffect, useRef } from "react";
import { useFeatureFlag } from "@/context/featureFlags/featureFlags.context";
import { useFeatureFlags } from "@/context/featureFlags/featureFlags.context";
import { useAuth } from "@/context/auth/auth.context";
import { useDevUser } from "@/context/devUser/devUser.context";
import { useThemeContext } from "@/context/theme/theme.context";

export default function VerboseLogger() {
    const enabled = useFeatureFlag("verbose-logging");
    const { flags } = useFeatureFlags();
    const { user, isAuthenticated } = useAuth();
    const { activeProfile } = useDevUser();
    const { activeTheme } = useThemeContext();

    const prevEnabled = useRef(false);

    useEffect(() => {
        if (!enabled) {
            if (prevEnabled.current) {
                console.log("%c[VerboseLogger] desativado", "color:#94a3b8;font-style:italic");
            }
            prevEnabled.current = false;
            return;
        }

        const isFirstActivation = !prevEnabled.current;
        prevEnabled.current = true;

        const snapshot = {
            timestamp: new Date().toISOString(),
            auth: { isAuthenticated, user },
            devUser: activeProfile,
            theme: activeTheme,
            featureFlags: Object.fromEntries(flags.map((f) => [f.id, f.enabled])),
            localStorage: (() => {
                try {
                    return Object.fromEntries(
                        Object.keys(localStorage).map((k) => {
                            try { return [k, JSON.parse(localStorage.getItem(k)!)]; }
                            catch { return [k, localStorage.getItem(k)]; }
                        })
                    );
                } catch { return {}; }
            })(),
        };

        const label = isFirstActivation
            ? "%c[VerboseLogger] ativado — snapshot de contexto"
            : "%c[VerboseLogger] contexto atualizado";

        console.log(label, "color:#f59e0b;font-weight:bold");
        console.log("%cAuth", "color:#6366f1;font-weight:bold", snapshot.auth);
        console.log("%cDev User", "color:#10b981;font-weight:bold", snapshot.devUser);
        console.log("%cTheme", "color:#06b6d4;font-weight:bold", { activeTheme: snapshot.theme });
        console.log("%cFeature Flags", "color:#f43f5e;font-weight:bold", snapshot.featureFlags);
        console.log("%cLocalStorage", "color:#a78bfa;font-weight:bold", snapshot.localStorage);
        console.groupCollapsed("%cSnapshot completo", "color:#94a3b8");
        console.log(snapshot);
        console.groupEnd();
    }, [enabled, flags, user, isAuthenticated, activeProfile, activeTheme]);

    return null;
}
