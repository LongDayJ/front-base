"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
    CopyBtn,
    CSSCard,
    CSSCardDescription,
    CSSCardHeader,
    CSSCardIcon,
    CSSCardTitle,
    CSSHeaderText,
    ColorSwatch,
    EmptyState,
    SearchInput,
    Tab,
    TabBadge,
    TabsRow,
    TokenList,
    TokenName,
    TokenRow,
    TokenValue,
} from "./styled";

interface CSSToken {
    name: string;
    value: string;
    category: "color" | "spacing" | "typography" | "border" | "other";
}

type Category = CSSToken["category"] | "all";

const CATEGORIES: { key: Category; label: string }[] = [
    { key: "all",        label: "Todos"       },
    { key: "color",      label: "Cores"       },
    { key: "typography", label: "Tipografia"  },
    { key: "spacing",    label: "Espaçamento" },
    { key: "border",     label: "Borda"       },
    { key: "other",      label: "Outros"      },
];

const COLOR = "#f43f5e";

function categorize(name: string, value: string): CSSToken["category"] {
    const v = value.trim();
    const n = name.toLowerCase();

    if (
        /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v) ||
        /^rgba?\s*\(/i.test(v) ||
        /^hsla?\s*\(/i.test(v)
    ) return "color";

    if (
        n.includes("font") ||
        n.includes("size") ||
        v.includes("clamp(") ||
        v.includes("system-ui") ||
        v.includes("monospace") ||
        v.includes("sans-serif") ||
        /^\d{3,4}$/.test(v)
    ) return "typography";

    if (/^-?\d*\.?\d+(px|rem|em|%|vw|vh|dvw|dvh)$/.test(v)) return "spacing";

    if (n.includes("border") || n.includes("radius") || n.includes("outline")) return "border";

    return "other";
}

function readTokens(): CSSToken[] {
    const styles = getComputedStyle(document.documentElement);
    const tokens: CSSToken[] = [];

    for (let i = 0; i < styles.length; i++) {
        const name = styles[i];
        if (!name.startsWith("--")) continue;
        if (name.startsWith("--sc-")) continue;
        const value = styles.getPropertyValue(name).trim();
        if (!value) continue;
        tokens.push({ name, value, category: categorize(name, value) });
    }

    return tokens.sort((a, b) => a.name.localeCompare(b.name));
}

export default function CSSTokenInspector() {
    const [isMounted, setIsMounted] = useState(false);
    const [tokens, setTokens] = useState<CSSToken[]>([]);
    const [activeCategory, setActiveCategory] = useState<Category>("all");
    const [search, setSearch] = useState("");
    const [copiedName, setCopiedName] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => { setIsMounted(true); }, []);

    useEffect(() => {
        if (!isMounted) return;

        setTokens(readTokens());

        const observer = new MutationObserver(() => setTokens(readTokens()));
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["style"],
        });

        return () => observer.disconnect();
    }, [isMounted]);

    const handleCopy = useCallback((name: string) => {
        navigator.clipboard.writeText(`var(${name})`);
        setCopiedName(name);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopiedName(null), 1500);
    }, []);

    if (!isMounted) return null;

    const filtered = tokens.filter((t) => {
        const matchesCategory = activeCategory === "all" || t.category === activeCategory;
        const matchesSearch = search === "" ||
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.value.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const countFor = (cat: Category) =>
        cat === "all" ? tokens.length : tokens.filter((t) => t.category === cat).length;

    return (
        <CSSCard $color={COLOR}>
            <CSSCardHeader>
                <CSSCardIcon>🪄</CSSCardIcon>
                <CSSHeaderText>
                    <CSSCardTitle>CSS Token Inspector</CSSCardTitle>
                    <CSSCardDescription>
                        Todas as CSS custom properties do documento, atualizadas em tempo real.
                    </CSSCardDescription>
                </CSSHeaderText>
                <SearchInput
                    placeholder="Buscar por nome ou valor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </CSSCardHeader>

            <TabsRow>
                {CATEGORIES.map(({ key, label }) => (
                    <Tab
                        key={key}
                        $active={activeCategory === key}
                        $color={COLOR}
                        onClick={() => setActiveCategory(key)}
                    >
                        {label}
                        <TabBadge $active={activeCategory === key} $color={COLOR}>
                            {countFor(key)}
                        </TabBadge>
                    </Tab>
                ))}
            </TabsRow>

            <TokenList>
                {filtered.length === 0 ? (
                    <EmptyState>
                        {search ? `Nenhum token encontrado para "${search}"` : "Nenhum token nesta categoria"}
                    </EmptyState>
                ) : (
                    filtered.map((token) => (
                        <TokenRow key={token.name}>
                            {token.category === "color" && (
                                <ColorSwatch $value={token.value} />
                            )}
                            <TokenName title={token.name}>{token.name}</TokenName>
                            <TokenValue title={token.value}>{token.value}</TokenValue>
                            <CopyBtn
                                $copied={copiedName === token.name}
                                $color={COLOR}
                                onClick={() => handleCopy(token.name)}
                            >
                                {copiedName === token.name ? "✓ copiado" : "var()"}
                            </CopyBtn>
                        </TokenRow>
                    ))
                )}
            </TokenList>
        </CSSCard>
    );
}
