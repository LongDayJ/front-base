"use client";

import styled from "styled-components";

/* ─── Page ─────────────────────────────────────────────── */

export const PageWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    background: #f0f2f5;
    padding: 2rem 2.5rem;
    font-family: ${({ theme }) => theme.fonts.sans};

    @media (max-width: 768px) {
        padding: 1.2rem 1rem;
    }
`;

/* ─── Top Bar ───────────────────────────────────────────── */

export const TopBar = styled.div<{ $filtersOpen: boolean }>`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    background: #fff;
    border: 1px solid #dde3ec;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 0;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

export const ProgressSection = styled.div<{ $collapsed?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${({ $collapsed }) => ($collapsed ? '0' : '0.35rem')};
    padding: ${({ $collapsed }) => ($collapsed ? '0.5rem 1rem' : '1rem 1.25rem')};
    border-right: 1px solid #e9edf3;
    transition: padding 0.3s ease, gap 0.3s ease;

    @media (max-width: 760px) {
        border-right: none;
        border-bottom: ${({ $collapsed }) => ($collapsed ? 'none' : '1px solid #e9edf3')};
        transition: padding 0.3s ease, border 0.3s ease;
    }
`;

export const ProgressBarLabel = styled.span<{ $collapsed?: boolean }>`
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #94a3b8;
    max-height: ${({ $collapsed }) => ($collapsed ? '0' : '1.5rem')};
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.2s ease;
`;

export const ProgressBarRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const ProgressBarTrack = styled.div<{ $collapsed?: boolean }>`
    flex: 1;
    height: ${({ $collapsed }) => ($collapsed ? '4px' : '9px')};
    border-radius: 999px;
    background: #e2e8f0;
    overflow: hidden;
    transition: height 0.3s ease;
`;

export const ProgressBarFill = styled.div<{ $value: number; $color: string }>`
    height: 100%;
    width: ${({ $value }) => $value}%;
    background: ${({ $color }) => $color};
    border-radius: 999px;
    transition: width 0.45s ease;
`;

export const ProgressBarPct = styled.span<{ $color: string; $collapsed?: boolean }>`
    font-size: ${({ $collapsed }) => ($collapsed ? '0.75rem' : '1rem')};
    font-weight: 700;
    color: ${({ $color }) => $color};
    min-width: ${({ $collapsed }) => ($collapsed ? '2rem' : '2.8rem')};
    text-align: right;
    font-family: ${({ theme }) => theme.fonts.primary};
    transition: font-size 0.3s ease, min-width 0.3s ease;
`;

export const ProgressBarSub = styled.span<{ $collapsed?: boolean }>`
    font-size: ${({ $collapsed }) => ($collapsed ? '0.62rem' : '0.72rem')};
    color: #94a3b8;
    transition: font-size 0.3s ease;
`;

export const RightControls = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.9rem 1.25rem;
`;

export const SearchAndFilterRow = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 760px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
    }
