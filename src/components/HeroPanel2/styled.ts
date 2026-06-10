import styled from "styled-components";

export const PageWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.grayLight};
`;

export const AlertBar = styled.div`
    background: ${({ theme }) => theme.colors.greenDark};
    color: ${({ theme }) => theme.colors.yellowVibrant};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    padding: 0.5rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    letter-spacing: 0.03em;

    svg {
        flex-shrink: 0;
    }
`;

export const Main = styled.main`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
`;

export const PageFooter = styled.footer`
    background: ${({ theme }) => theme.colors.greenDark};
    padding: 0.85rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

export const FooterLeft = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.text.half};
`;

export const FooterRight = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.text.half};
    display: flex;
    align-items: center;
    gap: 0.4rem;

    svg {
        width: 0.75rem;
        height: 0.75rem;
        opacity: 0.6;
    }
`;
