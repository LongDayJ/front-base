"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import styled, { keyframes } from "styled-components";

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

export function AlertProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<AlertMessage[]>([]);

    const callMessage = useCallback((text: string, type: AlertType) => {
        const id = Date.now();
        setMessages((prev) => [...prev, { id, text, type }]);
        setTimeout(() => {
            setMessages((prev) => prev.filter((m) => m.id !== id));
        }, 4000);
    }, []);

    return (
        <AlertContext.Provider value={{ callMessage }}>
            {children}
            <ToastContainer>
                {messages.map((m) => (
                    <Toast key={m.id} $type={m.type}>
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

const slideIn = keyframes`
    from { transform: translateX(120%); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
`;

const ToastContainer = styled.div`
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const bgMap: Record<AlertType, string> = {
    success: "#1b5e3b",
    warning: "#b45309",
    error: "#9b1200",
    info: "#3135ec",
};

const Toast = styled.div<{ $type: AlertType }>`
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    background: ${({ $type }) => bgMap[$type]};
    color: #fff;
    font-size: 0.875rem;
    max-width: 360px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    animation: ${slideIn} 0.25s ease;
`;
