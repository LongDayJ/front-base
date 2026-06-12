import styled from "styled-components";

const MOBILE = "@media (max-width: 640px)";

export const TableWrapper = styled.div`
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    overflow-x: auto;

    ${MOBILE} {
        background: transparent;
        border: none;
        box-shadow: none;
        overflow-x: visible;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 900px;

    ${MOBILE} {
        min-width: unset;
        display: block;
    }
`;

export const Thead = styled.thead`
    background: #fff;
    border-bottom: 2px solid #eee;

    ${MOBILE} { display: none; }
`;

export const Th = styled.th<{ $sortable?: boolean }>`
    padding: 0.65rem 0.9rem;
    text-align: left;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #94a3b8;
    white-space: nowrap;
    cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
    user-select: none;
    transition: color 0.12s;

    &:hover {
        color: ${({ $sortable }) => ($sortable ? '#475569' : '#94a3b8')};
    }
`;

export const ThInner = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
`;

export const SortIcon = styled.span<{ $active: boolean; $dir: 'asc' | 'desc' }>`
    display: inline-flex;
    flex-direction: column;
    gap: 1px;
    opacity: ${({ $active }) => ($active ? 1 : 0.35)};

    &::before,
    &::after {
        content: '';
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
    }

    &::before {
        border-bottom: 4px solid ${({ $active, $dir }) => ($active && $dir === 'asc' ? '#1a73e8' : '#94a3b8')};
    }

    &::after {
        border-top: 4px solid ${({ $active, $dir }) => ($active && $dir === 'desc' ? '#1a73e8' : '#94a3b8')};
    }
`;

export const Tbody = styled.tbody`
    ${MOBILE} { display: block; }
`;

export const EmptyRow = styled.tr`
    td {
        padding: 3rem 1rem;
        text-align: center;
        color: #94a3b8;
        font-size: 0.88rem;
    }

    ${MOBILE} {
        display: block;
        td { display: block; }
    }
`;
