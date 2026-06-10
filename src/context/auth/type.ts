import { ReactNode } from "react";

export interface AuthResponse {
    status: boolean;
    message?: string;
}

export interface AuthService<TUser = Record<string, unknown>> {
    login: (email: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<AuthResponse>;
    getUser: () => TUser | null;
}

export interface AuthContextData<TUser = Record<string, unknown>> {
    user: TUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<AuthResponse>;
}

export interface AuthProviderProps<TUser = Record<string, unknown>> {
    children: ReactNode;
    authService: AuthService<TUser>;
    onLoginSuccess?: (user: TUser) => void;
    onLogoutSuccess?: () => void;
}
