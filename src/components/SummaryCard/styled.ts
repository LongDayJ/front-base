import styled from "styled-components";

export const Card = styled.div<{ $borderColor: string }>`
    background: #fff;
    border-left: 4px solid ${({ $borderColor }) => $borderColor};
    border-radius: 6px;
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    position: relative;
    overflow: hidden;
    flex: 1;
    min-width: 0;
`;

export const CardTop = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

export const CardLabel = styled.span`
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #94a3b8;
`;

export const CardIcon = styled.div<{ $color: string }>`
    color: ${({ $color }) => $color};
    opacity: 0.25;
    display: flex;
    align-items: center;

    svg {
        width: 22px;
        height: 22px;
    }
`;

export const CardCount = styled.span<{ $color: string }>`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ $color }) => $color};
    line-height: 1.1;
    margin-top: 0.15rem;
`;

export const CardSublabel = styled.span`
    font-size: 0.72rem;
    color: #94a3b8;
    margin-top: 0.1rem;
`;
