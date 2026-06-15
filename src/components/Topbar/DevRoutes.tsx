"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    DevRoutesBtn,
    DevRoutesDropdown,
    DevRoutesItem,
    DevRoutesWrapper,
} from "./styled";

type Route = { label: string; path: string };

const APP_ROUTES: Route[] = [
    { label: "Home", path: "/" },
    { label: "Login2", path: "/login2" },
    { label: "Dev", path: "/dev" },
    { label: "Cards", path: "/cards" },
    { label: "Tabela", path: "/tabela" },
    { label: "Mapa", path: "/mapa" },
    { label: "Loading", path: "/loading-preview" },
];

export function DevRoutes() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <DevRoutesWrapper ref={wrapperRef}>
            <DevRoutesBtn $open={open} onClick={() => setOpen((o) => !o)}>
                Dev Routes
            </DevRoutesBtn>
            {open && (
                <DevRoutesDropdown>
                    {APP_ROUTES.map(({ label, path }) => (
                        <DevRoutesItem
                            key={path}
                            onClick={() => {
                                router.push(path);
                                setOpen(false);
                            }}
                        >
                            {label}
                        </DevRoutesItem>
                    ))}
                </DevRoutesDropdown>
            )}
        </DevRoutesWrapper>
    );
}
