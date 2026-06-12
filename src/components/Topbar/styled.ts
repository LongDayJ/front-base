import styled from "styled-components";

export const TopbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background: ${({ theme }) => theme.colors.greenBackground};
    height: 9vh;
    position: sticky;
    top: 0;
    z-index: 50;

    @media (max-width: 768px) {
        height: 10dvh;
    }
`;

export const TopbarBrand = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 50%;
`;

export const TopbarLogo = styled.div`
    height: 5vh;
    width: 5vh;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.yellowVibrant};
    color: ${({ theme }) => theme.colors.greenBackground};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;

    @media (max-width: 768px) {
        border-radius: 50%;
    }
`;

export const TopbarName = styled.div`
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.strong};
`;

export const TopbarSub = styled.div`
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.text.half};
`;

export const TopbarRight = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

/* ─── User dropdown ──────────────────────────────────────── */

export const UserDropdownWrapper = styled.div`
    position: relative;
`;

export const UserInfo = styled.button<{ $open: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 6px;
    border-radius: 8px;
    transition: background 0.15s;
    background: ${({ $open, theme }) => $open ? theme.colors.greenTransparent : "transparent"};

    &:hover {
        background: ${({ theme }) => theme.colors.greenTransparent};
    }
`;

export const UserAvatar = styled.div`
    width: 5vh;
    height: 5vh;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.greenTransparent};
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    flex-shrink: 0;
`;

export const UserTextInfo = styled.div`
    text-align: left;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const UserName = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.text.strong};
`;

export const UserRole = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.text.half};
`;

export const DropdownChevron = styled.span<{ $open: boolean }>`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.text.half};
    transition: transform 0.2s ease;
    transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};

    svg {
        width: 14px;
        height: 14px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 200px;
    background: ${({ theme }) => theme.colors.greenBackground};
    border: 1px solid ${({ theme }) => theme.colors.text.half}44;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    z-index: 100;
    animation: fadeIn 0.12s ease;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to   { opacity: 1; transform: translateY(0); }
    }
`;

export const DropdownUserHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
`;

export const DropdownDivider = styled.hr`
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.text.half}33;
    margin: 0;
`;

export const DropdownMobileUserInfo = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 12px 14px 10px;
    }
`;

export const DropdownLogoutBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 10px 14px;
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text.half};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: background 0.15s, color 0.15s;
    text-align: left;

    svg {
        width: 15px;
        height: 15px;
        flex-shrink: 0;
    }

    &:hover {
        background: ${({ theme }) => theme.colors.greenTransparent};
        color: ${({ theme }) => theme.colors.text.strong};
    }
`;

export const SessionTimer = styled.div<{ $warning: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1.2;

    span:first-child {
        font-size: ${({ theme }) => theme.fontSizes.sm};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        color: ${({ $warning, theme }) =>
            $warning ? theme.colors.yellowVibrant : theme.colors.text.strong};
        font-variant-numeric: tabular-nums;
        transition: color 0.3s;
    }

    span:last-child {
        font-size: ${({ theme }) => theme.fontSizes.xxs};
        color: ${({ theme }) => theme.colors.text.half};
    }
`;

export const IconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.2rem;
    height: 2.2rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.greenTransparent};
    border: 1px solid ${({ theme }) => theme.colors.text.half};
    color: white;
    transition: background 0.2s;

    &:hover {
        background: ${({ theme }) => theme.colors.whiteUltraOpaque};
    }

    svg {
        width: 1rem;
        height: 1rem;
    }
`;

export const LogoutButton = styled.button`
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.greenTransparent};
    border: 1px solid ${({ theme }) => theme.colors.text.half};
    color: white;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.xxs};

    &:hover {
        background: ${({ theme }) => theme.colors.whiteUltraOpaque};
    }
`;

export const TopBarCenter = styled.div``;

/* ─── Dev Routes (development only) ─────────────────────── */

export const DevRoutesWrapper = styled.div`
    position: relative;
`;

export const DevRoutesBtn = styled.button<{ $open: boolean }>`
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.yellowVibrant}88;
    background: ${({ $open, theme }) =>
        $open ? theme.colors.yellowVibrant + "22" : "transparent"};
    color: ${({ theme }) => theme.colors.yellowVibrant};
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;

    &:hover {
        background: ${({ theme }) => theme.colors.yellowVibrant + "22"};
        border-color: ${({ theme }) => theme.colors.yellowVibrant};
    }
`;

export const DevRoutesDropdown = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 160px;
    background: ${({ theme }) => theme.colors.greenBackground};
    border: 1px solid ${({ theme }) => theme.colors.text.half}44;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    z-index: 100;
    animation: fadeIn 0.12s ease;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to   { opacity: 1; transform: translateY(0); }
    }
`;

export const DevRoutesItem = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 9px 14px;
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text.half};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: background 0.15s, color 0.15s;
    text-align: left;

    &:hover {
        background: ${({ theme }) => theme.colors.greenTransparent};
        color: ${({ theme }) => theme.colors.text.strong};
    }
`;
