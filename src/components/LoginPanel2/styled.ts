import styled from "styled-components";

export const Card = styled.div`
    width: 100%;
    max-width: 26rem;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 32px ${({ theme }) => theme.colors.greenBoxShadow},
        0 1px 4px rgba(0, 0, 0, 0.08);
`;

export const CardHeader = styled.div`
    background: ${({ theme }) => theme.colors.greenBackground};
    padding: 2rem 2rem 1.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    text-align: center;
`;

export const ShieldIcon = styled.div`
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.greenTransparent};
    border: 2px solid rgba(255, 255, 255, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.text.strong};

    svg {
        width: 1.6rem;
        height: 1.6rem;
    }
`;

export const CardTitle = styled.h1`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.strong};
    margin: 0;
`;

export const CardSubtitle = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.text.normal};
    margin: 0;
    line-height: 1.5;
`;

export const CardBody = styled.div`
    background: ${({ theme }) => theme.colors.white};
    padding: 1.75rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

export const OrgLabel = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.greenLight};
    text-align: center;
    letter-spacing: 0.04em;
    margin: 0;

    span {
        font-weight: ${({ theme }) => theme.fontWeights.regular};
        color: ${({ theme }) => theme.colors.gray};
    }
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.grayUltraLight};
    margin: 0;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    label {
        font-size: ${({ theme }) => theme.fontSizes.xxs};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        color: ${({ theme }) => theme.colors.greenDark};
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    svg {
        position: absolute;
        left: 0.85rem;
        width: 1rem;
        height: 1rem;
        color: ${({ theme }) => theme.colors.gray};
        pointer-events: none;
        flex-shrink: 0;
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.85rem 1rem 0.85rem 2.5rem;
    border-radius: 0.6rem;
    border: 1.5px solid ${({ theme }) => theme.colors.grayUltraLight};
    background: ${({ theme }) => theme.colors.grayLight};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.greenDark};
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    font-family: inherit;

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.greenLight};
        background: ${({ theme }) => theme.colors.white};
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    height: 3rem;
    border: none;
    border-radius: 0.7rem;
    background: ${({ theme }) => theme.colors.greenBackground};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background 0.2s, transform 0.15s;
    font-family: inherit;

    svg {
        width: 1.1rem;
        height: 1.1rem;
    }

    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.greenLight};
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const DemoHint = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.gray};
    text-align: center;
    margin: 0;
`;

export const WarningBox = styled.div`
    background: ${({ theme }) => theme.colors.yellowVibrantMoreOpaque};
    border: 1px solid ${({ theme }) => theme.colors.yellowVibrantOpaque};
    border-radius: 0.5rem;
    padding: 0.7rem 0.9rem;
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.greenDark};
    line-height: 1.5;

    svg {
        flex-shrink: 0;
        margin-top: 0.05rem;
        width: 1rem;
        height: 1rem;
        color: ${({ theme }) => theme.colors.yellowVibrant};
        filter: brightness(0.75);
    }
`;
