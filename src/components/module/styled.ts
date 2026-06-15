"use client";

import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

    background: ${({ theme }) => theme.colors.grayLight};

    font-family: ${({ theme }) => theme.fonts.sans};

    padding: 4vh 4vw;

    @media (max-width: 768px) {
        padding: 3dvh 4dvw 6dvh;
        align-items: center;
    }
`;

export const GreetingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1vh;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const Greeting = styled.h1`
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    color: ${({ theme }) => theme.colors.greenDark};

    font-family: ${({ theme }) => theme.fonts.primary};

    text-align: center;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xl};
    }
`;

export const GreetingSubtitle = styled.p`
    font-size: 1vw;
    font-weight: ${({ theme }) => theme.fontWeights.medium};

    color: ${({ theme }) => theme.colors.gray};

    font-family: ${({ theme }) => theme.fonts.sans};

    text-align: center;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.lg};
    }
`;

export const CardsContainer = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 2vw;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 2.5dvh;
    }
`;

export const ModuleCard = styled.div<{ $color: string }>`
    width: 100%;
    min-height: 20vh;

    padding: 3vh 2vw;

    border-radius: ${({ theme }) => theme.borderRadius.xs};

    border: 0.25vh solid transparent;

    border-top: 1vh solid ${({ $color }) => $color};

    background: ${({ theme }) => theme.colors.grayLight};

    display: flex;
    flex-direction: column;

    gap: 2vh;

    cursor: pointer;

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.08);

    // &:hover {
    //     transform: translateY(-0.5vh);
    //     border: 0.25vh solid ${({ $color }) => $color};
    //     border-top: 1vh solid ${({ $color }) => $color};
    //     box-shadow: 0 1vh 2vh ${({ $color }) => $color};
    // }

    @media (max-width: 768px) {
        width: 92dvw;
        flex-direction: column;
    }
`;

export const CardIcon = styled.div`
    width: 4vw;
    height: 4vw;

    border-radius: 1vw;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.8vw;

    background: ${({ theme }) => theme.colors.grayUltraLight};

    color: ${({ theme }) => theme.colors.greenBackground};

    @media (max-width: 768px) {
        height: 3rem;
        width: 3rem;
        border-radius: 0.6rem;
        font-size: ${({ theme }) => theme.fontSizes.lg};
    }
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;

    gap: 1.5vh;
`;

export const CardTitle = styled.h2`
    font-size: 1.6vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    color: ${({ theme }) => theme.colors.greenDark};

    font-family: ${({ theme }) => theme.fonts.primary};

    line-height: 120%;

    @media (max-width: 768px) {
        width: fit-content;
        font-size: ${({ theme }) => theme.fontSizes.lg};
    }
`;

export const CardDescription = styled.p`
    font-size: 1vw;
    font-weight: ${({ theme }) => theme.fontWeights.regular};

    color: ${({ theme }) => theme.colors.gray};

    font-family: ${({ theme }) => theme.fonts.sans};

    line-height: 160%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
    }
`;

export const CardFooter = styled.span`
    margin-top: auto;

    font-size: 0.95vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    color: ${({ theme }) => theme.colors.greenBackground};

    font-family: ${({ theme }) => theme.fonts.sans};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.md};
    }
`;

export const AlertButtonsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
`;

export const ThemeButtonsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

export const ThemeDot = styled.span<{ $color: string }>`
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    flex-shrink: 0;
`;

export const ThemeButton = styled.button<{ $color: string; $active: boolean }>`
    padding: 0.45rem 0.6rem;
    border-radius: 6px;
    border: 2px solid ${({ $active, $color }) => ($active ? $color : "rgba(0,0,0,0.1)")};
    background: ${({ $active, $color }) => ($active ? `${$color}22` : "transparent")};
    color: ${({ theme }) => theme.colors.greenDark};
    font-size: 0.75vw;
    font-weight: ${({ $active }) => ($active ? 700 : 500)};
    cursor: pointer;
    transition: all 0.18s ease;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    white-space: nowrap;

    &:hover {
        border-color: ${({ $color }) => $color};
        background: ${({ $color }) => `${$color}22`};
    }

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
        white-space: normal;
    }
`;

export const AlertTestButton = styled.button<{ $color: string }>`
    padding: 0.45rem 0.75rem;
    border-radius: 6px;
    border: 2px solid ${({ $color }) => $color};
    background: transparent;
    color: ${({ $color }) => $color};
    font-size: 0.8vw;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;

    &:hover {
        background: ${({ $color }) => $color};
        color: #fff;
    }

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.md};
        padding: 0.5rem 0.75rem;
    }
`;

export const ProfilesGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;

    @media (max-width: 768px) {
        gap: 0.4rem;
    }
`;

export const ProfileButton = styled.button<{ $color: string; $active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    padding: 0.45rem 0.3rem;
    border-radius: 8px;
    border: 2px solid ${({ $active, $color }) => ($active ? $color : "rgba(0,0,0,0.08)")};
    background: ${({ $active, $color }) => ($active ? `${$color}18` : "transparent")};
    cursor: pointer;
    text-align: center;
    transition: all 0.18s ease;
    width: 100%;

    &:hover {
        border-color: ${({ $color }) => $color};
        background: ${({ $color }) => `${$color}18`};
    }
`;

export const ProfileAvatar = styled.div<{ $color: string }>`
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    color: #fff;
    font-size: 0.6rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.fonts.sans};

    @media (max-width: 768px) {
        width: 2.2rem;
        height: 2.2rem;
        font-size: 0.75rem;
    }
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    width: 100%;
`;

export const ProfileName = styled.span`
    font-size: 0.65vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.greenDark};
    font-family: ${({ theme }) => theme.fonts.primary};
    white-space: nowrap;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.sm};
        white-space: normal;
        text-align: center;
    }
`;

export const PermissionTagsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.15rem;
`;

export const PermissionTag = styled.span<{ $color: string }>`
    font-size: 0.5vw;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ $color }) => $color};
    background: ${({ $color }) => `${$color}18`};
    border: 1px solid ${({ $color }) => `${$color}44`};
    border-radius: 999px;
    padding: 0.08rem 0.3rem;
    white-space: nowrap;
    font-family: ${({ theme }) => theme.fonts.sans};

    @media (max-width: 768px) {
        font-size: 0.65rem;
    }
`;

export const ActiveBadge = styled.span<{ $color: string }>`
    font-size: 0.55vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ $color }) => $color};
    font-family: ${({ theme }) => theme.fonts.sans};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xxs};
    }
`;

export const LoadingContainer = styled.div`
    flex: 1;
    width: 100%;
    min-height: calc(100vh - var(--topbar-height, 56px));

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.colors.grayLight};

    color: ${({ theme }) => theme.colors.greenDark};

    font-size: 2vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    font-family: ${({ theme }) => theme.fonts.primary};
`;

export const SideBySideRow = styled.div`
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2vw;
    align-items: start;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 2.5dvh;
    }
`;