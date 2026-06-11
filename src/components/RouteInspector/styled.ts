"use client";

import styled from "styled-components";

export const RouteCard = styled.div<{ $color: string }>`
    width: 100%;

    padding: 2.5vh 2vw;

    border-radius: ${({ theme }) => theme.borderRadius.xs};
    border: 0.25vh solid transparent;
    border-top: 1vh solid ${({ $color }) => $color};

    background: ${({ theme }) => theme.colors.grayLight};

    display: flex;
    flex-direction: column;
    gap: 1.5vh;

    box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.08);

    @media (max-width: 768px) {
        width: 92dvw;
    }
`;

export const RouteCardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
`;

export const RouteCardIcon = styled.div`
    width: 3.5vw;
    height: 3.5vw;
    border-radius: 0.8vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5vw;
    background: ${({ theme }) => theme.colors.grayUltraLight};
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 10dvw;
        height: 10dvw;
        font-size: ${({ theme }) => theme.fontSizes.lg};
        border-radius: 2vw;
    }
`;

export const RouteHeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2vh;
    flex: 1;
`;

export const RouteCardTitle = styled.h2`
    font-size: 1.4vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.primary};
    line-height: 120%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.lg};
    }
`;

export const RouteCardDescription = styled.p`
    font-size: 0.85vw;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    line-height: 160%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
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
    gap: 0.75vw;
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
    font-size: 0.78vw;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.greenDark};
    flex-shrink: 0;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const RouteLabel = styled.span`
    font-size: 0.72vw;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    flex: 1;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const RouteGroupBadge = styled.span<{ $group: string }>`
    font-size: 0.55vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-family: ${({ theme }) => theme.fonts.sans};
    padding: 0.08rem 0.4rem;
    border-radius: 999px;
    white-space: nowrap;
    background: ${({ $group }) =>
        $group === "Autenticada" ? "rgba(99,102,241,0.1)" : "rgba(16,185,129,0.1)"};
    color: ${({ $group }) =>
        $group === "Autenticada" ? "#6366f1" : "#10b981"};
    border: 1px solid ${({ $group }) =>
        $group === "Autenticada" ? "rgba(99,102,241,0.25)" : "rgba(16,185,129,0.25)"};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxs};
    }
`;

export const ParamsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.white};
    padding: 0.7rem 0.9rem;
`;

export const ParamsSectionTitle = styled.span`
    font-size: 0.65vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    text-transform: uppercase;
    letter-spacing: 0.05em;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxs};
    }
`;

export const ActivePathDisplay = styled.span<{ $color: string }>`
    font-size: 0.78vw;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ $color }) => $color};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const ParamsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const ParamsTableHead = styled.thead`
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
`;

export const ParamsTh = styled.th`
    font-size: 0.6vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    text-align: left;
    padding: 0.3rem 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxs};
    }
`;

export const ParamsTd = styled.td`
    font-size: 0.72vw;
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.greenDark};
    padding: 0.3rem 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);

    &:last-child {
        color: ${({ theme }) => theme.colors.gray};
    }

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const EmptyParams = styled.span`
    font-size: 0.72vw;
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-style: italic;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;