`;

export const SearchWrapper = styled.div`
    position: relative;
    flex: 1;

    svg {
        position: absolute;
        left: 0.65rem;
        top: 50%;
        transform: translateY(-50%);
        width: 14px;
        height: 14px;
        color: #94a3b8;
        pointer-events: none;
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 0.4rem 0.75rem 0.4rem 2rem;
    border: 1.5px solid #dde3ec;
    border-radius: 7px;
    font-size: 0.8rem;
    color: #1e293b;
    background: #f8fafc;
    outline: none;
    font-family: ${({ theme }) => theme.fonts.sans};
    transition: border-color 0.15s;

    &::placeholder { color: #94a3b8; }
    &:focus { border-color: #1e5fa8; background: #fff; }
`;

export const FilterToggleBtn = styled.button<{ $open: boolean; $hasFilters: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.75rem;
    border-radius: 7px;
    border: 1.5px solid ${({ $open, $hasFilters }) =>
        $open || $hasFilters ? "#1e5fa8" : "#dde3ec"};
    background: ${({ $open }) => ($open ? "#eff6ff" : "#fff")};
    color: ${({ $open, $hasFilters }) =>
        $open || $hasFilters ? "#1e5fa8" : "#475569"};
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.15s;
    font-family: ${({ theme }) => theme.fonts.sans};

    &:hover {
        border-color: #1e5fa8;
        background: #eff6ff;
        color: #1e5fa8;
    }

    svg { width: 13px; height: 13px; }

    @media (max-width: 760px) {
        width: 100%;
        justify-content: center;
    }
`;

export const FilterActiveBadge = styled.span`
    font-size: 0.65rem;
    font-weight: 700;
    color: #fff;
    background: #1e5fa8;
    border-radius: 999px;
    padding: 0.08rem 0.45rem;
    line-height: 1.6;
`;

export const FilterChevron = styled.span<{ $open: boolean }>`
    display: flex;
    align-items: center;
    transition: transform 0.22s ease;
    transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
    svg { width: 13px; height: 13px; }
`;

export const ClearButton = styled.button`
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    border: 1.5px solid #e2e8f0;
    background: transparent;
    color: #64748b;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.15s;
    font-family: ${({ theme }) => theme.fonts.sans};

    &:hover {
        border-color: #dc2626;
        color: #dc2626;
        background: #fef2f2;
    }

    @media (max-width: 760px) {
        grid-column: 1 / -1;
        width: 100%;
    }
`;

/* ─── Filter Panel (expandable below TopBar) ────────────── */

export const FilterPanel = styled.div<{ $open: boolean }>`
    background: #fff;
    border: 1px solid ${({ $open }) => ($open ? "#dde3ec" : "transparent")};
    border-radius: 0 0 10px 10px;
    box-shadow: ${({ $open }) => ($open ? "0 1px 4px rgba(0,0,0,0.05)" : "0 0 0 rgba(0,0,0,0)")};
    overflow: hidden;
    max-height: ${({ $open }) => ($open ? "500px" : "0")};
    margin-bottom: ${({ $open }) => ($open ? "1rem" : "0")};
    transition: max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1),
                margin-bottom 0.55s cubic-bezier(0.4, 0, 0.2, 1),
                border-color 0.55s ease,
                box-shadow 0.55s ease;

    @media (max-width: 760px) {
        max-height: ${({ $open }) => ($open ? "70vh" : "0")};
        overflow-y: ${({ $open }) => ($open ? "auto" : "hidden")};
    }
`;

export const FilterPanelInner = styled.div`
    padding: 1rem 1.25rem 1.1rem;
`;

export const FilterColumnsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`;

export const FilterColumn = styled.div`
    padding: 0 1.1rem;
    border-right: 1px solid #e9edf3;

    &:first-child { padding-left: 0; }
    &:last-child  { padding-right: 0; border-right: none; }

    @media (max-width: 860px) {
        padding: 0.6rem 0;
        border-right: none;
        border-bottom: 1px solid #e9edf3;
        &:last-child { border-bottom: none; }
    }
`;

export const FilterColumnLabel = styled.p`
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 0.5rem;
`;

export const ChipsWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
`;

export const FilterChip = styled.button<{ $active: boolean; $color?: string }>`
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.3rem 0.55rem;
    border-radius: 6px;
    border: 1.5px solid ${({ $active, $color }) => $active ? ($color ?? "#1e5fa8") : "transparent"};
    background: ${({ $active, $color }) => $active ? `${$color ?? "#1e5fa8"}18` : "transparent"};
    color: ${({ $active, $color }) => $active ? ($color ?? "#1e5fa8") : "#475569"};
    font-size: 0.77rem;
    font-weight: ${({ $active }) => ($active ? 600 : 400)};
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: all 0.13s ease;
    font-family: ${({ theme }) => theme.fonts.sans};

    &:hover {
        background: ${({ $color }) => `${$color ?? "#1e5fa8"}12`};
        color: ${({ $color }) => $color ?? "#1e5fa8"};
    }
`;

export const ChipDot = styled.span<{ $color: string }>`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    flex-shrink: 0;
`;

export const ChipCheck = styled.span<{ $active: boolean; $color?: string }>`
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 1.5px solid ${({ $active, $color }) => $active ? ($color ?? "#1e5fa8") : "#cbd5e1"};
    background: ${({ $active, $color }) => $active ? ($color ?? "#1e5fa8") : "transparent"};
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.13s;
    font-size: 0;

    &::after {
        content: '';
        display: ${({ $active }) => ($active ? 'block' : 'none')};
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #fff;
    }
`;

/* ─── Cards Grid ────────────────────────────────────────── */

export const CardsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.1rem;
    margin-top: 1.25rem;

    @media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 680px)  { grid-template-columns: 1fr; }
`;

export const EmptyState = styled.div`
    grid-column: 1 / -1;
    text-align: center;
    padding: 3rem 1rem;
    color: #94a3b8;
    font-size: 0.9rem;
`;

/* ─── Card ──────────────────────────────────────────────── */

export const CardWrapper = styled.div`
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dde3ec;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    padding: 1rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    transition: box-shadow 0.18s ease;

    &:hover { box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1); }
`;

export const CardTopRow = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    justify-content: space-between;
`;

export const CardTitleText = styled.h2`
    font-size: clamp(0.8rem, 0.88vw, 0.97rem);
    font-weight: 700;
    color: #1e5fa8;
    font-family: ${({ theme }) => theme.fonts.primary};
    line-height: 1.3;
    flex: 1;
    cursor: pointer;

    &:hover { text-decoration: underline; }
`;

export const StatusBadge = styled.span<{ $status: string }>`
    flex-shrink: 0;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    white-space: nowrap;
    text-transform: uppercase;
    background: ${({ $status }) =>
        $status === "em_andamento" ? "#1a3a6e" :
        $status === "concluido"    ? "#166534" :
        $status === "atrasado"     ? "#7f1d1d" :
        $status === "nao_iniciado" ? "#374151" :
        $status === "pendente"     ? "#713f12" : "#374151"};
    color: #fff;
`;

export const ActionsRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex-shrink: 0;
`;

export const IconButton = styled.button`
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: #94a3b8;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s, background 0.15s;

    &:hover         { color: #1e5fa8; background: #eff6ff; }
    &:last-child:hover { color: #dc2626; background: #fef2f2; }

    svg { width: 14px; height: 14px; }
`;

export const DateBadge = styled.span`
    display: inline-flex;
    align-items: center;
    width: fit-content;
    font-size: 0.63rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    background: #e67e22;
    color: #fff;
    text-transform: uppercase;
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid #edf0f5;
    margin: 0.1rem 0;
`;

export const FieldsAndProgress = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
`;

export const FieldsList = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
`;

export const FieldRow = styled.div`
    display: flex;
    gap: 0.35rem;
    font-size: 0.78rem;
    line-height: 1.4;
    align-items: baseline;
`;

export const FieldLabel = styled.span`
    color: #64748b;
    font-weight: 500;
    flex-shrink: 0;
`;

export const FieldValue = styled.span`
    color: #1e293b;
    font-weight: 400;
`;

export const ObsValue = styled.span`
    color: #475569;
    font-weight: 400;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1.45;
`;

export const ProgressWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    flex-shrink: 0;
`;

export const ProgressLabel = styled.span`
    font-size: 0.63rem;
    color: #94a3b8;
    font-weight: 500;
`;

export const CollapsesSentinel = styled.div`
    height: 1px;
    overflow: hidden;
    pointer-events: none;
`;

export const StickyHeader = styled.div`
    position: sticky;
    top: var(--topbar-height, 56px);
    z-index: 30;
    background: #f0f2f5;
`;
