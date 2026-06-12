import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
`;

export const Select = styled.select`
    padding: 0.55rem 2rem 0.55rem 0.75rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.82rem;
    color: #475569;
    background: #fff;
    outline: none;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.6rem center;
    transition: border-color 0.15s;

    &:focus {
        border-color: #1a73e8;
    }
`;

export const CountBadge = styled.span`
    font-size: 0.78rem;
    color: #64748b;
    white-space: nowrap;
    padding: 0.55rem 0.75rem;
    background: #f1f5f9;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    font-weight: 500;
`;
