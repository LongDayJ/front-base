import styled from "styled-components";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    'Finalizado':             { bg: '#e6f4ea', color: '#34a853' },
    'Sobrestado':             { bg: '#fff3e0', color: '#f57c00' },
    'Aguardando área técnica': { bg: '#e8f0fe', color: '#1a73e8' },
    'Área técnica retornou':   { bg: '#f3e8fd', color: '#9c27b0' },
};

export const Badge = styled.span<{ $status: string }>`
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 600;
    white-space: nowrap;
    background: ${({ $status }) => STATUS_COLORS[$status]?.bg ?? '#f1f5f9'};
    color: ${({ $status }) => STATUS_COLORS[$status]?.color ?? '#64748b'};

    &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
        flex-shrink: 0;
    }
`;
