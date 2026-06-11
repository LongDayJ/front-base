"use client";

import styled from "styled-components";

export const StorageCard = styled.div<{ $color: string }>`
    width: 100%;
    min-width: 0;
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

export const StorageCardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
`;

export const StorageCardIcon = styled.div`
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

export const StorageHeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2vh;
    flex: 1;
`;

export const StorageCardTitle = styled.h2`
    font-size: 1.4vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.primary};
    line-height: 120%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.lg};
    }
`;

export const StorageCardDescription = styled.p`
    font-size: 0.85vw;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    line-height: 160%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;

export const ClearBtn = styled.button`
    padding: 0.35rem 0.8rem;
    border-radius: 6px;
    border: 1.5px solid #f87171;
    color: #f87171;
    background: transparent;
    font-size: 0.78vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    cursor: pointer;
    white-space: nowrap;
    font-family: ${({ theme }) => theme.fonts.sans};
    transition: background 0.18s ease, color 0.18s ease;
    margin-left: auto;

    &:hover {
        background: #f87171;
        color: #fff;
    }

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;

export const TabsRow = styled.div`
    display: flex;
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.08);
`;

export const Tab = styled.button<{ $active: boolean; $color: string }>`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    border: none;
    border-bottom: 2px solid ${({ $active, $color }) => ($active ? $color : "transparent")};
    margin-bottom: -1.5px;
    background: transparent;
    color: ${({ $active, $color, theme }) => ($active ? $color : theme.colors.gray)};
    font-size: 0.78vw;
    font-weight: ${({ $active, theme }) => ($active ? theme.fontWeights.bold : theme.fontWeights.medium)};
    font-family: ${({ theme }) => theme.fonts.sans};
    cursor: pointer;
    transition: color 0.15s ease, border-color 0.15s ease;

    &:hover {
        color: ${({ $color }) => $color};
    }

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;

export const TabBadge = styled.span<{ $active: boolean; $color: string }>`
    background: ${({ $active, $color }) => ($active ? $color : "rgba(0,0,0,0.08)")};
    color: ${({ $active }) => ($active ? "#fff" : "rgba(0,0,0,0.4)")};
    border-radius: 999px;
    padding: 0.05rem 0.45rem;
    font-size: 0.6vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-family: ${({ theme }) => theme.fonts.sans};
    transition: background 0.15s ease, color 0.15s ease;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxs};
    }
`;

export const EntriesList = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 30vh;
    overflow-y: auto;
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.white};

    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.15);
        border-radius: 999px;
    }
`;

export const EntryRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
    padding: 0.55rem 0.9rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: background 0.12s ease;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: rgba(0, 0, 0, 0.02);
    }
`;

export const EntryKey = styled.span`
    flex-shrink: 0;
    width: 18%;
    font-size: 0.78vw;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.sans};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const EntryValue = styled.span`
    flex: 1;
    font-size: 0.72vw;
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.gray};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const EntryValueInput = styled.input`
    flex: 1;
    font-size: 0.72vw;
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.greenDark};
    border: 1.5px solid #f97316;
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    background: ${({ theme }) => theme.colors.white};
    outline: none;
    min-width: 0;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const EntrySizeBadge = styled.span`
    flex-shrink: 0;
    font-size: 0.62vw;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.gray};
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    padding: 0.1rem 0.4rem;
    white-space: nowrap;
    font-family: ${({ theme }) => theme.fonts.mono};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxs};
    }
`;

export const EntryActions = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex-shrink: 0;
`;

export const ActionBtn = styled.button<{ $color: string }>`
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    border: 1px solid ${({ $color }) => `${$color}66`};
    background: transparent;
    color: ${({ $color }) => $color};
    font-size: 0.72vw;
    line-height: 1;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;

    &:hover {
        background: ${({ $color }) => `${$color}22`};
        border-color: ${({ $color }) => $color};
    }

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const EmptyState = styled.div`
    padding: 3vh 1vw;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 0.8vw;
    font-family: ${({ theme }) => theme.fonts.sans};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;
