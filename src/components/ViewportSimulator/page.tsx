"use client";

import { useEffect, useRef, useState } from "react";

import {
    ApplyBtn,
    CustomInput,
    CustomRow,
    CustomRowLabel,
    DimensionBlock,
    DimensionLabel,
    DimensionSeparator,
    DimensionValue,
    DimensionsRow,
    PresetBtn,
    PresetIcon,
    PresetInfo,
    PresetName,
    PresetSize,
    PresetsGrid,
    ResetBtn,
    ViewportCard,
    ViewportCardDescription,
    ViewportCardHeader,
    ViewportCardIcon,
    ViewportCardTitle,
    ViewportHeaderText,
} from "./styled";

interface ViewportPreset {
    name: string;
    width: number;
    height: number;
    icon: string;
}

const PRESETS: ViewportPreset[] = [
    { name: "Mobile",  width: 375,  height: 812,  icon: "📱" },
    { name: "Tablet",  width: 768,  height: 1024, icon: "📟" },
    { name: "Laptop",  width: 1280, height: 800,  icon: "💻" },
    { name: "Desktop", width: 1440, height: 900,  icon: "🖥️" },
];

const COLOR = "#7c3aed";
const STYLE_ID = "viewport-simulator-style";

function getOrCreateStyleTag(): HTMLStyleElement {
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!el) {
        el = document.createElement("style");
        el.id = STYLE_ID;
        document.head.appendChild(el);
    }
    return el;
}

function removeStyleTag() {
    document.getElementById(STYLE_ID)?.remove();
}

export default function ViewportSimulator() {
    const [isMounted, setIsMounted] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [activePreset, setActivePreset] = useState<string | null>(null);
    const [customWidth, setCustomWidth] = useState("");

    const observerRef = useRef<ResizeObserver | null>(null);

    useEffect(() => { setIsMounted(true); }, []);

    useEffect(() => {
        if (!isMounted) return;

        const update = () =>
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        update();

        observerRef.current = new ResizeObserver(update);
        observerRef.current.observe(document.documentElement);

        return () => {
            observerRef.current?.disconnect();
            removeStyleTag();
        };
    }, [isMounted]);

    const applyWidth = (width: number, presetName: string | null) => {
        const tag = getOrCreateStyleTag();
        tag.textContent = `
            html { background: rgba(0,0,0,0.35) !important; }
            body { max-width: ${width}px !important; margin: 0 auto !important; box-sizing: border-box !important; }
        `;
        setActivePreset(presetName);
    };

    const handlePreset = (preset: ViewportPreset) => {
        if (activePreset === preset.name) {
            handleReset();
            return;
        }
        applyWidth(preset.width, preset.name);
    };

    const handleCustomApply = () => {
        const w = parseInt(customWidth, 10);
        if (!w || w < 200 || w > 3840) return;
        applyWidth(w, "custom");
    };

    const handleReset = () => {
        removeStyleTag();
        setActivePreset(null);
    };

    if (!isMounted) return null;

    const activePresetData = PRESETS.find((p) => p.name === activePreset);

    return (
        <ViewportCard $color={COLOR}>
            <ViewportCardHeader>
                <ViewportCardIcon>📐</ViewportCardIcon>
                <ViewportHeaderText>
                    <ViewportCardTitle>Viewport Simulator</ViewportCardTitle>
                    <ViewportCardDescription>
                        Simule diferentes tamanhos de tela via CSS injection no body.
                    </ViewportCardDescription>
                </ViewportHeaderText>
            </ViewportCardHeader>

            <PresetsGrid>
                {PRESETS.map((preset) => (
                    <PresetBtn
                        key={preset.name}
                        $active={activePreset === preset.name}
                        $color={COLOR}
                        onClick={() => handlePreset(preset)}
                    >
                        <PresetIcon>{preset.icon}</PresetIcon>
                        <PresetInfo>
                            <PresetName $active={activePreset === preset.name} $color={COLOR}>
                                {preset.name}
                            </PresetName>
                            <PresetSize>{preset.width} × {preset.height}</PresetSize>
                        </PresetInfo>
                    </PresetBtn>
                ))}
            </PresetsGrid>

            <CustomRow>
                <CustomRowLabel>Custom</CustomRowLabel>
                <CustomInput
                    type="number"
                    placeholder="ex: 1024"
                    min={200}
                    max={3840}
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCustomApply()}
                />
                <ApplyBtn $color={COLOR} onClick={handleCustomApply}>
                    Aplicar
                </ApplyBtn>
            </CustomRow>

            <DimensionsRow>
                <DimensionBlock>
                    <DimensionLabel>Janela real</DimensionLabel>
                    <DimensionValue>
                        {windowSize.width} × {windowSize.height}
                    </DimensionValue>
                </DimensionBlock>

                <DimensionSeparator />

                <DimensionBlock>
                    <DimensionLabel>Simulando</DimensionLabel>
                    <DimensionValue $color={activePreset ? COLOR : undefined}>
                        {activePreset === "custom"
                            ? `${customWidth}px`
                            : activePresetData
                            ? `${activePresetData.width} × ${activePresetData.height}`
                            : "—"}
                    </DimensionValue>
                </DimensionBlock>

                <ResetBtn disabled={!activePreset} onClick={handleReset}>
                    ↺ Resetar
                </ResetBtn>
            </DimensionsRow>
        </ViewportCard>
    );
}
