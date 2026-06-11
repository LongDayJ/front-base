import styled, { keyframes } from "styled-components";

type AlertType = "success" | "warning" | "error" | "info";

export const bgMap: Record<AlertType, string> = {
    success: "#14532d",
    warning: "#fbbf24",
    error: "#7f1d1d",
    info: "#1e3a8a",
};

export const accentMap: Record<AlertType, string> = {
    success: "#4ade80",
    warning: "#FFFF8F",
    error: "#f87171",
    info: "#60a5fa",
};

const slideUp = keyframes`
    from { transform: translateY(120%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
`;

export const ToastContainer = styled.div`
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (max-width: 768px) {
        bottom: 1.5rem;
        right: 1rem;
        left: 1rem;
    }
`;

export const Toast = styled.div<{ $type: AlertType }>`
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    border-left: 4px solid ${({ $type }) => accentMap[$type]};
    background: ${({ $type }) => bgMap[$type]};
    color: #fff;
    font-size: 0.875rem;
    max-width: 360px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    animation: ${slideUp} 0.3s ease;
    cursor: pointer;
    user-select: none;

    &:hover {
        filter: brightness(1.15);
    }

    @media (max-width: 768px) {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        border-radius: 8px;
        gap: 0.625rem;
        max-width: 100%;
        border-left-width: 5px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
    }
`;

export const ToastIcon = styled.span<{ $type: AlertType }>`
    flex-shrink: 0;
    font-size: 1rem;
    font-weight: bold;
    color: ${({ $type }) => accentMap[$type]};

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;
