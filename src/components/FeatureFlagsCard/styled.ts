"use client";

import styled from "styled-components";

export const FlagsCard = styled.div<{ $color: string }>`
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

export const FlagsCardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
`;

export const FlagsCardIcon = styled.div`
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

export const FlagsHeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2vh;
    flex: 1;
`;

export const FlagsCardTitle = styled.h2`
    font-size: 1.4vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.primary};
    line-height: 120%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.lg};
    }
`;

export const FlagsCardDescription = styled.p`
    font-size: 0.85vw;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    line-height: 160%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;

export const FlagsList = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.white};
    overflow: hidden;
`;

export const FlagRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
    padding: 0.8rem 0.9rem;
    transition: background 0.15s ease;

    &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    &:hover {
        background: rgba(0, 0, 0, 0.02);
    }

    @media (max-width: 768px) {
        gap: 0.6rem;
    }
`;

export const ShortcutBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.18rem;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.03);
    font-size: 0.6vw;
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.gray};
    white-space: nowrap;
    flex-shrink: 0;
    user-select: none;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const Key = styled.kbd`
    background: rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 0 0.28rem;
    font-size: inherit;
    font-family: inherit;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
    line-height: 1.5;
`;

export const FlagInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex: 1;
    min-width: 0;
`;

export const FlagName = styled.span`
    font-size: 0.8vw;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.sans};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;

export const FlagDescription = styled.span`
    font-size: 0.7vw;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    line-height: 150%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const ToggleLabel = styled.label`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    flex-shrink: 0;
`;

export const ToggleInput = styled.input`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
`;

export const ToggleTrack = styled.span<{ $enabled: boolean; $color: string }>`
    position: relative;
    display: inline-block;
    width: 2.6rem;
    height: 1.4rem;
    border-radius: 999px;
    background: ${({ $enabled, $color }) => ($enabled ? $color : "rgba(0,0,0,0.12)")};
    transition: background 0.2s ease;
    flex-shrink: 0;
`;

export const ToggleThumb = styled.span<{ $enabled: boolean }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${({ $enabled }) => ($enabled ? "calc(100% - 1.15rem)" : "0.15rem")};
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    transition: left 0.2s ease;
`;
