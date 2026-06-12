import { Input, Wrapper } from "./styled";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <Wrapper>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Buscar por assunto, NUP, tecnologia ou observações..."
            />
        </Wrapper>
    );
}
