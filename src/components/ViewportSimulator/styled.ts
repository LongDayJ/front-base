"use client";

import styled from "styled-components";

export const ViewportCard = styled.div<{ $color: string }>`
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

export const ViewportCardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;
`;

export const ViewportCardIcon = styled.div`
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

export const ViewportHeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2vh;
    flex: 1;
`;

export const ViewportCardTitle = styled.h2`
    font-size: 1.4vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.primary};
    line-height: 120%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.lg};
    }
`;

export const ViewportCardDescription = styled.p`
    font-size: 0.85vw;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    line-height: 160%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;

export const PresetsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
`;

export const PresetBtn = styled.button<{ $active: boolean; $color: string }>`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.55rem 0.75rem;
    border-radius: 8px;
    border: 2px solid ${({ $active, $color }) => ($active ? $color : "rgba(0,0,0,0.08)")};
    background: ${({ $active, $color }) => ($active ? `${$color}12` : "transparent")};
    cursor: pointer;
    text-align: left;
    transition: all 0.18s ease;
    width: 100%;

    &:hover {
        border-color: ${({ $color }) => $color};
        background: ${({ $color }) => `${$color}0d`};
    }
`;

export const PresetIcon = styled.span`
    font-size: 1.1vw;
    flex-shrink: 0;
    line-height: 1;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.md};
    }
`;

export const PresetInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
`;

export const PresetName = styled.span<{ $active: boolean; $color: string }>`
    font-size: 0.72vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ $active, $color, theme }) => ($active ? $color : theme.colors.greenDark)};
    font-family: ${({ theme }) => theme.fonts.sans};
    white-space: nowrap;
    transition: color 0.18s ease;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const PresetSize = styled.span`
    font-size: 0.62vw;
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.gray};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxs};
    }
`;

export const CustomRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 2px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: 0.45rem 0.75rem;
    background: transparent;
    transition: border-color 0.18s ease;

    &:focus-within {
        border-color: rgba(0, 0, 0, 0.2);
    }
`;

export const CustomRowLabel = styled.span`
    font-size: 0.72vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.sans};
    white-space: nowrap;
    flex-shrink: 0;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const CustomInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.72vw;
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.greenDark};
    min-width: 0;

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray};
    }

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const ApplyBtn = styled.button<{ $color: string }>`
    padding: 0.2rem 0.55rem;
    border-radius: 5px;
    border: 1.5px solid ${({ $color }) => $color};
    background: transparent;
    color: ${({ $color }) => $color};
    font-size: 0.65vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-family: ${({ theme }) => theme.fonts.sans};
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
        background: ${({ $color }) => $color};
        color: #fff;
    }

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxs};
    }
`;

export const DimensionsRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5vw;
    padding: 0.7rem 0.9rem;
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.white};
`;

export const DimensionBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
`;

export const DimensionLabel = styled.span`
    font-size: 0.58vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    text-transform: uppercase;
    letter-spacing: 0.05em;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxxs};
    }
`;

export const DimensionValue = styled.span<{ $color?: string }>`
    font-size: 0.85vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ $color, theme }) => $color ?? theme.colors.greenDark};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;

export const DimensionSeparator = styled.span`
    width: 1px;
    height: 2rem;
    background: rgba(0, 0, 0, 0.08);
    flex-shrink: 0;
`;

export const ResetBtn = styled.button`
    margin-left: auto;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    border: 1.5px solid rgba(0, 0, 0, 0.12);
    background: transparent;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 0.68vw;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-family: ${({ theme }) => theme.fonts.sans};
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;

    &:hover:not(:disabled) {
        border-color: #f87171;
        color: #f87171;
    }

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxs};
    }
`;
