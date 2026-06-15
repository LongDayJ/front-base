"use client";

import Loading from "@/components/spinner/page";
import { useState } from "react";
import styled from "styled-components";

type DemoId = "default" | "no-text" | "inline";

const DEMOS: { id: DemoId; label: string; height: string; props: React.ComponentProps<typeof Loading> }[] = [
    { id: "default",  label: "Full screen (padrão)", height: "240px", props: {} },
    { id: "no-text",  label: "Sem texto",            height: "160px", props: { text: "" } },
    { id: "inline",   label: "Inline (botão)",       height: "80px",  props: { text: "", heightSpinner: "24px", widthSpinner: "24px" } },
];

export default function LoadingPreviewPage() {
    const [expanded, setExpanded] = useState<DemoId | null>(null);

    const active = DEMOS.find((d) => d.id === expanded);

    return (
        <Wrapper>
            {DEMOS.map((demo) => (
                <Section key={demo.id}>
                    <Label>{demo.label}</Label>
                    <Demo $height={demo.height} onClick={() => setExpanded(demo.id)} title="Clique para expandir">
                        <Loading {...demo.props} />
                        <ExpandHint>↗ expandir</ExpandHint>
                    </Demo>
                </Section>
            ))}

            {active && (
                <Overlay onClick={() => setExpanded(null)}>
                    <CloseHint>ESC / clique para fechar</CloseHint>
                    <Loading {...active.props} />
                </Overlay>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    min-height: 100vh;
    background: #f0f2f5;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-family: sans-serif;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.p`
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #64748b;
`;

const Demo = styled.div<{ $height: string }>`
    position: relative;
    height: ${({ $height }) => $height};
    background: #fff;
    border: 1px solid #dde3ec;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: box-shadow 0.15s, border-color 0.15s;

    &:hover {
        border-color: #94a3b8;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    }

    &:hover > span {
        opacity: 1;
    }
`;

const ExpandHint = styled.span`
    position: absolute;
    bottom: 0.5rem;
    right: 0.75rem;
    font-size: 0.65rem;
    font-weight: 600;
    color: #94a3b8;
    opacity: 0;
    transition: opacity 0.15s;
    pointer-events: none;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
`;

const CloseHint = styled.span`
    position: fixed;
    top: 1.25rem;
    right: 1.5rem;
    font-size: 0.7rem;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    pointer-events: none;
`;
