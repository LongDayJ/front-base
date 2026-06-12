import { Badge } from "./styled";

interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    return <Badge $status={status}>{status}</Badge>;
}
