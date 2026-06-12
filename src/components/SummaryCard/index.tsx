import { ReactNode } from "react";
import { Card, CardCount, CardIcon, CardLabel, CardSublabel, CardTop } from "./styled";

interface SummaryCardProps {
    label: string;
    count: number;
    sublabel: string;
    borderColor: string;
    icon: ReactNode;
}

export default function SummaryCard({ label, count, sublabel, borderColor, icon }: SummaryCardProps) {
    return (
        <Card $borderColor={borderColor}>
            <CardTop>
                <CardLabel>{label}</CardLabel>
                <CardIcon $color={borderColor}>{icon}</CardIcon>
            </CardTop>
            <CardCount $color={borderColor}>{count}</CardCount>
            <CardSublabel>{sublabel}</CardSublabel>
        </Card>
    );
}
