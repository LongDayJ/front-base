import styled from "styled-components";

export const NovoBadge = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    border: 1.5px solid #34a853;
    color: #34a853;
    font-size: 0.72rem;
    font-weight: 700;
    background: transparent;
    white-space: nowrap;
`;

export const AtualizacaoBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    border: 1.5px solid #1a73e8;
    color: #1a73e8;
    font-size: 0.72rem;
    font-weight: 600;
    background: transparent;
    white-space: nowrap;

    svg {
        width: 11px;
        height: 11px;
        flex-shrink: 0;
    }
`;
