"use client";

import { type Status } from "@/components/ProjectCards/mock";
import { TopBar } from "@/components/ProjectCards/styled";
import {
    type ProgressRange,
    type SortOption,
} from "@/components/FilterColumn/filters";
import FilterColumns from "@/components/FilterColumn";
import ProgressBar from "@/components/ProgressBar";
import SearchFilterBar from "@/components/SearchFilterBar";

export interface ProjectCardsHeaderProps {
    avgProgress: number;
    avgColor: string;
    filtered: number;
    total: number;
    searchName: string;
    onSearchName: (v: string) => void;
    searchState: string;
    onSearchState: (v: string) => void;
    searchResponsible: string;
    onSearchResponsible: (v: string) => void;
    filtersOpen: boolean;
    onToggleFilters: () => void;
    activeFilterCount: number;
    hasActiveFilters: boolean;
    onClear: () => void;
    selectedStatuses: Status[];
    progressRange: ProgressRange;
    sortBy: SortOption;
    onToggleStatus: (s: Status) => void;
    onProgressRange: (r: ProgressRange) => void;
    onSortBy: (s: SortOption) => void;
}

export default function ProjectCardsHeader({
    avgProgress,
    avgColor,
    filtered,
    total,
    searchName,
    onSearchName,
    searchState,
    onSearchState,
    searchResponsible,
    onSearchResponsible,
    filtersOpen,
    onToggleFilters,
    activeFilterCount,
    hasActiveFilters,
    onClear,
    selectedStatuses,
    progressRange,
    sortBy,
    onToggleStatus,
    onProgressRange,
    onSortBy,
}: ProjectCardsHeaderProps) {
    return (
        <>
            <TopBar $filtersOpen={filtersOpen}>
                <ProgressBar
                    value={avgProgress}
                    color={avgColor}
                    filtered={filtered}
                    total={total}
                />
                <SearchFilterBar
                    searchName={searchName}
                    onSearchName={onSearchName}
                    searchState={searchState}
                    onSearchState={onSearchState}
                    searchResponsible={searchResponsible}
                    onSearchResponsible={onSearchResponsible}
                    filtersOpen={filtersOpen}
                    onToggleFilters={onToggleFilters}
                    activeFilterCount={activeFilterCount}
                    hasActiveFilters={hasActiveFilters}
                    onClear={onClear}
                />
            </TopBar>

            <FilterColumns
                open={filtersOpen}
                selectedStatuses={selectedStatuses}
                progressRange={progressRange}
                sortBy={sortBy}
                onToggleStatus={onToggleStatus}
                onProgressRange={onProgressRange}
                onSortBy={onSortBy}
            />
        </>
    );
}
