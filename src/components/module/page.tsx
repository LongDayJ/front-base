"use client";

import { useEffect, useState } from "react";

import {
    Card,
    CardDescription,
    CardFooter,
    CardIcon,
    CardTitle,
    CardsContainer,
    Container,
    Greeting,
    GreetingContainer,
    GreetingSubtitle,
    LoadingContainer,
    ModuleCard,
} from "./styled";
import Loading from "../spinner/page";
import { useAuth } from "@/context/auth/auth.context";
import { useRouter } from "next/navigation";
import { proposalService } from "@/services/proposal/Proposal";
import { useAlert } from "@/providers/alert/page";
import { theme } from "@/styles/theme";

export default function Page() {
    const { user, isLoading, logout } = useAuth();
    const router = useRouter();
    const { callMessage } = useAlert();
    const [count, setCount] = useState(0);
    const [countActive, setCountActive] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/");
        }
    }, [isLoading, user, router]);

    useEffect(() => {
        const data = async () => {
            const response = await proposalService.getLengthProposal();

            if (!response.status) {
                callMessage(response.message ?? "Sistema SAH está temporariamente fora do ar!", "error");
                setInterval(async () => {
                    await logout();
                }, 1800);
            }
            setCount(response.data.filter((v) => v.situacao !== "Proposta concluída").length);
            setCountActive(response.data.filter((v) => v.situacao === "Proposta concluída").length);
            setLoading(false);
        };

        data();
    }, []);

    if (isLoading || loading) {
        return (
            <LoadingContainer>
                <Loading></Loading>
            </LoadingContainer>
        );
    }

    return (
        <Container>
            <GreetingContainer>
                <Greeting>Bom dia, {user?.name} 👋</Greeting>
            </GreetingContainer>
        </Container>
    );
}
