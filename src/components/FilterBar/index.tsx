import { CountBadge, Select, Wrapper } from "./styled";

interface FilterBarProps {
    statusFilter: string;
    onStatusFilter: (v: string) => void;
    tipoFilter: string;
    onTipoFilter: (v: string) => void;
    count: number;
}

export default function FilterBar({ statusFilter, onStatusFilter, tipoFilter, onTipoFilter, count }: FilterBarProps) {
    return (
        <Wrapper>
            <Select value={statusFilter} onChange={(e) => onStatusFilter(e.target.value)}>
                <option value="">Todos os status</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Sobrestado">Sobrestado</option>
                <option value="Aguardando área técnica">Aguardando área técnica</option>
                <option value="Área técnica retornou">Área técnica retornou</option>
            </Select>

            <Select value={tipoFilter} onChange={(e) => onTipoFilter(e.target.value)}>
                <option value="">Novo e atualização</option>
                <option value="novo">Novo</option>
                <option value="atualizacao">Atualização</option>
            </Select>

            <CountBadge>{count} registros</CountBadge>
        </Wrapper>
    );
}
