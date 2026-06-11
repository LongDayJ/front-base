"use client";

import {
    ProgressBarFill,
    ProgressBarLabel,
    ProgressBarPct,
    ProgressBarRow,
    ProgressBarSub,
    ProgressBarTrack,
    ProgressSection,
} from "@/components/ProjectCards/styled";

interface ProgressBarProps {
    value: number;
    color: string;
    filtered: number;
    total: number;
}

export default function ProgressBar({ value, color, filtered, total }: ProgressBarProps) {
    return (
        <ProgressSection>
            <ProgressBarLabel>Progresso médio</ProgressBarLabel>
            <ProgressBarRow>
                <ProgressBarTrack>
                    <ProgressBarFill $value={value} $color={color} />
                </ProgressBarTrack>
                <ProgressBarPct $color={color}>{value}%</ProgressBarPct>
            </ProgressBarRow>
            <ProgressBarSub>{filtered} de {total} projetos</ProgressBarSub>
        </ProgressSection>
    );
}
