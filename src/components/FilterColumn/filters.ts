import { type Status } from "@/components/ProjectCards/mock";

export type ProgressRange = "all" | "0-25" | "26-50" | "51-75" | "76-100";
export type SortOption    = "progress_desc" | "progress_asc" | "name_asc" | "name_desc" | "delivery_asc" | "delivery_desc";

export const STATUS_OPTIONS: { value: Status; label: string; color: string }[] = [
    { value: "em_andamento", label: "Em andamento", color: "#1a3a6e" },
    { value: "nao_iniciado", label: "Não iniciado",  color: "#374151" },
    { value: "concluido",    label: "Concluído",     color: "#166534" },
    { value: "atrasado",     label: "Atrasado",      color: "#7f1d1d" },
    { value: "pendente",     label: "Pendente",      color: "#713f12" },
];

export const PROGRESS_OPTIONS: { value: ProgressRange; label: string }[] = [
    { value: "all",    label: "Qualquer" },
    { value: "0-25",   label: "0 – 25%" },
    { value: "26-50",  label: "26 – 50%" },
    { value: "51-75",  label: "51 – 75%" },
    { value: "76-100", label: "76 – 100%" },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "progress_desc",  label: "Maior progresso" },
    { value: "progress_asc",   label: "Menor progresso" },
    { value: "name_asc",       label: "Nome (A–Z)" },
    { value: "name_desc",      label: "Nome (Z–A)" },
    { value: "delivery_asc",   label: "Entrega mais próxima" },
    { value: "delivery_desc",  label: "Entrega mais distante" },
];

export const STATUS_BADGE_LABELS: Record<Status, string> = {
    em_andamento: "Em Andamento",
    concluido:    "Concluído",
    atrasado:     "Atrasado",
    nao_iniciado: "Não Iniciado",
    pendente:     "Pendente",
};

export function inProgressRange(p: number, range: ProgressRange): boolean {
    if (range === "all")    return true;
    if (range === "0-25")   return p <= 25;
    if (range === "26-50")  return p >= 26 && p <= 50;
    if (range === "51-75")  return p >= 51 && p <= 75;
    if (range === "76-100") return p >= 76;
    return true;
}

export function progressColor(v: number): string {
    if (v >= 76) return "#166534";
    if (v >= 51) return "#1e5fa8";
    if (v >= 26) return "#e67e22";
    return "#94a3b8";
}
export { Status };

