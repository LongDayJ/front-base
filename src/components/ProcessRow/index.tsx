"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { type Process } from "@/components/ProcessDashboard/mock";
import StatusBadge from "@/components/StatusBadge";
import TipoBadge from "@/components/TipoBadge";
import {
    ActionsCell,
    ActionBtn,
    ObsDash,
    ReportLink,
    Td,
    TdAssunto,
    TdObs,
    Tr,
    ModalOverlay,
    ModalBox,
    ModalHeader,
    ModalTitle,
    ModalCloseBtn,
    ModalBody,
    ModalGrid,
    ModalField,
    ModalLabel,
    ModalValue,
    ModalDivider,
    ModalFooter,
    ConfirmBox,
    ConfirmText,
    DeleteBtn,
    FormField,
    FormLabel,
    FormInput,
    FormSelect,
    FormTextarea,
    CancelBtn,
    SaveBtn,
} from "./styled";

interface ProcessRowProps {
    process: Process;
    onUpdate: (updated: Process) => void;
    onDelete: (id: string) => void;
}

/* ─── Ícones ────────────────────────────────────────────── */

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

function IconX() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

/* ─── Modal de visualização ─────────────────────────────── */

function ViewModal({ process, onClose }: { process: Process; onClose: () => void }) {
    return createPortal(
        <ModalOverlay onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Detalhes do Processo</ModalTitle>
                    <ModalCloseBtn onClick={onClose} title="Fechar">
                        <IconX />
                    </ModalCloseBtn>
                </ModalHeader>

                <ModalBody>
                    <ModalGrid>
                        <ModalField>
                            <ModalLabel>Status</ModalLabel>
                            <StatusBadge status={process.status} />
                        </ModalField>

                        <ModalField>
                            <ModalLabel>Tipo</ModalLabel>
                            <TipoBadge tipo={process.tipo} />
                        </ModalField>
                    </ModalGrid>

                    <ModalDivider />

                    <ModalGrid>
                        <ModalField $span>
                            <ModalLabel>NUP</ModalLabel>
                            <ModalValue style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#475569' }}>
                                {process.nup}
                            </ModalValue>
                        </ModalField>

                        <ModalField $span>
                            <ModalLabel>Relatório</ModalLabel>
                            <ReportLink href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.85rem' }}>
                                {process.relatorio}
                                <IconExternalLink />
                            </ReportLink>
                        </ModalField>
                    </ModalGrid>

                    <ModalDivider />

                    <ModalField $span>
                        <ModalLabel>Assunto / Demanda</ModalLabel>
                        <ModalValue>{process.assunto}</ModalValue>
                    </ModalField>

                    <ModalField $span>
                        <ModalLabel>Observações</ModalLabel>
                        <ModalValue>
                            {process.observacoes ?? <ObsDash>Nenhuma observação registrada</ObsDash>}
                        </ModalValue>
                    </ModalField>
                </ModalBody>
            </ModalBox>
        </ModalOverlay>,
        document.body
    );
}

/* ─── Modal de edição ───────────────────────────────────── */

