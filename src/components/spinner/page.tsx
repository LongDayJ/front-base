"use client";

import { LoadingContainer, LoadingSpinner, LoadingText } from "./styled";

interface LoadingProps {
    text?: string;
    height?: string;
    width?: string;
    heightSpinner?: string;
    widthSpinner?: string;
}

export default function Loading({
    text = "Carregando...",
    height = "100%",
    width = "100%",
    heightSpinner = "clamp(40px, 5vw, 64px)",
    widthSpinner = "clamp(40px, 5vw, 64px)",
}: LoadingProps) {
    return (
        <LoadingContainer $height={height} $width={width}>
            <LoadingSpinner $height={heightSpinner} $width={widthSpinner} />

            {text === "" ? <></> : <LoadingText>{text}</LoadingText>}
        </LoadingContainer>
    );
}