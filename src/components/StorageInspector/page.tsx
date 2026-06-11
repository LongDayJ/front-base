"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
    ActionBtn,
    ClearBtn,
    EmptyState,
    EntriesList,
    EntryActions,
    EntryKey,
    EntryRow,
    EntrySizeBadge,
    EntryValue,
    EntryValueInput,
    StorageCard,
    StorageCardDescription,
    StorageCardHeader,
    StorageCardIcon,
    StorageCardTitle,
    StorageHeaderText,
    Tab,
    TabBadge,
    TabsRow,
} from "./styled";

interface StorageEntry {
    key: string;
    value: string;
    size: number;
}

type StorageTab = "localStorage" | "sessionStorage";

function readStorageEntries(tab: StorageTab): StorageEntry[] {
    const storage = tab === "localStorage" ? localStorage : sessionStorage;
    const entries: StorageEntry[] = [];
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (!key) continue;
        const value = storage.getItem(key) ?? "";
        entries.push({ key, value, size: new Blob([value]).size });
    }
    return entries.sort((a, b) => a.key.localeCompare(b.key));
}

export default function StorageInspector() {
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<StorageTab>("localStorage");
    const [entries, setEntries] = useState<StorageEntry[]>([]);
    const [localCount, setLocalCount] = useState(0);
    const [sessionCount, setSessionCount] = useState(0);
    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState("");
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const refreshAll = useCallback((tab: StorageTab) => {
        const local = readStorageEntries("localStorage");
        const session = readStorageEntries("sessionStorage");
        setLocalCount(local.length);
        setSessionCount(session.length);
        setEntries(tab === "localStorage" ? local : session);
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        refreshAll(activeTab);
        intervalRef.current = setInterval(() => refreshAll(activeTab), 500);

        const onStorage = () => refreshAll(activeTab);
        window.addEventListener("storage", onStorage);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            window.removeEventListener("storage", onStorage);
        };
    }, [isMounted, activeTab, refreshAll]);

    const handleTabChange = (tab: StorageTab) => {
        setEditingKey(null);
        setActiveTab(tab);
    };

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
    };

    const handleStartEdit = (key: string, value: string) => {
        setEditingKey(key);
        setEditingValue(value);
    };

    const handleSaveEdit = (key: string) => {
        const storage = activeTab === "localStorage" ? localStorage : sessionStorage;
        storage.setItem(key, editingValue);
        setEditingKey(null);
        refreshAll(activeTab);
    };

    const handleDelete = (key: string) => {
        const storage = activeTab === "localStorage" ? localStorage : sessionStorage;
        storage.removeItem(key);
        if (editingKey === key) setEditingKey(null);
        refreshAll(activeTab);
    };

    const handleClear = () => {
        const storage = activeTab === "localStorage" ? localStorage : sessionStorage;
        storage.clear();
        setEditingKey(null);
        refreshAll(activeTab);
    };

    if (!isMounted) return null;

    return (
        <StorageCard $color="#f97316">
            <StorageCardHeader>
                <StorageCardIcon>🗄️</StorageCardIcon>
                <StorageHeaderText>
                    <StorageCardTitle>Storage Inspector</StorageCardTitle>
                    <StorageCardDescription>
                        Inspecione, edite e delete entradas do localStorage e sessionStorage.
                    </StorageCardDescription>
                </StorageHeaderText>
                <ClearBtn onClick={handleClear}>Limpar tudo</ClearBtn>
            </StorageCardHeader>

            <TabsRow>
                <Tab
                    $active={activeTab === "localStorage"}
                    $color="#f97316"
                    onClick={() => handleTabChange("localStorage")}
                >
                    localStorage
                    <TabBadge $active={activeTab === "localStorage"} $color="#f97316">
                        {localCount}
                    </TabBadge>
                </Tab>
                <Tab
                    $active={activeTab === "sessionStorage"}
                    $color="#f97316"
                    onClick={() => handleTabChange("sessionStorage")}
                >
                    sessionStorage
                    <TabBadge $active={activeTab === "sessionStorage"} $color="#f97316">
                        {sessionCount}
                    </TabBadge>
                </Tab>
            </TabsRow>

            <EntriesList>
                {entries.length === 0 ? (
                    <EmptyState>Nenhuma entrada em {activeTab}</EmptyState>
                ) : (
                    entries.map((entry) => (
                        <EntryRow key={entry.key}>
                            <EntryKey title={entry.key}>{entry.key}</EntryKey>

                            {editingKey === entry.key ? (
                                <EntryValueInput
                                    value={editingValue}
                                    onChange={(e) => setEditingValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSaveEdit(entry.key);
                                        if (e.key === "Escape") setEditingKey(null);
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <EntryValue title={entry.value}>{entry.value}</EntryValue>
                            )}

                            <EntrySizeBadge>{entry.size} B</EntrySizeBadge>

                            <EntryActions>
                                {editingKey === entry.key ? (
                                    <>
                                        <ActionBtn
                                            $color="#4ade80"
                                            onClick={() => handleSaveEdit(entry.key)}
                                            title="Salvar (Enter)"
                                        >
                                            ✓
                                        </ActionBtn>
                                        <ActionBtn
                                            $color="#94a3b8"
                                            onClick={() => setEditingKey(null)}
                                            title="Cancelar (Esc)"
                                        >
                                            ✕
                                        </ActionBtn>
                                    </>
                                ) : (
                                    <>
                                        <ActionBtn
                                            $color="#60a5fa"
                                            onClick={() => handleCopy(entry.value)}
                                            title="Copiar valor"
                                        >
                                            ⎘
                                        </ActionBtn>
                                        <ActionBtn
                                            $color="#4ade80"
                                            onClick={() => handleStartEdit(entry.key, entry.value)}
                                            title="Editar valor"
                                        >
                                            ✎
                                        </ActionBtn>
                                        <ActionBtn
                                            $color="#f87171"
                                            onClick={() => handleDelete(entry.key)}
                                            title="Deletar entrada"
                                        >
                                            ⌫
                                        </ActionBtn>
                                    </>
                                )}
                            </EntryActions>
                        </EntryRow>
                    ))
                )}
            </EntriesList>
        </StorageCard>
    );
}
