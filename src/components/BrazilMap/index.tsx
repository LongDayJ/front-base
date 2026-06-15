"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { ProjectItem } from "@/components/ProjectCards/mock";
import {
    MapCard,
    MapHeader,
    MapTitle,
    ToggleGroup,
    ToggleBtn,
    MapBody,
    MapContentRow,
    MapMapArea,
    MapSvgClip,
    TooltipBox,
    MapLegendPanel,
    LegendPanelTitle,
    LegendStep,
    LegendSwatch,
    LegendStepLabel,
    ZoomControls,
    ZoomBtn,
} from "./styled";

const GEO_URL = "/brazil-states.json";

// SVG viewport sized to Brazil's geographic extent (LON_PHYSICAL ≈ LAT_PHYSICAL ≈ 40°)
const W = 670;
const H = 680;

// Brazil geographic bounds
const LON_MIN = -74.5;
const LON_MAX = -33.5;
const LAT_MIN = -34.5;
const LAT_MAX =  6.0;

// Cosine correction: at Brazil's average latitude, 1° lon ≠ 1° lat in distance
const LAT_CENTER = (LAT_MIN + LAT_MAX) / 2;          // ≈ -14.25°
const LON_CENTER = (LON_MIN + LON_MAX) / 2;          // ≈ -54°
const COS_LAT    = Math.cos(LAT_CENTER * Math.PI / 180); // ≈ 0.969

const LON_PHYSICAL = (LON_MAX - LON_MIN) * COS_LAT;  // ≈ 39.7°
const LAT_PHYSICAL = LAT_MAX - LAT_MIN;               // 40.5°
const PADDING = 24;
const SCALE = Math.min(
    (W - PADDING * 2) / LON_PHYSICAL,
    (H - PADDING * 2) / LAT_PHYSICAL,
);

function project(lon: number, lat: number): [number, number] {
    const x = W / 2 + (lon - LON_CENTER) * COS_LAT * SCALE;
    const y = H / 2 - (lat - LAT_CENTER) * SCALE;
    return [x, y];
}

function geoToPath(geometry: { type: string; coordinates: unknown }): string {
    const polys =
        geometry.type === "Polygon"
            ? [geometry.coordinates as number[][][]]
            : (geometry.coordinates as number[][][][]);

    return polys
        .map((poly) =>
            poly
                .map((ring) =>
                    ring
                        .map(([lon, lat], i) => {
                            const [x, y] = project(lon, lat);
                            return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
                        })
                        .join("") + "Z"
                )
                .join("")
        )
        .join("");
}

type Metric = "count" | "percentage";

const UF_NAMES: Record<string, string> = {
    AC: "Acre",        AL: "Alagoas",       AP: "Amapá",         AM: "Amazonas",
    BA: "Bahia",       CE: "Ceará",         DF: "Distrito Federal", ES: "Espírito Santo",
    GO: "Goiás",       MA: "Maranhão",      MT: "Mato Grosso",   MS: "Mato Grosso do Sul",
    MG: "Minas Gerais", PA: "Pará",         PB: "Paraíba",       PR: "Paraná",
    PE: "Pernambuco",  PI: "Piauí",         RJ: "Rio de Janeiro", RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima",      SC: "Santa Catarina",
    SP: "São Paulo",   SE: "Sergipe",       TO: "Tocantins",
};

function lerp(a: number, b: number, t: number) {
    return Math.round(a + (b - a) * Math.min(t, 1));
}
function countColor(t: number) {
    return `rgb(${lerp(209, 6, t)},${lerp(250, 95, t)},${lerp(229, 58, t)})`;
}
function progressColor(t: number) {
    return `rgb(${lerp(219, 30, t)},${lerp(234, 64, t)},${lerp(254, 175, t)})`;
}

interface GeoFeature {
    properties: { sigla: string; name: string };
    geometry: { type: string; coordinates: unknown };
}

interface Transform { x: number; y: number; k: number }
const INIT: Transform = { x: 0, y: 0, k: 1 };

function zoomToward(t: Transform, factor: number, cx = W / 2, cy = H / 2): Transform {
    const newK = Math.min(Math.max(t.k * factor, 1), 8);
    const ratio = newK / t.k;
    return { k: newK, x: cx - (cx - t.x) * ratio, y: cy - (cy - t.y) * ratio };
}

interface Tip { x: number; y: number; label: string; value: string }
interface Props { data: ProjectItem[] }

