import { type Process } from "@/components/ProcessDashboard/mock";
import StatusBadge from "@/components/StatusBadge";
import TipoBadge from "@/components/TipoBadge";
import { ActionsCell, ActionBtn, ObsDash, ReportLink, Td, TdAssunto, TdObs, Tr } from "./styled";

interface ProcessRowProps {
    process: Process;
}

function IconExternalLink() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}

function IconEye() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function IconPencil() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
    );
}

function IconTrash() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" /><path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
    );
}

export default function ProcessRow({ process }: ProcessRowProps) {
    return (
        <Tr>
            <Td data-label="Status"><StatusBadge status={process.status} /></Td>
            <Td data-label="NUP" style={{ whiteSpace: 'nowrap', color: '#64748b', fontSize: '0.78rem' }}>{process.nup}</Td>
            <Td data-label="Tipo"><TipoBadge tipo={process.tipo} /></Td>
            <Td data-label="Relatório">
                <ReportLink href="#" onClick={(e) => e.preventDefault()}>
                    {process.relatorio}
                    <IconExternalLink />
                </ReportLink>
            </Td>
            <TdAssunto data-label="Assunto">{process.assunto}</TdAssunto>
            <TdObs data-label="Observações">
                {process.observacoes ?? <ObsDash>—</ObsDash>}
            </TdObs>
            <Td>
                <ActionsCell>
                    <ActionBtn $color="#34a853" $hoverColor="#34a853" title="Ver">
                        <IconEye />
                    </ActionBtn>
                    <ActionBtn $color="#1a73e8" $hoverColor="#1a73e8" title="Editar">
                        <IconPencil />
                    </ActionBtn>
                    <ActionBtn $color="#e53935" $hoverColor="#e53935" title="Excluir">
                        <IconTrash />
                    </ActionBtn>
                </ActionsCell>
            </Td>
        </Tr>
    );
}
