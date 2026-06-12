"use client";

import styled from "styled-components";

export const MapCard = styled.div`
    background: #fff;
    border: 1px solid #dde3ec;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    padding: 1.25rem 1.5rem 1rem;
    margin-bottom: 0;

    @media (max-width: 768px) {
        padding: 0.75rem 0.5rem 0.5rem;
        border-radius: 0;
        border-left: none;
        border-right: none;
        flex: 1;
        margin-bottom: 0;
        display: flex;
        flex-direction: column;
    }
`;

export const MapHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
    gap: 0.75rem;
`;

export const MapTitle = styled.h2`
    font-size: 0.88rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
`;

export const ToggleGroup = styled.div`
    display: flex;
    background: #f1f5f9;
    border-radius: 8px;
    padding: 3px;
    gap: 3px;
`;

export const ToggleBtn = styled.button<{ $active: boolean }>`
    padding: 0.28rem 0.85rem;
    border: none;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    background: ${({ $active }) => ($active ? "#fff" : "transparent")};
    color: ${({ $active }) => ($active ? "#1e293b" : "#64748b")};
    box-shadow: ${({ $active }) => ($active ? "0 1px 3px rgba(0,0,0,0.1)" : "none")};

    &:hover {
        color: #1e293b;
    }
`;

export const MapBody = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;

    @media (max-width: 768px) {
        max-width: none;
        margin: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
`;

export const MapContentRow = styled.div`
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;

    @media (max-width: 768px) {
        flex-direction: column;
        flex: 1;
    }
`;

export const MapMapArea = styled.div`
    flex: 1;
    position: relative;
    min-width: 0;
`;

export const MapSvgClip = styled.div`
    overflow: hidden;
    border-radius: 8px;
    background: #f8fafc;
    line-height: 0;
`;

export const TooltipBox = styled.div`
    position: fixed;
    pointer-events: none;
    background: #1e293b;
    color: #fff;
    padding: 0.4rem 0.7rem;
    border-radius: 6px;
    font-size: 0.78rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 2px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);

    strong { font-weight: 600; }
    span { opacity: 0.8; }
`;

export const MapLegendPanel = styled.div`
    width: 148px;
    flex-shrink: 0;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem 0.9rem;
    margin-top: 0;

    @media (max-width: 768px) {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem 1.5rem;
        padding: 0.6rem 0.75rem;
    }
`;

export const LegendPanelTitle = styled.p`
    font-size: 0.66rem;
    font-weight: 700;
    color: #94a3b8;
    margin: 0 0 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    width: 100%;
`;

export const LegendStep = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.45rem;

    &:last-child {
        margin-bottom: 0;
    }

    @media (max-width: 768px) {
        margin-bottom: 0;
    }
`;

export const LegendSwatch = styled.div<{ $color: string }>`
    width: 14px;
    height: 14px;
    border-radius: 3px;
    background: ${({ $color }) => $color};
    flex-shrink: 0;
    border: 1px solid rgba(0, 0, 0, 0.07);
`;

export const LegendStepLabel = styled.span`
    font-size: 0.71rem;
    color: #475569;
    line-height: 1.3;
`;

export const ZoomControls = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 10;
`;

export const ZoomBtn = styled.button`
    width: 30px;
    height: 30px;
    border: 1px solid #dde3ec;
    border-radius: 6px;
    background: #fff;
    color: #475569;
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: background 0.15s, color 0.15s;

    &:hover {
        background: #f1f5f9;
        color: #1e293b;
    }
`;
