"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { AuthContextData, AuthProviderProps } from "./type";

export interface User {
    id: string;
    name: string;
    surname?: string;
    email: string;
    role?: string;
    permission?: string;
    expiresAt?: number;
}

export function createAuthContext<TUser = Record<string, unknown>>() {
    const AuthContext = createContext<AuthContextData<TUser>>({} as AuthContextData<TUser>);

    function AuthProvider({
        children,
        authService,
        onLoginSuccess,
        onLogoutSuccess,
    }: AuthProviderProps<TUser>) {
        const [isLoading, setIsLoading] = useState(true);
        const [user, setUser] = useState<TUser | null>(null);

        useEffect(() => {
            const stored = authService.getUser();
            setUser(stored);
            setIsLoading(false);
        }, [authService]);

        const login = useCallback(
            async (email: string, password: string) => {
                const response = await authService.login(email, password);

                if (response.status) {
                    const userData = authService.getUser();
                    setUser(userData);
                    if (userData) onLoginSuccess?.(userData);
                }

                return response;
            },
            [authService, onLoginSuccess]
        );

        const logout = useCallback(async () => {
            const response = await authService.logout();

            if (response.status) {
                setUser(null);
                onLogoutSuccess?.();
            }

            return response;
        }, [authService, onLogoutSuccess]);

        return (
            <AuthContext.Provider
                value={{
                    user,
                    isAuthenticated: !!user,
                    isLoading,
                    login,
                    logout,
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    }

    function useAuth() {
        return useContext(AuthContext);
    }

    return { AuthProvider, useAuth };
}

export const { AuthProvider, useAuth } = createAuthContext<User>();
