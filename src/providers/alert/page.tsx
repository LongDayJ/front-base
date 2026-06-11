"use client";

import { createContext, useCallback, useContext, useRef, useState, ReactNode } from "react";
import { Toast, ToastContainer, ToastIcon } from "./styled";

type AlertType = "success" | "warning" | "error" | "info";

interface AlertMessage {
    id: number;
    text: string;
    type: AlertType;
}

interface AlertContextData {
    callMessage: (text: string, type: AlertType) => void;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

const iconMap: Record<AlertType, string> = {
    success: "✓",
    warning: "⚠",
    error: "✕",
    info: "ℹ",
};

const DURATION = 4000;

type TimerEntry = {
    timeoutId: ReturnType<typeof setTimeout> | null;
    endsAt: number;
};

export function AlertProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<AlertMessage[]>([]);
    const timers = useRef<Map<number, TimerEntry>>(new Map());

    const removeMessage = useCallback((id: number) => {
        const entry = timers.current.get(id);
        if (entry?.timeoutId) clearTimeout(entry.timeoutId);
        timers.current.delete(id);
        setMessages((prev) => prev.filter((m) => m.id !== id));
    }, []);

    const pauseMessage = useCallback((id: number) => {
        const entry = timers.current.get(id);
        if (!entry || entry.timeoutId === null) return;
        clearTimeout(entry.timeoutId);
        const remaining = Math.max(0, entry.endsAt - Date.now());
        timers.current.set(id, { timeoutId: null, endsAt: Date.now() + remaining });
    }, []);

    const resetMessage = useCallback((id: number) => {
        const entry = timers.current.get(id);
        if (!entry) return;
        if (entry.timeoutId) clearTimeout(entry.timeoutId);
        const timeoutId = setTimeout(() => removeMessage(id), DURATION);
        timers.current.set(id, { timeoutId, endsAt: Date.now() + DURATION });
    }, [removeMessage]);

    const callMessage = useCallback((text: string, type: AlertType) => {
        const id = Date.now();
        setMessages((prev) => {
            const next = [...prev, { id, text, type }];
            return next.length > 4 ? next.slice(-4) : next;
        });
        const endsAt = Date.now() + DURATION;
        const timeoutId = setTimeout(() => removeMessage(id), DURATION);
        timers.current.set(id, { timeoutId, endsAt });
    }, [removeMessage]);

    return (
        <AlertContext.Provider value={{ callMessage }}>
            {children}
            <ToastContainer>
                {messages.map((m) => (
                    <Toast
                        key={m.id}
                        $type={m.type}
                        onClick={() => removeMessage(m.id)}
                        onMouseEnter={() => pauseMessage(m.id)}
                        onMouseLeave={() => resetMessage(m.id)}
                    >
                        <ToastIcon $type={m.type}>{iconMap[m.type]}</ToastIcon>
                        {m.text}
                    </Toast>
                ))}
            </ToastContainer>
        </AlertContext.Provider>
    );
}

export function useAlert() {
    return useContext(AlertContext);
}
