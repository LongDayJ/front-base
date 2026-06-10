"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/context/auth/auth.context";
import { mockAuthService } from "@/services/auth/mockAuthService";

export default function AuthWrapper({ children }: { children: ReactNode }) {
    const router = useRouter();

    return (
        <AuthProvider
            authService={mockAuthService}
            onLoginSuccess={() => router.push("/module")}
            onLogoutSuccess={() => router.push("/")}
        >
            {children}
        </AuthProvider>
    );
}
