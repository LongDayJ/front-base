"use client";
import { useEffect, useRef, useState } from "react";
import {
    DropdownChevron,
    DropdownDivider,
    DropdownLogoutBtn,
    DropdownMenu,
    DropdownMobileUserInfo,
    SessionTimer,
    TopbarBrand,
    TopbarContainer,
    TopbarLogo,
    TopbarName,
    TopbarRight,
    TopbarSub,
    UserAvatar,
    UserDropdownWrapper,
    UserInfo,
    UserName,
    UserRole,
    UserTextInfo,
} from "./styled";
import { useAuth } from "@/context/auth/auth.context";
import { useAlert } from "@/providers/alert/page";
import { LoadingContainer } from "../module/styled";
import { DevRoutes } from "./DevRoutes";
import { useDevUser } from "@/context/devUser/devUser.context";

function formatCountdown(ms: number): string {
    const total = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(total / 60).toString().padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

function getInitials(name?: string, surname?: string) {
    return `${name?.[0]?.toUpperCase() ?? ""}${surname?.[0]?.toUpperCase() ?? ""}`;
}

export default function Topbar() {
    const { user, isLoading, logout } = useAuth();
    const { callMessage } = useAlert();
    const { activeProfile } = useDevUser();
    const [remaining, setRemaining] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (!dropdownOpen) return;
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    if (isLoading) return <LoadingContainer />;

    const name = user?.name ?? "Desconhecido";
    const surname = user?.surname ?? "";
    const role = process.env.NODE_ENV === "development"
        ? activeProfile.name
        : (user?.permission ?? "Desconhecido");
    const warning = remaining !== null && remaining < 5 * 60 * 1000;

    async function handleLogout() {
        setDropdownOpen(false);
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
                {process.env.NODE_ENV === "development" && <DevRoutes />}

                {remaining !== null && (
                    <SessionTimer $warning={warning}>
                        <span>{formatCountdown(remaining)}</span>
                        <span>Sessão</span>
                    </SessionTimer>
                )}

                <UserDropdownWrapper ref={wrapperRef}>
                    <UserInfo
                        $open={dropdownOpen}
                        onClick={() => setDropdownOpen((o) => !o)}
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                    >
                        <UserAvatar>{getInitials(user?.name, user?.surname)}</UserAvatar>
                        <UserTextInfo>
                            <UserName>{`${name} ${surname}`.trim()}</UserName>
                            <UserRole>{role}</UserRole>
                        </UserTextInfo>
                        <DropdownChevron $open={dropdownOpen}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </DropdownChevron>
                    </UserInfo>

                    {dropdownOpen && (
                        <DropdownMenu>
                            <DropdownMobileUserInfo>
                                <UserName>{`${name} ${surname}`.trim()}</UserName>
                                <UserRole>{role}</UserRole>
                            </DropdownMobileUserInfo>
                            <DropdownDivider />
                            <DropdownLogoutBtn onClick={handleLogout}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Sair da sessão
                            </DropdownLogoutBtn>
                        </DropdownMenu>
                    )}
                </UserDropdownWrapper>
            </TopbarRight>
        </TopbarContainer>
    );
}
