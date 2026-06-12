import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    flex: 1;

    svg {
        position: absolute;
        left: 0.85rem;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        color: #94a3b8;
        pointer-events: none;
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.6rem 1rem 0.6rem 2.4rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #1e293b;
    background: #fff;
    outline: none;
    transition: border-color 0.15s;

    &::placeholder {
        color: #94a3b8;
    }

    &:focus {
        border-color: #1a73e8;
        background: #fff;
    }
`;
