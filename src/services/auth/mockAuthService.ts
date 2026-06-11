import { AuthService } from "@/context/auth/type";
import { User } from "@/context/auth/auth.context";

const USER_KEY = "user";
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutos

export const mockAuthService: AuthService<User> = {
    login: async (email: string) => {
        const parts = email.split("@")[0].split(/[._]/).map(
            (p) => p.charAt(0).toUpperCase() + p.slice(1)
        );
        const name = parts[0] ?? "Usuário";
        const surname = parts[1] ?? "";

        const user: User = {
            id: "mock-001",
            name,
            surname,
            email,
            role: "admin",
            permission: "Administrador",
            expiresAt: Date.now() + SESSION_DURATION,
        };

        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return { status: true };
    },

    logout: async () => {
        localStorage.removeItem(USER_KEY);
        return { status: true };
    },

    getUser: () => {
        try {
            const stored = localStorage.getItem(USER_KEY);
            return stored ? (JSON.parse(stored) as User) : null;
        } catch {
            return null;
        }
    },
};
