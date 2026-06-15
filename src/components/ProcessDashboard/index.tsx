"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { mockProcesses, type Process } from "./mock";

const LS_KEY = 'ministerio_processes';

import SummaryCard from "@/components/SummaryCard";
import ProcessTable from "@/components/ProcessTable";
import {
    ControlsCard, ControlsWrapper, MiniChip, MiniCount, MiniLabelFull, MiniLabelShort,
    MiniSummaryBar, PageWrapper, SummaryRow,
} from "./styled";
import {
    ClearButton,
    FilterActiveBadge,
    FilterChevron,
    FilterChip,
    FilterColumn,
    FilterColumnLabel,
    FilterPanel,
    FilterPanelInner,
    FilterColumnsRow,
    FilterToggleBtn,
    ChipsWrap,
    ChipDot,
    ChipCheck,
    SearchAndFilterRow,
    SearchInput,
    SearchWrapper,
    RightControls,
} from "@/components/ProjectCards/styled";

/* ─── Ícones ────────────────────────────────────────────── */

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
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
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

function IconDatabase() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    );
}

function IconCheckCircle() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="9 12 11 14 15 10" />
        </svg>
    );
}

function IconXCircle() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
        </svg>
    );
}

function IconPlusCircle() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
        </svg>
    );
}

/* ─── Dados dos chips ───────────────────────────────────── */

const STATUS_OPTIONS: { value: Process['status']; label: string; color: string }[] = [
    { value: 'Finalizado',             label: 'Finalizado',             color: '#34a853' },
    { value: 'Sobrestado',             label: 'Sobrestado',             color: '#f57c00' },
    { value: 'Aguardando área técnica', label: 'Aguardando área técnica', color: '#1a73e8' },
    { value: 'Área técnica retornou',   label: 'Área técnica retornou',   color: '#9c27b0' },
];

const TIPO_OPTIONS: { value: Process['tipo']; label: string; color: string }[] = [
    { value: 'novo',        label: 'Novo',        color: '#34a853' },
    { value: 'atualizacao', label: 'Atualização', color: '#1a73e8' },
];

/* ─── Utilidade ─────────────────────────────────────────── */

