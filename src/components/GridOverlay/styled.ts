"use client";

import styled from "styled-components";

export const GridOverlayEl = styled.div<{ $columns: number; $gutter: number }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9000;
    display: grid;
    grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
    gap: ${({ $gutter }) => $gutter}px;
    padding: 0 ${({ $gutter }) => $gutter}px;
`;

export const GridColumn = styled.div<{ $color: string; $opacity: number }>`
    background: ${({ $color }) => $color};
    opacity: ${({ $opacity }) => $opacity};
    height: 100%;
`;

export const GridRowsOverlayEl = styled.div<{ $rows: number; $gutter: number }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9000;
    display: grid;
    grid-template-rows: repeat(${({ $rows }) => $rows}, 1fr);
    gap: ${({ $gutter }) => $gutter}px;
    padding: ${({ $gutter }) => $gutter}px 0;
`;

export const GridRow = styled.div<{ $color: string; $opacity: number }>`
    background: ${({ $color }) => $color};
    opacity: ${({ $opacity }) => $opacity};
    width: 100%;
`;

export const GridCard = styled.div<{ $color: string }>`
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

export const GridCardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1vw;

    @media (max-width: 768px) {
        gap: 0.8rem;
    }
`;

export const GridCardIcon = styled.div`
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
        width: 3rem;
        height: 3rem;
        font-size: ${({ theme }) => theme.fontSizes.lg};
        border-radius: 0.6rem;
    }
`;

export const GridHeaderText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2vh;
    flex: 1;
`;

export const GridCardTitle = styled.h2`
    font-size: 1.4vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.primary};
    line-height: 120%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.lg};
    }
`;

export const GridCardDescription = styled.p`
    font-size: 0.85vw;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.sans};
    line-height: 160%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;

export const ToggleLabel = styled.label`
    position: relative;
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
`;

export const ToggleTrack = styled.span<{ $enabled: boolean; $color: string }>`
    width: 2.2rem;
    height: 1.2rem;
    border-radius: 999px;
    background: ${({ $enabled, $color }) => ($enabled ? $color : "rgba(0,0,0,0.12)")};
    position: relative;
    transition: background 0.2s ease;
    flex-shrink: 0;
`;

export const ToggleThumb = styled.span<{ $enabled: boolean }>`
    position: absolute;
    top: 0.15rem;
    left: ${({ $enabled }) => ($enabled ? "calc(100% - 1.05rem)" : "0.15rem")};
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: left 0.2s ease;
`;

export const ControlsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.9vh;
    padding: 1.2vh 1.2vw;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.07);

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

export const ControlRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8vw;

    @media (max-width: 768px) {
        gap: 0.6rem;
    }
`;

export const ControlLabel = styled.span`
    font-size: 0.72vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.sans};
    width: 5.5vw;
    flex-shrink: 0;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
        width: 4.5rem;
    }
`;

export const ControlValue = styled.span`
    font-size: 0.68vw;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.gray};
    width: 3.2vw;
    text-align: right;
    flex-shrink: 0;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
        width: 2.8rem;
    }
`;

export const RangeSlider = styled.input<{ $color: string }>`
    flex: 1;
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.1);
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${({ $color }) => $color};
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        transition: transform 0.1s ease;
    }

    &::-webkit-slider-thumb:hover {
        transform: scale(1.2);
    }

    &::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${({ $color }) => $color};
        cursor: pointer;
        border: none;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    }
`;

export const ColorPickerWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex: 1;
`;

export const ColorPickerInput = styled.input`
    width: 2rem;
    height: 1.5rem;
    border-radius: 4px;
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    background: transparent;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    overflow: hidden;

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }
    &::-webkit-color-swatch {
        border: none;
        border-radius: 2px;
    }
`;

export const ColorHexText = styled.span`
    font-size: 0.68vw;
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.gray};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
    }
`;

export const CardFooterRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
`;

export const FooterHint = styled.span`
    font-size: 0.65vw;
    font-family: ${({ theme }) => theme.fonts.sans};
    color: ${({ theme }) => theme.colors.gray};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxs};
    }
`;

export const ShortcutBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: ${({ theme }) => theme.colors.white};
    font-size: 0.65vw;
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.gray};
    white-space: nowrap;
    flex-shrink: 0;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxs};
    }
`;

export const Key = styled.kbd`
    background: rgba(0, 0, 0, 0.07);
    border-radius: 3px;
    padding: 0.05rem 0.3rem;
    font-size: inherit;
    font-family: inherit;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.12);
`;
