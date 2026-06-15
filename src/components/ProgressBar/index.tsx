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
    collapsed?: boolean;
}

export default function ProgressBar({ value, color, filtered, total, collapsed }: ProgressBarProps) {
    return (
        <ProgressSection $collapsed={collapsed}>
            <ProgressBarLabel $collapsed={collapsed}>Progresso médio</ProgressBarLabel>
            <ProgressBarRow>
                <ProgressBarTrack $collapsed={collapsed}>
                    <ProgressBarFill $value={value} $color={color} />
                </ProgressBarTrack>
                <ProgressBarPct $color={color} $collapsed={collapsed}>{value}%</ProgressBarPct>
            </ProgressBarRow>
            <ProgressBarSub $collapsed={collapsed}>{filtered} de {total} projetos</ProgressBarSub>
        </ProgressSection>
    );
}
