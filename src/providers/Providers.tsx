"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { AlertProvider } from "@/providers/alert/page";
import AuthWrapper from "@/providers/AuthWrapper";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [styledSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledSheet.getStyleElement();
        styledSheet.instance.clearTag();
        return <>{styles}</>;
    });

    const content = (
        <ThemeProvider theme={theme}>
            <AlertProvider>
                <AuthWrapper>{children}</AuthWrapper>
            </AlertProvider>
        </ThemeProvider>
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
