"use client";

import styled, { keyframes } from "styled-components";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

interface LoadingContainerProps {
    $height: string;
    $width: string;
}

export const LoadingContainer = styled.div<LoadingContainerProps>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 2vh;
`;

export const LoadingSpinner = styled.div<LoadingContainerProps>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};

    border-radius: 100%;

    border: clamp(2px, 0.35vw, 4px) solid ${({ theme }) => theme.colors.grayUltraLight};

    border-top: clamp(2px, 0.35vw, 4px) solid ${({ theme }) => theme.colors.greenBackground};

    animation: ${spin} 0.8s linear infinite;
`;

export const LoadingText = styled.span`
    font-size: clamp(0.85rem, 1.5vw, 1rem);
    font-weight: ${({ theme }) => theme.fontWeights.medium};

    font-family: ${({ theme }) => theme.fonts.sans};

    color: ${({ theme }) => theme.colors.greenDark};
`;