function normalize(str: string) {
    return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/* ─── Componente ────────────────────────────────────────── */

export default function ProcessDashboard() {
    const [processes, setProcesses] = useState<Process[]>(mockProcesses);
    const [collapsed, setCollapsed] = useState(false);
    const summaryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(LS_KEY);
            if (stored) setProcesses(JSON.parse(stored) as Process[]);
        } catch {
            // ignore
        }
    }, []);

    useEffect(() => {
        const el = summaryRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setCollapsed(!entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    const [searchNup,     setSearchNup]     = useState('');
    const [searchAssunto, setSearchAssunto] = useState('');
    const [searchObs,     setSearchObs]     = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState<Process['status'][]>([]);
    const [selectedTipos, setSelectedTipos] = useState<Process['tipo'][]>([]);
    const [filtersOpen, setFiltersOpen] = useState(false);

    function updateProcess(updated: Process) {
        setProcesses((prev) => {
            const next = prev.map((p) => p.id === updated.id ? updated : p);
            localStorage.setItem(LS_KEY, JSON.stringify(next));
            return next;
        });
    }

    function deleteProcess(id: string) {
        setProcesses((prev) => {
            const next = prev.filter((p) => p.id !== id);
            localStorage.setItem(LS_KEY, JSON.stringify(next));
            return next;
        });
    }

    function toggleStatus(s: Process['status']) {
        setSelectedStatuses((prev) =>
            prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
        );
    }

    function toggleTipo(t: Process['tipo']) {
        setSelectedTipos((prev) =>
            prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
        );
    }

    function clearFilters() {
        setSelectedStatuses([]);
        setSelectedTipos([]);
        setSearchNup('');
        setSearchAssunto('');
        setSearchObs('');
    }

    const hasSearch = searchNup.trim() || searchAssunto.trim() || searchObs.trim();
    const activeFilterCount = selectedStatuses.length + selectedTipos.length + (hasSearch ? 1 : 0);
    const hasActiveFilters = activeFilterCount > 0;

    const filtered = useMemo(() => {
        const qNup     = normalize(searchNup.trim());
        const qAssunto = normalize(searchAssunto.trim());
        const qObs     = normalize(searchObs.trim());
        return processes.filter((p: Process) => {
            if (selectedStatuses.length && !selectedStatuses.includes(p.status)) return false;
            if (selectedTipos.length && !selectedTipos.includes(p.tipo)) return false;
            if (qNup     && !normalize(p.nup).includes(qNup)) return false;
            if (qAssunto && !normalize(p.assunto).includes(qAssunto)) return false;
            if (qObs     && !normalize(p.observacoes ?? '').includes(qObs)) return false;
            return true;
        });
    }, [processes, searchNup, searchAssunto, searchObs, selectedStatuses, selectedTipos]);

    const total       = processes.length;
    const finalizados = processes.filter((p) => p.status === 'Finalizado').length;
    const sobrestados = processes.filter((p) => p.status === 'Sobrestado').length;
    const novos       = processes.filter((p) => p.tipo === 'novo').length;

    const miniItems = [
        { label: "Total",  fullLabel: "Total",        count: total,       color: "#9e9e9e" },
        { label: "Final.", fullLabel: "Finalizados",  count: finalizados, color: "#34a853" },
        { label: "Sobr.",  fullLabel: "Sobrestados",  count: sobrestados, color: "#f57c00" },
        { label: "Novos",  fullLabel: "Novos PCDTs",  count: novos,       color: "#1a73e8" },
    ];

    return (
        <PageWrapper>
            <SummaryRow ref={summaryRef} $collapsed={collapsed}>
                <SummaryCard label="Total de Processos" count={total}       sublabel="registros cadastrados"    borderColor="#9e9e9e" icon={<IconDatabase />}    />
                <SummaryCard label="Finalizados"         count={finalizados} sublabel="publicados / encerrados"  borderColor="#34a853" icon={<IconCheckCircle />} />
                <SummaryCard label="Sobrestados"          count={sobrestados} sublabel="sobrestados / aguardando" borderColor="#f57c00" icon={<IconXCircle />}     />
                <SummaryCard label="Novos PCDTs"         count={novos}       sublabel="elaboração inicial"       borderColor="#1a73e8" icon={<IconPlusCircle />}  />
            </SummaryRow>

            <ControlsWrapper>
            <MiniSummaryBar $visible={collapsed}>
                {miniItems.map(({ label, fullLabel, count, color }) => (
                    <MiniChip key={label} $color={color}>
                        <MiniCount $color={color}>{count}</MiniCount>
                        <MiniLabelFull>{fullLabel}</MiniLabelFull>
                        <MiniLabelShort>{label}</MiniLabelShort>
                    </MiniChip>
                ))}
            </MiniSummaryBar>
            <ControlsCard $filtersOpen={filtersOpen}>
                <RightControls>
                    <SearchAndFilterRow>
                        <SearchWrapper>
                            <IconSearch />
                            <SearchInput
                                placeholder="NUP..."
                                value={searchNup}
                                onChange={(e) => setSearchNup(e.target.value)}
                            />
                        </SearchWrapper>
                        <SearchWrapper>
                            <IconSearch />
                            <SearchInput
                                placeholder="Assunto..."
                                value={searchAssunto}
                                onChange={(e) => setSearchAssunto(e.target.value)}
                            />
                        </SearchWrapper>
                        <SearchWrapper>
                            <IconSearch />
                            <SearchInput
                                placeholder="Observações..."
                                value={searchObs}
                                onChange={(e) => setSearchObs(e.target.value)}
                            />
                        </SearchWrapper>

                        <FilterToggleBtn
                            $open={filtersOpen}
                            $hasFilters={hasActiveFilters}
                            onClick={() => setFiltersOpen((o) => !o)}
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
                            <ClearButton onClick={clearFilters}>Limpar</ClearButton>
                        )}
                    </SearchAndFilterRow>
                </RightControls>
            </ControlsCard>

            <FilterPanel $open={filtersOpen}>
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
                                            onClick={() => toggleStatus(opt.value)}
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
                            <FilterColumnLabel>Tipo</FilterColumnLabel>
                            <ChipsWrap>
                                {TIPO_OPTIONS.map((opt) => {
                                    const active = selectedTipos.includes(opt.value);
                                    return (
                                        <FilterChip
                                            key={opt.value}
                                            $active={active}
                                            $color={opt.color}
                                            onClick={() => toggleTipo(opt.value)}
                                        >
                                            <ChipCheck $active={active} $color={opt.color} />
                                            {opt.label}
                                        </FilterChip>
                                    );
                                })}
                            </ChipsWrap>
                        </FilterColumn>
                    </FilterColumnsRow>
                </FilterPanelInner>
            </FilterPanel>
            </ControlsWrapper>

            <ProcessTable processes={filtered} onUpdate={updateProcess} onDelete={deleteProcess} />
        </PageWrapper>
    );
}
