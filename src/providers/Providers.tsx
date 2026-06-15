"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { ThemeContextProvider } from "@/context/theme/theme.context";
import { AlertProvider } from "@/providers/alert/page";
import AuthWrapper from "@/providers/AuthWrapper";
import { DevUserProvider } from "@/context/devUser/devUser.context";
import { FeatureFlagsProvider } from "@/context/featureFlags/featureFlags.context";
import DebugBar from "@/components/DebugBar/page";
import VerboseLogger from "@/components/VerboseLogger";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [styledSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledSheet.getStyleElement();
        styledSheet.instance.clearTag();
        return <>{styles}</>;
    });

    const content = (
        <ThemeContextProvider>
            <AlertProvider>
                <DevUserProvider>
                    <FeatureFlagsProvider>
                        <AuthWrapper>{children}</AuthWrapper>
                        <DebugBar />
                        <VerboseLogger />
                    </FeatureFlagsProvider>
                </DevUserProvider>
            </AlertProvider>
        </ThemeContextProvider>
    );

    if (typeof window !== "undefined") {
        return content;
    }

    return (
        <StyleSheetManager sheet={styledSheet.instance}>
            {content}
        </StyleSheetManager>
    );
}
