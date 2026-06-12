"use client";

import { useState } from "react";
import { type Process } from "@/components/ProcessDashboard/mock";
import ProcessRow from "@/components/ProcessRow";
import { EmptyRow, Table, TableWrapper, Tbody, Th, ThInner, Thead, SortIcon } from "./styled";

type SortKey = keyof Pick<Process, 'status' | 'nup' | 'tipo' | 'relatorio' | 'assunto'>;

interface ProcessTableProps {
    processes: Process[];
    onUpdate: (updated: Process) => void;
    onDelete: (id: string) => void;
}

const COLUMNS: { key: SortKey; label: string; sortable: boolean }[] = [
    { key: 'status',    label: 'Status',          sortable: true },
    { key: 'nup',       label: 'NUP',             sortable: true },
    { key: 'tipo',      label: 'Tipo',            sortable: true },
    { key: 'relatorio', label: 'Relatório',       sortable: true },
    { key: 'assunto',   label: 'Assunto / Demanda', sortable: true },
];

export default function ProcessTable({ processes, onUpdate, onDelete }: ProcessTableProps) {
    const [sortKey, setSortKey] = useState<SortKey>('status');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    function handleSort(key: SortKey) {
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    }

    const sorted = [...processes].sort((a, b) => {
        const av = a[sortKey] ?? '';
        const bv = b[sortKey] ?? '';
        return sortDir === 'asc'
            ? String(av).localeCompare(String(bv), 'pt-BR')
            : String(bv).localeCompare(String(av), 'pt-BR');
    });

    return (
        <TableWrapper>
            <Table>
                <Thead>
                    <tr>
                        {COLUMNS.map((col) => (
                            <Th
                                key={col.key}
                                $sortable={col.sortable}
                                onClick={() => col.sortable && handleSort(col.key)}
                            >
                                <ThInner>
                                    {col.label}
                                    {col.sortable && (
                                        <SortIcon $active={sortKey === col.key} $dir={sortDir} />
                                    )}
                                </ThInner>
                            </Th>
                        ))}
                        <Th>Observações</Th>
                        <Th />
                    </tr>
                </Thead>
                <Tbody>
                    {sorted.length === 0 ? (
                        <EmptyRow>
                            <td colSpan={7}>Nenhum processo encontrado</td>
                        </EmptyRow>
                    ) : (
                        sorted.map((p) => <ProcessRow key={p.id} process={p} onUpdate={onUpdate} onDelete={onDelete} />)
                    )}
                </Tbody>
            </Table>
        </TableWrapper>
    );
}