function EditModal({ process, onClose, onSave }: {
    process: Process;
    onClose: () => void;
    onSave: (updated: Process) => void;
}) {
    const [form, setForm] = useState<Process>({ ...process });

    function set<K extends keyof Process>(key: K, value: Process[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleSave() {
        onSave({
            ...form,
            observacoes: form.observacoes?.trim() || null,
        });
        onClose();
    }

    return createPortal(
        <ModalOverlay onClick={onClose}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Editar Processo</ModalTitle>
                    <ModalCloseBtn onClick={onClose} title="Fechar">
                        <IconX />
                    </ModalCloseBtn>
                </ModalHeader>

                <ModalBody>
                    <ModalGrid>
                        <FormField>
                            <FormLabel htmlFor="edit-status">Status</FormLabel>
                            <FormSelect
                                id="edit-status"
                                value={form.status}
                                onChange={(e) => set('status', e.target.value as Process['status'])}
                            >
                                <option value="Finalizado">Finalizado</option>
                                <option value="Sobrestado">Sobrestado</option>
                                <option value="Aguardando área técnica">Aguardando área técnica</option>
                                <option value="Área técnica retornou">Área técnica retornou</option>
                            </FormSelect>
                        </FormField>

                        <FormField>
                            <FormLabel htmlFor="edit-tipo">Tipo</FormLabel>
                            <FormSelect
                                id="edit-tipo"
                                value={form.tipo}
                                onChange={(e) => set('tipo', e.target.value as Process['tipo'])}
                            >
                                <option value="novo">Novo</option>
                                <option value="atualizacao">Atualização</option>
                            </FormSelect>
                        </FormField>
                    </ModalGrid>

                    <ModalDivider />

                    <ModalGrid>
                        <FormField $span>
                            <FormLabel htmlFor="edit-nup">NUP</FormLabel>
                            <FormInput
                                id="edit-nup"
                                value={form.nup}
                                onChange={(e) => set('nup', e.target.value)}
                                style={{ fontFamily: 'monospace' }}
                            />
                        </FormField>

                        <FormField $span>
                            <FormLabel htmlFor="edit-relatorio">Relatório</FormLabel>
                            <FormInput
                                id="edit-relatorio"
                                value={form.relatorio}
                                onChange={(e) => set('relatorio', e.target.value)}
                            />
                        </FormField>
                    </ModalGrid>

                    <ModalDivider />

                    <FormField $span>
                        <FormLabel htmlFor="edit-assunto">Assunto / Demanda</FormLabel>
                        <FormTextarea
                            id="edit-assunto"
                            value={form.assunto}
                            onChange={(e) => set('assunto', e.target.value)}
                            rows={3}
                        />
                    </FormField>

                    <FormField $span>
                        <FormLabel htmlFor="edit-obs">Observações</FormLabel>
                        <FormTextarea
                            id="edit-obs"
                            value={form.observacoes ?? ''}
                            onChange={(e) => set('observacoes', e.target.value)}
                            rows={3}
                            placeholder="Nenhuma observação..."
                        />
                    </FormField>
                </ModalBody>

                <ModalFooter>
                    <CancelBtn type="button" onClick={onClose}>Cancelar</CancelBtn>
                    <SaveBtn type="button" onClick={handleSave}>Salvar alterações</SaveBtn>
                </ModalFooter>
            </ModalBox>
        </ModalOverlay>,
        document.body
    );
}

/* ─── Modal de confirmação de exclusão ──────────────────── */

function ConfirmModal({ process, onClose, onConfirm }: {
    process: Process;
    onClose: () => void;
    onConfirm: () => void;
}) {
    return createPortal(
        <ModalOverlay onClick={onClose}>
            <ConfirmBox onClick={(e) => e.stopPropagation()}>
                <ModalTitle>Excluir processo</ModalTitle>
                <ConfirmText>
                    Tem certeza que deseja excluir o processo{' '}
                    <strong>{process.nup}</strong>? Esta ação não pode ser desfeita.
                </ConfirmText>
                <ModalFooter style={{ padding: 0, border: 'none', background: 'transparent', position: 'static' }}>
                    <CancelBtn type="button" onClick={onClose}>Cancelar</CancelBtn>
                    <DeleteBtn type="button" onClick={onConfirm}>Excluir</DeleteBtn>
                </ModalFooter>
            </ConfirmBox>
        </ModalOverlay>,
        document.body
    );
}

/* ─── Linha da tabela ───────────────────────────────────── */

export default function ProcessRow({ process, onUpdate, onDelete }: ProcessRowProps) {
    const [viewOpen,    setViewOpen]    = useState(false);
    const [editOpen,    setEditOpen]    = useState(false);
    const [deleteOpen,  setDeleteOpen]  = useState(false);

    return (
        <>
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
                        <ActionBtn $color="#34a853" $hoverColor="#34a853" title="Ver" onClick={() => setViewOpen(true)}>
                            <IconEye />
                        </ActionBtn>
                        <ActionBtn $color="#1a73e8" $hoverColor="#1a73e8" title="Editar" onClick={() => setEditOpen(true)}>
                            <IconPencil />
                        </ActionBtn>
                        <ActionBtn $color="#e53935" $hoverColor="#e53935" title="Excluir" onClick={() => setDeleteOpen(true)}>
                            <IconTrash />
                        </ActionBtn>
                    </ActionsCell>
                </Td>
            </Tr>

            {viewOpen && <ViewModal process={process} onClose={() => setViewOpen(false)} />}
            {editOpen && (
                <EditModal
                    process={process}
                    onClose={() => setEditOpen(false)}
                    onSave={onUpdate}
                />
            )}
            {deleteOpen && (
                <ConfirmModal
                    process={process}
                    onClose={() => setDeleteOpen(false)}
                    onConfirm={() => { onDelete(process.id); setDeleteOpen(false); }}
                />
            )}
        </>
    );
}
