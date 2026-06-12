import styled from "styled-components";

export const PageWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    background: #f5f6fa;
    padding: 2rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    @media (max-width: 768px) {
        padding: 1.25rem 1rem;
    }
`;

export const SummaryRow = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const ControlsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 9vh;
    z-index: 40;
`;

export const ControlsCard = styled.div<{ $filtersOpen: boolean }>`
    background: #fff;
    border: 1px solid #dde3ec;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;
