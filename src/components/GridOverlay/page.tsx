"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
    CardFooterRow,
    ColorHexText,
    ColorPickerInput,
    ColorPickerWrapper,
    ControlLabel,
    ControlRow,
    ControlValue,
    ControlsSection,
    FooterHint,
    GridCard,
    GridCardDescription,
    GridCardHeader,
    GridCardIcon,
    GridCardTitle,
    GridColumn,
    GridHeaderText,
    GridOverlayEl,
    GridRow,
    GridRowsOverlayEl,
    Key,
    RangeSlider,
    ShortcutBadge,
    ToggleInput,
    ToggleLabel,
    ToggleThumb,
    ToggleTrack,
} from "./styled";

interface GridConfig {
    columns: number;
    rows: number;
    color: string;
    opacity: number;
    gutter: number;
    enabled: boolean;
}

const DEFAULT_CONFIG: GridConfig = {
    columns: 12,
    rows: 0,
    color: "#8b5cf6",
    opacity: 0.1,
    gutter: 24,
    enabled: false,
};

const STORAGE_KEY = "dev:grid-overlay";
const CARD_COLOR = "#8b5cf6";

export default function GridOverlay() {
    const [isMounted, setIsMounted] = useState(false);
    const [config, setConfig] = useState<GridConfig>(DEFAULT_CONFIG);
    const configRef = useRef(config);

    useEffect(() => { setIsMounted(true); }, []);

    useEffect(() => {
        if (!isMounted) return;
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(saved) });
        } catch {}
    }, [isMounted]);

    useEffect(() => {
        configRef.current = config;
    }, [config]);

    const updateConfig = useCallback((patch: Partial<GridConfig>) => {
        setConfig((prev) => {
            const next = { ...prev, ...patch };
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
            return next;
        });
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const handler = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            if (e.shiftKey && e.key === "G") {
                updateConfig({ enabled: !configRef.current.enabled });
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isMounted, updateConfig]);

    if (!isMounted) return null;

    return (
        <>
            {config.enabled && (
                <GridOverlayEl $columns={config.columns} $gutter={config.gutter}>
                    {Array.from({ length: config.columns }).map((_, i) => (
                        <GridColumn key={i} $color={config.color} $opacity={config.opacity} />
                    ))}
                </GridOverlayEl>
            )}
            {config.enabled && config.rows > 0 && (
                <GridRowsOverlayEl $rows={config.rows} $gutter={config.gutter}>
                    {Array.from({ length: config.rows }).map((_, i) => (
                        <GridRow key={i} $color={config.color} $opacity={config.opacity} />
                    ))}
                </GridRowsOverlayEl>
            )}

            <GridCard $color={CARD_COLOR}>
                <GridCardHeader>
                    <GridCardIcon>⊞</GridCardIcon>
                    <GridHeaderText>
                        <GridCardTitle>Grid Overlay</GridCardTitle>
                        <GridCardDescription>
                            Sobreposição de grid visual com colunas configuráveis em tempo real.
                        </GridCardDescription>
                    </GridHeaderText>
                    <ToggleLabel>
                        <ToggleInput
                            type="checkbox"
                            checked={config.enabled}
                            onChange={(e) => updateConfig({ enabled: e.target.checked })}
                        />
                        <ToggleTrack $enabled={config.enabled} $color={CARD_COLOR}>
                            <ToggleThumb $enabled={config.enabled} />
                        </ToggleTrack>
                    </ToggleLabel>
                </GridCardHeader>

                <ControlsSection>
                    <ControlRow>
                        <ControlLabel>Colunas</ControlLabel>
                        <RangeSlider
                            type="range"
                            $color={CARD_COLOR}
                            min={1}
                            max={24}
                            step={1}
                            value={config.columns}
                            onChange={(e) => updateConfig({ columns: parseInt(e.target.value, 10) })}
                        />
                        <ControlValue>{config.columns}</ControlValue>
                    </ControlRow>

                    <ControlRow>
                        <ControlLabel>Linhas</ControlLabel>
                        <RangeSlider
                            type="range"
                            $color={CARD_COLOR}
                            min={0}
                            max={24}
                            step={1}
                            value={config.rows}
                            onChange={(e) => updateConfig({ rows: parseInt(e.target.value, 10) })}
                        />
                        <ControlValue>{config.rows || "—"}</ControlValue>
                    </ControlRow>

                    <ControlRow>
                        <ControlLabel>Gutter</ControlLabel>
                        <RangeSlider
                            type="range"
                            $color={CARD_COLOR}
                            min={0}
                            max={64}
                            step={4}
                            value={config.gutter}
                            onChange={(e) => updateConfig({ gutter: parseInt(e.target.value, 10) })}
                        />
                        <ControlValue>{config.gutter}px</ControlValue>
                    </ControlRow>

                    <ControlRow>
                        <ControlLabel>Opacidade</ControlLabel>
                        <RangeSlider
                            type="range"
                            $color={CARD_COLOR}
                            min={0.01}
                            max={0.5}
                            step={0.01}
                            value={config.opacity}
                            onChange={(e) => updateConfig({ opacity: parseFloat(e.target.value) })}
                        />
                        <ControlValue>{Math.round(config.opacity * 100)}%</ControlValue>
                    </ControlRow>

                    <ControlRow>
                        <ControlLabel>Cor</ControlLabel>
                        <ColorPickerWrapper>
                            <ColorPickerInput
                                type="color"
                                value={config.color}
                                onChange={(e) => updateConfig({ color: e.target.value })}
                            />
                            <ColorHexText>{config.color}</ColorHexText>
                        </ColorPickerWrapper>
                    </ControlRow>
                </ControlsSection>

                <CardFooterRow>
                    <FooterHint>Atalho de teclado para ligar/desligar</FooterHint>
                    <ShortcutBadge>
                        <Key>Shift</Key>+<Key>G</Key>
                    </ShortcutBadge>
                </CardFooterRow>
            </GridCard>
        </>
    );
}
