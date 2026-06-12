import { NextResponse } from "next/server";

export const revalidate = 86400;

interface IbgeState {
    id: number;
    sigla: string;
    nome: string;
}

interface GeoFeature {
    type: string;
    geometry: unknown;
    properties: Record<string, unknown>;
}

interface GeoCollection {
    type: string;
    features: GeoFeature[];
}

export async function GET() {
    try {
        const statesRes = await fetch(
            "https://servicodados.ibge.gov.br/api/v3/localidades/estados",
            { next: { revalidate: 86400 } }
        );
        const states: IbgeState[] = await statesRes.json();

        const results = await Promise.allSettled(
            states.map(async ({ id, sigla, nome }) => {
                const res = await fetch(
                    `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${id}?formato=application/vnd.geo+json&resolucao=2`,
                    { next: { revalidate: 86400 } }
                );
                const geo: GeoCollection = await res.json();
                const feature = geo.features?.[0];
                if (!feature) return null;
                return { ...feature, properties: { sigla, nome, id } };
            })
        );

        const features = results
            .filter((r): r is PromiseFulfilledResult<GeoFeature> => r.status === "fulfilled" && r.value !== null)
            .map((r) => r.value);

        return NextResponse.json(
            { type: "FeatureCollection", features },
            { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200" } }
        );
    } catch {
        return NextResponse.json({ error: "Falha ao carregar dados geográficos" }, { status: 500 });
    }
}
