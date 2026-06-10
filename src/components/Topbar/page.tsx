"use client";
import { useEffect, useState } from "react";
import {
    IconButton,
    SessionTimer,
    TopbarBrand,
    TopbarContainer,
    TopbarLogo,
    TopbarName,
    TopbarRight,
    TopbarSub,
    UserAvatar,
    UserInfo,
    UserName,
    UserRole,
} from "./styled";
import { useAuth } from "@/context/auth/auth.context";
import { useAlert } from "@/providers/alert/page";
import { LoadingContainer } from "../module/styled";

function formatCountdown(ms: number): string {
    const total = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(total / 60).toString().padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

export default function Topbar() {
    const { user, isLoading, logout } = useAuth();
    const { callMessage } = useAlert();
    const [remaining, setRemaining] = useState<number | null>(null);

    useEffect(() => {
        if (!user?.expiresAt) return;

        const tick = () => {
            const r = user.expiresAt! - Date.now();
            setRemaining(r);
            if (r <= 0) logout();
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [user?.expiresAt]);

    if (isLoading) return <LoadingContainer />;

    const name = user?.name ?? "Desconhecido";
    const surname = user?.surname ?? "";
    const role = user?.permission ?? "Desconhecido";
    const warning = remaining !== null && remaining < 5 * 60 * 1000;

    const getInitials = (name?: string, surname?: string) => {
        const n = name?.[0]?.toUpperCase() ?? "";
        const s = surname?.[0]?.toUpperCase() ?? "";
        return `${n}${s}`;
    };

    async function handleLogout() {
        const r = await logout();
        if (!r.status) callMessage(r.message ?? "Erro ao sair", "error");
    }

    return (
        <TopbarContainer>
            <TopbarBrand>
                <TopbarLogo>MS</TopbarLogo>
                <div>
                    <TopbarName>Front base</TopbarName>
                    <TopbarSub>base de código para o front-end</TopbarSub>
                </div>
            </TopbarBrand>

            <TopbarRight>
                {remaining !== null && (
                    <SessionTimer $warning={warning}>
                        <span>{formatCountdown(remaining)}</span>
                        <span>Sessão</span>
                    </SessionTimer>
                )}

                <UserInfo>
                    <UserAvatar>{getInitials(user?.name, user?.surname)}</UserAvatar>
                    <div>
                        <UserName>{`${name} ${surname}`.trim()}</UserName>
                        <UserRole>{role}</UserRole>
                    </div>
                </UserInfo>

                <IconButton onClick={handleLogout} title="Sair">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </IconButton>
            </TopbarRight>
        </TopbarContainer>
    );
}
