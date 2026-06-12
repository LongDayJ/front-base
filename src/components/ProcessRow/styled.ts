import styled from "styled-components";

const MOBILE = "@media (max-width: 640px)";

export const Tr = styled.tr`
    border-bottom: 1px solid #eee;
    transition: background 0.12s;

    &:hover { background: #f9f9f9; }
    &:last-child { border-bottom: none; }

    ${MOBILE} {
        display: block;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        margin-bottom: 0.65rem;

        &:last-child { border-bottom: 1px solid #e2e8f0; margin-bottom: 0; }
        &:hover { background: #fff; }
    }
`;

export const Td = styled.td`
    padding: 0.75rem 0.9rem;
    font-size: 0.82rem;
    color: #1e293b;
    vertical-align: middle;

    ${MOBILE} {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 0.5rem 0.75rem;
        border-bottom: 1px solid #f1f5f9;
        white-space: normal !important;

        &:last-child { border-bottom: none; }

        &[data-label]::before {
            content: attr(data-label);
            font-size: 0.63rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            flex-shrink: 0;
            min-width: 72px;
            margin-right: 0.6rem;
            padding-top: 0.15rem;
        }
    }
`;

export const TdObs = styled(Td)`
    color: #64748b;
    max-width: 220px;

    ${MOBILE} { max-width: none; }
`;

export const TdAssunto = styled(Td)`
    max-width: 360px;

    ${MOBILE} { max-width: none; }
`;

export const ReportLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: #1a73e8;
    font-size: 0.82rem;
    text-decoration: none;
    white-space: nowrap;

    svg {
        width: 12px;
        height: 12px;
        flex-shrink: 0;
        opacity: 0.7;
    }

    &:hover { text-decoration: underline; }
`;

export const ActionsCell = styled.div`
    display: flex;
    align-items: center;
    gap: 0.35rem;

    ${MOBILE} {
        justify-content: center;
        width: 100%;
        padding: 0.25rem 0;
    }
`;

export const ActionBtn = styled.button<{ $color: string; $hoverColor: string }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: none;
    background: ${({ $color }) => $color}18;
    color: ${({ $color }) => $color};
    cursor: pointer;
    transition: background 0.15s;

    svg { width: 14px; height: 14px; }

    &:hover { background: ${({ $hoverColor }) => $hoverColor}30; }
`;

export const ObsDash = styled.span`
    color: #cbd5e1;
`;
