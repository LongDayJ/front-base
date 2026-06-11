"use client";

import {
    ChipCheck,
    ChipDot,
    ChipsWrap,
    FilterChip,
    FilterColumn,
    FilterColumnLabel,
    FilterColumnsRow,
    FilterPanel,
    FilterPanelInner,
} from "@/components/ProjectCards/styled";
import {
    type ProgressRange,
    type SortOption,
    type Status,
    STATUS_OPTIONS,
    PROGRESS_OPTIONS,
    SORT_OPTIONS,
} from "./filters";

export interface FilterColumnsProps {
    open: boolean;
    selectedStatuses: Status[];
    progressRange: ProgressRange;
    sortBy: SortOption;
    onToggleStatus: (s: Status) => void;
    onProgressRange: (r: ProgressRange) => void;
    onSortBy: (s: SortOption) => void;
}

export default function FilterColumns({
    open,
    selectedStatuses,
    progressRange,
    sortBy,
    onToggleStatus,
    onProgressRange,
    onSortBy,
}: FilterColumnsProps) {
    return (
        <FilterPanel $open={open}>
            <FilterPanelInner>
                <FilterColumnsRow>
                    <FilterColumn>
                        <FilterColumnLabel>Status</FilterColumnLabel>
                        <ChipsWrap>
                            {STATUS_OPTIONS.map((opt) => {
                                const active = selectedStatuses.includes(opt.value);
                                return (
                                    <FilterChip
                                        key={opt.value}
                                        $active={active}
                                        $color={opt.color}
                                        onClick={() => onToggleStatus(opt.value)}
                                    >
                                        <ChipDot $color={opt.color} />
                                        {opt.label}
                                        {active && <ChipCheck $active $color={opt.color}>✓</ChipCheck>}
                                    </FilterChip>
                                );
                            })}
                        </ChipsWrap>
                    </FilterColumn>

                    <FilterColumn>
                        <FilterColumnLabel>Progresso</FilterColumnLabel>
                        <ChipsWrap>
                            {PROGRESS_OPTIONS.map((opt) => {
                                const active = progressRange === opt.value;
                                return (
                                    <FilterChip
                                        key={opt.value}
                                        $active={active}
                                        onClick={() => onProgressRange(opt.value)}
                                    >
                                        <ChipCheck $active={active}>{active && "●"}</ChipCheck>
                                        {opt.label}
                                    </FilterChip>
                                );
                            })}
                        </ChipsWrap>
                    </FilterColumn>

                    <FilterColumn>
                        <FilterColumnLabel>Ordenar por</FilterColumnLabel>
                        <ChipsWrap>
                            {SORT_OPTIONS.map((opt) => {
                                const active = sortBy === opt.value;
                                return (
                                    <FilterChip
                                        key={opt.value}
                                        $active={active}
                                        onClick={() => onSortBy(opt.value)}
                                    >
                                        <ChipCheck $active={active}>{active && "●"}</ChipCheck>
                                        {opt.label}
                                    </FilterChip>
                                );
                            })}
                        </ChipsWrap>
                    </FilterColumn>
                </FilterColumnsRow>
            </FilterPanelInner>
        </FilterPanel>
    );
}
