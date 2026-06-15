import styled from "styled-components";

export const PageWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    background: #f5f6fa;
    padding: 2rem 2.5rem;

    & > * + * {
        margin-top: 1.25rem;
    }

    @media (max-width: 768px) {
        padding: 1.25rem 1rem;
    }
`;

export const SummaryRow = styled.div<{ $collapsed?: boolean }>`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    max-height: ${({ $collapsed }) => ($collapsed ? '0' : '200px')};
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    overflow: hidden;
    margin-bottom: ${({ $collapsed }) => ($collapsed ? '-1.25rem' : '0')};
    transition: max-height 0.35s ease, opacity 0.25s ease, margin-bottom 0.35s ease;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        max-height: ${({ $collapsed }) => ($collapsed ? '0' : '400px')};
    }
`;

export const MiniSummaryBar = styled.div<{ $visible: boolean }>`
    display: flex;
    gap: 0.5rem;
    padding: ${({ $visible }) => ($visible ? '0.5rem 1rem' : '0')};
    max-height: ${({ $visible }) => ($visible ? '52px' : '0')};
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    overflow: hidden;
    background: #fff;
    border-bottom: 1px solid #e8ecf0;
    transition: max-height 0.35s ease, opacity 0.25s ease, padding 0.35s ease;
`;

export const MiniChip = styled.div<{ $color: string }>`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex: 1;
    min-width: 0;
    border-left: 3px solid ${({ $color }) => $color};
    padding: 0.25rem 0.5rem;
    background: ${({ $color }) => $color}12;
    border-radius: 0 4px 4px 0;
`;

export const MiniCount = styled.span<{ $color: string }>`
    font-size: 1.05rem;
    font-weight: 700;
    color: ${({ $color }) => $color};
    line-height: 1;
    flex-shrink: 0;
`;

const miniLabelBase = `
    font-size: 0.6rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const MiniLabelFull = styled.span`
    ${miniLabelBase}
    @media (max-width: 768px) { display: none; }
`;

export const MiniLabelShort = styled.span`
    ${miniLabelBase}
    @media (min-width: 769px) { display: none; }
`;

export const ControlsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    top: var(--topbar-height, 56px);
    z-index: 40;
`;

export const ControlsCard = styled.div<{ $filtersOpen: boolean }>`
    background: #fff;
    border: 1px solid #dde3ec;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;
