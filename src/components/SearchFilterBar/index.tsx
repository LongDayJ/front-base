"use client";

import {
    ClearButton,
    FilterActiveBadge,
    FilterChevron,
    FilterToggleBtn,
    RightControls,
    SearchAndFilterRow,
    SearchInput,
    SearchWrapper,
} from "@/components/ProjectCards/styled";

interface SearchFilterBarProps {
    searchName: string;
    onSearchName: (value: string) => void;
    searchState: string;
    onSearchState: (value: string) => void;
    searchResponsible: string;
    onSearchResponsible: (value: string) => void;
    filtersOpen: boolean;
    onToggleFilters: () => void;
    activeFilterCount: number;
    hasActiveFilters: boolean;
    onClear: () => void;
}

function IconSearch() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function IconFilter() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
        </svg>
    );
}

function IconChevron() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

export default function SearchFilterBar({
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
}: SearchFilterBarProps) {
    return (
        <RightControls>
            <SearchAndFilterRow>
                <SearchWrapper>
                    <IconSearch />
                    <SearchInput
                        placeholder="Nome…"
                        value={searchName}
                        onChange={(e) => onSearchName(e.target.value)}
                    />
                </SearchWrapper>

                <SearchWrapper>
                    <IconSearch />
                    <SearchInput
                        placeholder="Estado…"
                        value={searchState}
                        onChange={(e) => onSearchState(e.target.value)}
                    />
                </SearchWrapper>

                <SearchWrapper>
                    <IconSearch />
                    <SearchInput
                        placeholder="Responsável…"
                        value={searchResponsible}
                        onChange={(e) => onSearchResponsible(e.target.value)}
                    />
                </SearchWrapper>

                <FilterToggleBtn
                    $open={filtersOpen}
                    $hasFilters={hasActiveFilters}
                    onClick={onToggleFilters}
                >
                    <IconFilter />
                    Filtros
                    {activeFilterCount > 0 && (
                        <FilterActiveBadge>{activeFilterCount}</FilterActiveBadge>
                    )}
                    <FilterChevron $open={filtersOpen}>
                        <IconChevron />
                    </FilterChevron>
                </FilterToggleBtn>

                {hasActiveFilters && (
                    <ClearButton onClick={onClear}>Limpar</ClearButton>
                )}
            </SearchAndFilterRow>
        </RightControls>
    );
}
