"use client";

import { useFeatureFlag, useFeatureFlags } from "@/context/featureFlags/featureFlags.context";
import { useThemeContext } from "@/context/theme/theme.context";
import { useDevUser } from "@/context/devUser/devUser.context";

export default function DebugBar() {
    const show = useFeatureFlag("debug-panel");
    const { activeTheme } = useThemeContext();
    const { activeProfile } = useDevUser();
    const { flags } = useFeatureFlags();

    if (!show) return null;

    const enabledFlags = flags.filter((f) => f.enabled).map((f) => f.id);

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                background: "rgba(10, 10, 15, 0.92)",
                backdropFilter: "blur(4px)",
                color: "#4ade80",
                fontFamily: "monospace",
                fontSize: "0.7rem",
                padding: "0.35rem 1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "1.8rem",
                zIndex: 9999,
                borderTop: "1px solid rgba(74, 222, 128, 0.2)",
            }}
        >
            <span style={{ opacity: 0.5 }}>⬡ debug</span>
            <span>
                🎨 theme: <strong style={{ color: "#fff" }}>{activeTheme}</strong>
            </span>
            <span>
                👤 perfil: <strong style={{ color: "#fff" }}>{activeProfile.name}</strong>
                <span style={{ color: activeProfile.color, marginLeft: "0.4rem" }}>
                    [{activeProfile.permissions.join(", ")}]
                </span>
            </span>
            <span>
                🚩 flags:{" "}
                <strong style={{ color: enabledFlags.length ? "#facc15" : "#6b7280" }}>
                    {enabledFlags.length ? enabledFlags.join(" · ") : "nenhuma"}
                </strong>
            </span>
        </div>
    );
}
