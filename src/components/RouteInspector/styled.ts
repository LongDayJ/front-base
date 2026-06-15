"use client";

import styled from "styled-components";

export const RouteCard = styled.div<{ $color: string }>`
    width: 100%;
    padding: 1.25rem 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    border: 0.25vh solid transparent;
    border-top: 1vh solid ${({ $color }) => $color};
    background: ${({ theme }) => theme.colors.grayLight};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.08);

    @media (max-width: 768px) {
        width: 92dvw;
    }
`;

export const RouteCardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const RouteCardIcon = styled.div`
    width: clamp(32px, 3.5vw, 48px);
    height: clamp(32px, 3.5vw, 48px);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(1rem, 1.5vw, 1.5rem);
    background: ${({ theme }) => theme.colors.grayUltraLight};
    flex-shrink: 0;
`;

export const RouteHeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex: 1;
`;

export const RouteCardTitle = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.primary};
    line-height: 120%;
`;

export const RouteCardDescription = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    line-height: 160%;
`;

export const RouteList = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.white};
    overflow: hidden;
`;

export const RouteRow = styled.button<{ $active: boolean; $color: string }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.9rem;
    border: none;
    border-left: 3px solid ${({ $active, $color }) => ($active ? $color : "transparent")};
    background: ${({ $active, $color }) => ($active ? `${$color}12` : "transparent")};
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: background 0.15s ease;

    &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    &:hover {
        background: ${({ $active, $color }) => ($active ? `${$color}12` : `${$color}08`)};
    }
`;

export const RoutePath = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.greenDark};
    flex-shrink: 0;
`;

export const RouteLabel = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    flex: 1;
`;

export const RouteGroupBadge = styled.span<{ $group: string }>`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-family: ${({ theme }) => theme.fonts.sans};
    padding: 0.1rem 0.45rem;
    border-radius: 999px;
    white-space: nowrap;
    background: ${({ $group }) =>
        $group === "Autenticada" ? "rgba(99,102,241,0.1)" :
        $group === "Dev"         ? "rgba(234,179,8,0.1)"  :
                                   "rgba(16,185,129,0.1)"};
    color: ${({ $group }) =>
        $group === "Autenticada" ? "#6366f1" :
        $group === "Dev"         ? "#a16207" :
                                   "#10b981"};
    border: 1px solid ${({ $group }) =>
        $group === "Autenticada" ? "rgba(99,102,241,0.25)" :
        $group === "Dev"         ? "rgba(234,179,8,0.35)"  :
                                   "rgba(16,185,129,0.25)"};
`;

export const ParamsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    border: 1px solid rgba(0, 0, 00, 0.07);
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.white};
    padding: 0.7rem 0.9rem;
`;

export const ParamsSectionTitle = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const ActivePathDisplay = styled.span<{ $color: string }>`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ $color }) => $color};
`;

export const ParamsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const ParamsTableHead = styled.thead`
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
`;

export const ParamsTh = styled.th`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    text-align: left;
    padding: 0.3rem 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
`;

export const ParamsTd = styled.td`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.greenDark};
    padding: 0.3rem 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);

    &:last-child {
        color: ${({ theme }) => theme.colors.gray};
    }
`;

export const EmptyParams = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-style: italic;
`;
