import styled from "styled-components";

const MOBILE = "@media (max-width: 640px)";

export const Tr = styled.tr`
    border-bottom: 1px solid #eee;
    transition: background 0.12s;

    &:hover { background: #f9f9f9; }
    &:last-child { border-bottom: none; }

    ${MOBILE} {
        display: block;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        margin-bottom: 0.65rem;
        padding: 0.15rem 0;

        &:last-child { border-bottom: 1px solid #e2e8f0; margin-bottom: 0; }
        &:hover { background: #fff; }
    }
`;

export const Td = styled.td`
    padding: 0.75rem 0.9rem;
    font-size: 0.82rem;
    color: #1e293b;
    vertical-align: middle;

    ${MOBILE} {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 0.65rem 0.9rem;
        border-bottom: 1px solid #f1f5f9;
        white-space: normal !important;

        &:last-child { border-bottom: none; }

        &[data-label]::before {
            content: attr(data-label);
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #64748b;
            flex-shrink: 0;
            min-width: 96px;
            margin-right: 0.6rem;
            padding-top: 0.15rem;
        }
    }
`;

export const TdObs = styled(Td)`
    color: #64748b;
    max-width: 220px;

    ${MOBILE} {
        max-width: none;
        color: #1e293b;
        font-size: 0.84rem;
    }
`;

export const TdAssunto = styled(Td)`
    max-width: 360px;

    ${MOBILE} {
        max-width: none;
        font-size: 0.84rem;
        color: #1e293b;
    }
`;

export const ReportLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: #1a73e8;
    font-size: 0.82rem;
    text-decoration: none;
    white-space: nowrap;

    svg {
        width: 12px;
        height: 12px;
        flex-shrink: 0;
        opacity: 0.7;
    }

    &:hover { text-decoration: underline; }
`;

export const ActionsCell = styled.div`
    display: flex;
    align-items: center;
    gap: 0.35rem;

    ${MOBILE} {
        justify-content: center;
        width: 100%;
        padding: 0.25rem 0;
    }
`;

export const ActionBtn = styled.button<{ $color: string; $hoverColor: string }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: none;
    background: ${({ $color }) => $color}18;
    color: ${({ $color }) => $color};
    cursor: pointer;
    transition: background 0.15s;

    svg { width: 14px; height: 14px; }

    &:hover { background: ${({ $hoverColor }) => $hoverColor}30; }
`;

export const ObsDash = styled.span`
    color: #cbd5e1;
`;

/* ─── Modal ─────────────────────────────────────────────── */

export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(2px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
`;

export const ModalBox = styled.div`
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
    width: 100%;
    max-width: 640px;
    max-height: 90vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1rem 1.4rem 0.9rem;
    border-bottom: 1px solid #e2e8f0;
    position: sticky;
    top: 0;
    background: #fff;
    border-radius: 14px 14px 0 0;
    z-index: 1;
`;

export const ModalTitle = styled.h2`
    font-size: 0.95rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    letter-spacing: -0.01em;
`;

export const ModalCloseBtn = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: none;
    background: #f1f5f9;
    color: #64748b;
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
    flex-shrink: 0;

    svg { width: 16px; height: 16px; }

    &:hover { background: #fee2e2; color: #e53935; }
`;

export const ModalBody = styled.div`
    padding: 1.2rem 1.4rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ModalGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem 1.2rem;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const ModalField = styled.div<{ $span?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    ${({ $span }) => $span && 'grid-column: 1 / -1;'}
`;

export const ModalLabel = styled.span`
    font-size: 0.63rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #94a3b8;
`;

export const ModalValue = styled.span`
    font-size: 0.85rem;
    color: #1e293b;
    line-height: 1.4;
`;

export const ModalDivider = styled.hr`
    border: none;
    border-top: 1px solid #f1f5f9;
    margin: 0;
`;

/* ─── Form ──────────────────────────────────────────────── */

export const FormField = styled.div<{ $span?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    ${({ $span }) => $span && 'grid-column: 1 / -1;'}
`;

export const FormLabel = styled.label`
    font-size: 0.63rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #64748b;
`;

const inputBase = `
    font-size: 0.85rem;
    color: #1e293b;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.5rem 0.7rem;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    font-family: inherit;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        border-color: #1a73e8;
        box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.12);
        background: #fff;
    }
`;

export const FormInput = styled.input`${inputBase}`;

export const FormSelect = styled.select`
    ${inputBase}
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.6rem center;
    background-size: 14px;
    padding-right: 2rem;
    background-color: #f8fafc;
`;

export const FormTextarea = styled.textarea`
    ${inputBase}
    resize: vertical;
    min-height: 80px;
    line-height: 1.5;
`;

export const ModalFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.6rem;
    padding: 0.9rem 1.4rem 1.1rem;
    border-top: 1px solid #e2e8f0;
    position: sticky;
    bottom: 0;
    background: #fff;
    border-radius: 0 0 14px 14px;
`;

export const CancelBtn = styled.button`
    padding: 0.48rem 1.1rem;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #64748b;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.12s, border-color 0.12s;

    &:hover { background: #f1f5f9; border-color: #cbd5e1; }
`;

export const SaveBtn = styled.button`
    padding: 0.48rem 1.3rem;
    border-radius: 8px;
    border: none;
    background: #1a73e8;
    color: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.12s;

    &:hover { background: #1557b0; }
`;

export const DeleteBtn = styled.button`
    padding: 0.48rem 1.3rem;
    border-radius: 8px;
    border: none;
    background: #e53935;
    color: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.12s;

    &:hover { background: #b71c1c; }
`;

export const ConfirmBox = styled.div`
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
    width: 100%;
    max-width: 420px;
    padding: 1.8rem 1.6rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

export const ConfirmText = styled.p`
    font-size: 0.9rem;
    color: #334155;
    margin: 0;
    line-height: 1.5;

    strong { color: #1e293b; }
`;
