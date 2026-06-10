export interface Proposal {
    id: string;
    nome: string;
    situacao: string;
    uf: string;
    data: string;
}

const mockData: Proposal[] = [
    { id: "1", nome: "Hospital das Clínicas SP", situacao: "Em análise", uf: "SP", data: "2026-01-15" },
    { id: "2", nome: "INCA Rio de Janeiro", situacao: "Proposta concluída", uf: "RJ", data: "2026-02-20" },
    { id: "3", nome: "Hospital Erasto Gaertner", situacao: "Em análise", uf: "PR", data: "2026-03-10" },
    { id: "4", nome: "Hospital São Lucas", situacao: "Proposta concluída", uf: "RS", data: "2026-04-05" },
    { id: "5", nome: "Hospital Universitário CE", situacao: "Em análise", uf: "CE", data: "2026-04-22" },
    { id: "6", nome: "Centro Oncológico BA", situacao: "Em revisão", uf: "BA", data: "2026-05-01" },
    { id: "7", nome: "Hospital de Base DF", situacao: "Proposta concluída", uf: "DF", data: "2026-05-14" },
    { id: "8", nome: "HEMOCE Fortaleza", situacao: "Em análise", uf: "CE", data: "2026-05-28" },
];

export const proposalService = {
    getLengthProposal: async (): Promise<{ status: boolean; message?: string; data: Proposal[] }> => {
        await new Promise((r) => setTimeout(r, 500));
        return { status: true, data: mockData };
    },
};
