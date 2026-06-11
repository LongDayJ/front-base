"use client";

import styled from "styled-components";

export const CSSCard = styled.div<{ $color: string }>`
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

export const CSSCardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
`;

export const CSSCardIcon = styled.div`
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

export const CSSHeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2vh;
    flex: 1;
`;

export const CSSCardTitle = styled.h2`
    font-size: 1.4vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.primary};
    line-height: 120%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.lg};
    }
`;

export const CSSCardDescription = styled.p`
    font-size: 0.85vw;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    line-height: 160%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;

export const SearchInput = styled.input`
    padding: 0.35rem 0.7rem;
    border-radius: 6px;
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    background: ${({ theme }) => theme.colors.white};
    font-size: 0.75vw;
    font-family: ${({ theme }) => theme.fonts.sans};
    color: ${({ theme }) => theme.colors.greenDark};
    outline: none;
    width: 16vw;
    transition: border-color 0.15s ease;

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray};
    }

    &:focus {
        border-color: rgba(0, 0, 0, 0.25);
    }

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
        width: 40dvw;
    }
`;

export const TabsRow = styled.div`
    display: flex;
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.08);
    flex-wrap: wrap;
`;

export const Tab = styled.button<{ $active: boolean; $color: string }>`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.9rem;
    border: none;
    border-bottom: 2px solid ${({ $active, $color }) => ($active ? $color : "transparent")};
    margin-bottom: -1.5px;
    background: transparent;
    color: ${({ $active, $color, theme }) => ($active ? $color : theme.colors.gray)};
    font-size: 0.75vw;
    font-weight: ${({ $active, theme }) => ($active ? theme.fontWeights.bold : theme.fontWeights.medium)};
    font-family: ${({ theme }) => theme.fonts.sans};
    cursor: pointer;
    white-space: nowrap;
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

export const TokenList = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 35vh;
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

export const TokenRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8vw;
    padding: 0.5rem 0.9rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    transition: background 0.12s ease;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: rgba(0, 0, 0, 0.02);
    }
`;

export const ColorSwatch = styled.span<{ $value: string }>`
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 4px;
    background: ${({ $value }) => $value};
    border: 1px solid rgba(0, 0, 0, 0.12);
    flex-shrink: 0;
    display: inline-block;
`;

export const TokenName = styled.span`
    flex-shrink: 0;
    width: 32%;
    font-size: 0.75vw;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.greenDark};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const TokenValue = styled.span`
    flex: 1;
    font-size: 0.7vw;
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

export const CopyBtn = styled.button<{ $copied: boolean; $color: string }>`
    flex-shrink: 0;
    padding: 0.18rem 0.45rem;
    border-radius: 4px;
    border: 1px solid ${({ $copied, $color }) => ($copied ? $color : "rgba(0,0,0,0.1)")};
    background: ${({ $copied, $color }) => ($copied ? `${$color}18` : "transparent")};
    color: ${({ $copied, $color, theme }) => ($copied ? $color : theme.colors.gray)};
    font-size: 0.62vw;
    font-family: ${({ theme }) => theme.fonts.sans};
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;

    &:hover {
        border-color: ${({ $color }) => $color};
        color: ${({ $color }) => $color};
        background: ${({ $color }) => `${$color}10`};
    }

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxs};
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
