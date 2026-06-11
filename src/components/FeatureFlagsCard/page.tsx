"use client";

import { useEffect, useRef } from "react";

import {
    FlagDescription,
    FlagInfo,
    FlagName,
    FlagRow,
    FlagsCard,
    FlagsCardDescription,
    FlagsCardHeader,
    FlagsCardIcon,
    FlagsCardTitle,
    FlagsHeaderText,
    FlagsList,
    Key,
    ShortcutBadge,
    ToggleInput,
    ToggleLabel,
    ToggleThumb,
    ToggleTrack,
} from "./styled";
import { useFeatureFlags } from "@/context/featureFlags/featureFlags.context";

const COLOR = "#06b6d4";

// Maps flag index → physical key code, layout-agnostic
const SHORTCUT_CODES = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5"];

export default function FeatureFlagsCard() {
    const { flags, toggleFlag } = useFeatureFlags();
    const flagsRef = useRef(flags);

    useEffect(() => {
        flagsRef.current = flags;
    }, [flags]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            if (!e.shiftKey) return;
            const idx = SHORTCUT_CODES.indexOf(e.code);
            if (idx !== -1 && idx < flagsRef.current.length) {
                toggleFlag(flagsRef.current[idx].id);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [toggleFlag]);

    return (
        <FlagsCard $color={COLOR}>
            <FlagsCardHeader>
                <FlagsCardIcon>🚩</FlagsCardIcon>
                <FlagsHeaderText>
                    <FlagsCardTitle>Feature Flags</FlagsCardTitle>
                    <FlagsCardDescription>
                        Ative ou desative funcionalidades em tempo real. Estado salvo no localStorage.
                    </FlagsCardDescription>
                </FlagsHeaderText>
            </FlagsCardHeader>

            <FlagsList>
                {flags.map((flag) => {
                    const parts = flag.shortcut?.split("+") ?? [];
                    return (
                        <FlagRow key={flag.id}>
                            <FlagInfo>
                                <FlagName>{flag.name}</FlagName>
                                <FlagDescription>{flag.description}</FlagDescription>
                            </FlagInfo>
                            {parts.length > 0 && (
                                <ShortcutBadge>
                                    {parts.map((part, i) => (
                                        <span key={i}>
                                            {i > 0 && "+"}
                                            <Key>{part}</Key>
                                        </span>
                                    ))}
                                </ShortcutBadge>
                            )}
                            <ToggleLabel htmlFor={`flag-${flag.id}`}>
                                <ToggleInput
                                    id={`flag-${flag.id}`}
                                    type="checkbox"
                                    checked={flag.enabled}
                                    onChange={() => toggleFlag(flag.id)}
                                />
                                <ToggleTrack $enabled={flag.enabled} $color={COLOR}>
                                    <ToggleThumb $enabled={flag.enabled} />
                                </ToggleTrack>
                            </ToggleLabel>
                        </FlagRow>
                    );
                })}
            </FlagsList>
        </FlagsCard>
    );
}
