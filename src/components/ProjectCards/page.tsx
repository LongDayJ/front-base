"use client";

import { useState, useMemo } from "react";
import { type Status, MOCK_ITEMS } from "./mock";
import {
    type ProgressRange,
    type SortOption,
    STATUS_BADGE_LABELS,
    inProgressRange,
    progressColor,
} from "@/components/FilterColumn/filters";
import {
    ActionsRow,
    CardTopRow,
    CardTitleText,
    CardWrapper,
    CardsGrid,
    DateBadge,
    Divider,
    EmptyState,
    FieldLabel,
    FieldRow,
    FieldsList,
    FieldValue,
    FieldsAndProgress,
    IconButton,
    ObsValue,
    PageWrapper,
    ProgressLabel,
    ProgressWrapper,
    StatusBadge,
} from "./styled";
import ProjectCardsHeader from "@/components/ProjectCardsHeader";

/* ─── SVG Icons ─────────────────────────────────────────── */

function IconPrint() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
        </svg>
    );
}
function IconEdit() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
    );
}
function IconTrash() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
    );
}

/* ─── Progress Ring ─────────────────────────────────────── */

function ProgressRing({ value }: { value: number }) {
    const r = 26;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - value / 100);
    const color = progressColor(value);

    return (
        <svg width="68" height="68" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r={r} fill="none" stroke="#e2e8f0" strokeWidth="5" />
            <circle
                cx="35" cy="35" r={r}
                fill="none" stroke={color} strokeWidth="5"
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 35 35)"
                style={{ transition: "stroke-dashoffset 0.45s ease" }}
            />
            <text x="35" y="35" textAnchor="middle" dominantBaseline="central"
                fontSize="12" fontWeight="700" fill={color}>
                {value}%
            </text>
        </svg>
    );
}

/* ─── Component ─────────────────────────────────────────── */

export default function ProjectCards() {
    const [searchName,        setSearchName]       = useState("");
    const [searchState,       setSearchState]      = useState("");
    const [searchResponsible, setSearchResponsible] = useState("");
    const [selectedStatuses,  setSelectedStatuses] = useState<Status[]>([]);
    const [progressRange,     setProgressRange]    = useState<ProgressRange>("all");
    const [sortBy,            setSortBy]           = useState<SortOption>("progress_desc");
    const [filtersOpen,       setFiltersOpen]      = useState(false);

    const activeFilterCount =
        (searchName.trim() ? 1 : 0) +
        (searchState.trim() ? 1 : 0) +
        (searchResponsible.trim() ? 1 : 0) +
        selectedStatuses.length +
        (progressRange !== "all" ? 1 : 0) +
        (sortBy !== "progress_desc" ? 1 : 0);

    const hasActiveFilters = activeFilterCount > 0;

    function toggleStatus(s: Status) {
        setSelectedStatuses((prev) =>
            prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
        );
    }

    function clearFilters() {
        setSearchName("");
        setSearchState("");
        setSearchResponsible("");
        setSelectedStatuses([]);
        setProgressRange("all");
        setSortBy("progress_desc");
    }

    const filtered = useMemo(() => {
        let result = MOCK_ITEMS.filter((item) => {
            if (searchName.trim() && !item.title.toLowerCase().includes(searchName.toLowerCase())) return false;
            if (searchState.trim() && !item.state.toLowerCase().includes(searchState.toLowerCase())) return false;
            if (searchResponsible.trim() && !item.responsible.toLowerCase().includes(searchResponsible.toLowerCase())) return false;
            if (selectedStatuses.length > 0 && !selectedStatuses.includes(item.status)) return false;
            if (!inProgressRange(item.progress, progressRange)) return false;
            return true;
        });

        return [...result].sort((a, b) => {
            switch (sortBy) {
                case "progress_desc":  return b.progress - a.progress;
                case "progress_asc":   return a.progress - b.progress;
                case "name_asc":       return a.title.localeCompare(b.title);
                case "name_desc":      return b.title.localeCompare(a.title);
                case "delivery_asc":   return a.deliveryDateISO.localeCompare(b.deliveryDateISO);
                case "delivery_desc":  return b.deliveryDateISO.localeCompare(a.deliveryDateISO);
                default:               return 0;
            }
        });
    }, [searchName, searchState, searchResponsible, selectedStatuses, progressRange, sortBy]);

    const avgProgress = filtered.length > 0
        ? Math.round(filtered.reduce((sum, i) => sum + i.progress, 0) / filtered.length)
        : 0;

    const avgColor = progressColor(avgProgress);

    return (
        <PageWrapper>
            <ProjectCardsHeader
                avgProgress={avgProgress}
                avgColor={avgColor}
                filtered={filtered.length}
                total={MOCK_ITEMS.length}
                searchName={searchName}
                onSearchName={setSearchName}
                searchState={searchState}
                onSearchState={setSearchState}
                searchResponsible={searchResponsible}
                onSearchResponsible={setSearchResponsible}
                filtersOpen={filtersOpen}
                onToggleFilters={() => setFiltersOpen((v) => !v)}
                activeFilterCount={activeFilterCount}
                hasActiveFilters={hasActiveFilters}
                onClear={clearFilters}
                selectedStatuses={selectedStatuses}
                progressRange={progressRange}
                sortBy={sortBy}
                onToggleStatus={toggleStatus}
                onProgressRange={setProgressRange}
                onSortBy={setSortBy}
            />

            {/* ── Grid de cards ── */}
            <CardsGrid>
                {filtered.length === 0 ? (
                    <EmptyState>Nenhum projeto encontrado para os filtros aplicados.</EmptyState>
                ) : (
                    filtered.map((item) => (
                        <CardWrapper key={item.id}>
                            <CardTopRow>
                                <CardTitleText>{item.title}</CardTitleText>
                                <StatusBadge $status={item.status}>
                                    {STATUS_BADGE_LABELS[item.status]}
                                </StatusBadge>
                            </CardTopRow>

                            <CardTopRow>
                                <DateBadge>Previsão de Entrega: {item.deliveryDate}</DateBadge>
                                <ActionsRow>
                                    <IconButton title="Imprimir"><IconPrint /></IconButton>
                                    <IconButton title="Editar"><IconEdit /></IconButton>
                                    <IconButton title="Excluir"><IconTrash /></IconButton>
                                </ActionsRow>
                            </CardTopRow>

                            <Divider />

                            <FieldsAndProgress>
                                <FieldsList>
                                    <FieldRow>
                                        <FieldLabel>Estado:</FieldLabel>
                                        <FieldValue>{item.state}</FieldValue>
                                    </FieldRow>
                                    <FieldRow>
                                        <FieldLabel>Responsável:</FieldLabel>
                                        <FieldValue>{item.responsible}</FieldValue>
                                    </FieldRow>
                                    <FieldRow style={{ alignItems: "flex-start" }}>
                                        <FieldLabel>Observações:</FieldLabel>
                                        <ObsValue>{item.observations}</ObsValue>
                                    </FieldRow>
                                </FieldsList>

                                <ProgressWrapper>
                                    <ProgressRing value={item.progress} />
                                    <ProgressLabel>Progresso</ProgressLabel>
                                </ProgressWrapper>
                            </FieldsAndProgress>
                        </CardWrapper>
                    ))
                )}
            </CardsGrid>
        </PageWrapper>
    );
}