export default function BrazilMap({ data }: Props) {
    const [features, setFeatures]     = useState<GeoFeature[]>([]);
    const [metric, setMetric]         = useState<Metric>("count");
    const [transform, setTransform]   = useState<Transform>(INIT);
    const [hoveredUf, setHoveredUf]   = useState<string | null>(null);
    const [tip, setTip]               = useState<Tip | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const svgRef       = useRef<SVGSVGElement>(null);
    const dragRef      = useRef<{ sx: number; sy: number; tx: number; ty: number } | null>(null);
    const pinchRef     = useRef<{ dist: number; cx: number; cy: number } | null>(null);
    const transformRef = useRef<Transform>(INIT);
    transformRef.current = transform;

    useEffect(() => {
        fetch(GEO_URL).then((r) => r.json()).then((d) => setFeatures(d.features));
    }, []);

    // Non-passive wheel + touch listeners (must be non-passive to preventDefault)
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const rect = svg.getBoundingClientRect();
            const cx = ((e.clientX - rect.left) / rect.width) * W;
            const cy = ((e.clientY - rect.top)  / rect.height) * H;
            setTransform((t) => zoomToward(t, e.deltaY > 0 ? 0.85 : 1.18, cx, cy));
        };

        const onTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            if (e.touches.length === 1) {
                const t = e.touches[0];
                dragRef.current = { sx: t.clientX, sy: t.clientY, tx: transformRef.current.x, ty: transformRef.current.y };
                setIsDragging(true);
            } else if (e.touches.length === 2) {
                dragRef.current = null;
                setIsDragging(false);
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                pinchRef.current = {
                    dist: Math.hypot(dx, dy),
                    cx: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                    cy: (e.touches[0].clientY + e.touches[1].clientY) / 2,
                };
            }
        };

        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const rect = svg.getBoundingClientRect();
            if (e.touches.length === 1 && dragRef.current) {
                const touch = e.touches[0];
                const scaleX = W / rect.width;
                const scaleY = H / rect.height;
                const { tx, ty, sx: startX, sy: startY } = dragRef.current;
                setTransform((t) => ({ ...t, x: tx + (touch.clientX - startX) * scaleX, y: ty + (touch.clientY - startY) * scaleY }));
            } else if (e.touches.length === 2 && pinchRef.current) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const newDist = Math.hypot(dx, dy);
                const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
                const cx = ((midX - rect.left) / rect.width) * W;
                const cy = ((midY - rect.top)  / rect.height) * H;
                const factor = newDist / pinchRef.current.dist; // capture before async callback
                pinchRef.current = { dist: newDist, cx: midX, cy: midY };
                setTransform((t) => zoomToward(t, factor, cx, cy));
            }
        };

        const onTouchEnd = (e: TouchEvent) => {
            if (e.touches.length === 0) {
                dragRef.current = null;
                pinchRef.current = null;
                setIsDragging(false);
            } else if (e.touches.length === 1 && pinchRef.current) {
                pinchRef.current = null;
                const touch = e.touches[0];
                dragRef.current = { sx: touch.clientX, sy: touch.clientY, tx: transformRef.current.x, ty: transformRef.current.y };
            }
        };

        svg.addEventListener("wheel",        onWheel,      { passive: false });
        svg.addEventListener("touchstart",   onTouchStart, { passive: false });
        svg.addEventListener("touchmove",    onTouchMove,  { passive: false });
        svg.addEventListener("touchend",     onTouchEnd,   { passive: false });
        svg.addEventListener("touchcancel",  onTouchEnd,   { passive: false });

        return () => {
            svg.removeEventListener("wheel",       onWheel);
            svg.removeEventListener("touchstart",  onTouchStart);
            svg.removeEventListener("touchmove",   onTouchMove);
            svg.removeEventListener("touchend",    onTouchEnd);
            svg.removeEventListener("touchcancel", onTouchEnd);
        };
    }, []);

    const byState = useMemo(() => {
        const map: Record<string, { count: number; total: number }> = {};
        for (const item of data) {
            if (!map[item.state]) map[item.state] = { count: 0, total: 0 };
            map[item.state].count++;
            map[item.state].total += item.progress;
        }
        return map;
    }, [data]);

    const maxCount = useMemo(
        () => Math.max(...Object.values(byState).map((d) => d.count), 1),
        [byState]
    );

    const getColor = useCallback(
        (uf: string) => {
            const d = byState[uf];
            if (!d) return "#e2e8f0";
            if (metric === "count") return countColor(d.count / maxCount);
            return progressColor((d.total / d.count) / 100);
        },
        [byState, maxCount, metric]
    );

    const getValue = useCallback(
        (uf: string) => {
            const d = byState[uf];
            if (!d) return "Sem projetos";
            if (metric === "count") return `${d.count} projeto${d.count !== 1 ? "s" : ""}`;
            return `${Math.round(d.total / d.count)}% de progresso`;
        },
        [byState, metric]
    );

    function onMouseDown(e: React.MouseEvent<SVGSVGElement>) {
        dragRef.current = { sx: e.clientX, sy: e.clientY, tx: transform.x, ty: transform.y };
        setIsDragging(true);
    }

    function onMouseMove(e: React.MouseEvent<SVGSVGElement>) {
        if (!dragRef.current || !svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const scaleX = W / rect.width;
        const scaleY = H / rect.height;
        // Capture before setTransform callback runs asynchronously
        const { tx, ty, sx: startX, sy: startY } = dragRef.current;
        setTransform((t) => ({
            ...t,
            x: tx + (e.clientX - startX) * scaleX,
            y: ty + (e.clientY - startY) * scaleY,
        }));
    }

    function onMouseUp() {
        dragRef.current = null;
        setIsDragging(false);
    }

    function animateTo(target: Transform) {
        const start = { ...transformRef.current };
        const t0 = performance.now();
        const duration = 220;
        function step(now: number) {
            const p = Math.min((now - t0) / duration, 1);
            const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
            setTransform({
                x: start.x + (target.x - start.x) * e,
                y: start.y + (target.y - start.y) * e,
                k: start.k + (target.k - start.k) * e,
            });
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const legendSteps = useMemo(() => {
        if (metric === "count") {
            return [
                { color: "#e2e8f0",        label: "Sem dados" },
                { color: countColor(0.25), label: "Poucos" },
                { color: countColor(0.5),  label: "Moderado" },
                { color: countColor(0.75), label: "Muitos" },
                { color: countColor(1),    label: "Máximo" },
            ];
        }
        return [
            { color: progressColor(0.125), label: "0–25%" },
            { color: progressColor(0.375), label: "26–50%" },
            { color: progressColor(0.625), label: "51–75%" },
            { color: progressColor(0.875), label: "76–90%" },
            { color: progressColor(1),     label: "91–100%" },
        ];
    }, [metric]);

    const groupTransform = `translate(${transform.x},${transform.y}) scale(${transform.k})`;
    const strokeW = (0.5 / transform.k).toFixed(3);

    return (
        <MapCard>
            <MapHeader>
                <MapTitle>Distribuição por Estado</MapTitle>
                <ToggleGroup>
                    <ToggleBtn $active={metric === "count"} onClick={() => setMetric("count")}>
                        Quantidade
                    </ToggleBtn>
                    <ToggleBtn $active={metric === "percentage"} onClick={() => setMetric("percentage")}>
                        Progresso médio
                    </ToggleBtn>
                </ToggleGroup>
            </MapHeader>

            <MapBody>
                <MapContentRow>
                    <MapMapArea>
                        <MapSvgClip>
                            <svg
                                ref={svgRef}
                                viewBox={`0 0 ${W} ${H}`}
                                preserveAspectRatio="xMidYMid meet"
                                style={{ width: "100%", cursor: isDragging ? "grabbing" : "grab", display: "block" }}
                                onMouseDown={onMouseDown}
                                onMouseMove={onMouseMove}
                                onMouseUp={onMouseUp}
                                onMouseLeave={onMouseUp}
                            >
                                <g transform={groupTransform}>
                                    {features.map((feature) => {
                                        const uf = feature.properties.sigla;
                                        return (
                                            <path
                                                key={uf}
                                                d={geoToPath(feature.geometry)}
                                                fill={hoveredUf === uf ? "#1a3a6e" : getColor(uf)}
                                                stroke="#fff"
                                                strokeWidth={strokeW}
                                                style={{ cursor: "pointer" }}
                                                onMouseEnter={(e) => {
                                                    setHoveredUf(uf);
                                                    setTip({ x: e.clientX, y: e.clientY, label: UF_NAMES[uf] ?? uf, value: getValue(uf) });
                                                }}
                                                onMouseMove={(e) =>
                                                    setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : null))
                                                }
                                                onMouseLeave={() => {
                                                    setHoveredUf(null);
                                                    setTip(null);
                                                }}
                                            />
                                        );
                                    })}
                                </g>
                            </svg>
                        </MapSvgClip>

                        <ZoomControls>
                            <ZoomBtn onClick={() => animateTo(zoomToward(transformRef.current, 1.5))} title="Aproximar">+</ZoomBtn>
                            <ZoomBtn onClick={() => animateTo(zoomToward(transformRef.current, 1 / 1.5))} title="Afastar">−</ZoomBtn>
                            <ZoomBtn onClick={() => animateTo(INIT)} title="Resetar">↺</ZoomBtn>
                        </ZoomControls>
                    </MapMapArea>

                    <MapLegendPanel>
                        <LegendPanelTitle>
                            {metric === "count" ? "Quantidade" : "Progresso"}
                        </LegendPanelTitle>
                        {legendSteps.map((step, i) => (
                            <LegendStep key={i}>
                                <LegendSwatch $color={step.color} />
                                <LegendStepLabel>{step.label}</LegendStepLabel>
                            </LegendStep>
                        ))}
                    </MapLegendPanel>
                </MapContentRow>

                {tip && (
                    <TooltipBox style={{ left: tip.x + 14, top: tip.y - 52 }}>
                        <strong>{tip.label}</strong>
                        <span>{tip.value}</span>
                    </TooltipBox>
                )}
            </MapBody>
        </MapCard>
    );
}
