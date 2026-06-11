"use client";

import { useEffect, useState } from "react";

import {
    AlertButtonsGrid,
    AlertTestButton,
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
    ThemeButton,
    ThemeButtonsGrid,
    ThemeDot,
} from "./styled";
import Loading from "../spinner/page";
import { useAuth } from "@/context/auth/auth.context";
import { useRouter } from "next/navigation";
import { proposalService } from "@/services/proposal/Proposal";
import { useAlert } from "@/providers/alert/page";
import { type ThemeName, useThemeContext } from "@/context/theme/theme.context";

const THEME_OPTIONS: { name: ThemeName; label: string; color: string }[] = [
    { name: "padrao",      label: "Verde Escuro",       color: "#1b5e3b" },
    { name: "azulEscuro",  label: "Azul Escuro",  color: "#0d1b4b" },
    { name: "azulClaro",   label: "Azul Claro",   color: "#0e6fa8" },
    { name: "verdeClaro",  label: "Verde Claro",  color: "#2e7d52" },
    { name: "vermelho",    label: "Vermelho",     color: "#6b1a1a" },
    { name: "amarelo",     label: "Amarelo",      color: "#b8860b" },
];

export default function Page() {
    const { user, isLoading, logout } = useAuth();
    const router = useRouter();
    const { callMessage } = useAlert();
    const { activeTheme, setTheme } = useThemeContext();
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
            <CardsContainer>
                <ModuleCard $color="#a855f7">
                    <CardIcon>🧪</CardIcon>
                    <Card>
                        <CardTitle>Testar Alertas</CardTitle>
                        <CardDescription>Dispare cada tipo de alerta para verificar o comportamento.</CardDescription>
                        <AlertButtonsGrid>
                            <AlertTestButton $color="#4ade80" onClick={() => callMessage("Operação realizada com sucesso!", "success")}>✓ Sucesso</AlertTestButton>
                            <AlertTestButton $color="#fbbf24" onClick={() => callMessage("Atenção: verifique os dados!", "warning")}>⚠ Aviso</AlertTestButton>
                            <AlertTestButton $color="#f87171" onClick={() => callMessage("Erro ao processar a requisição.", "error")}>✕ Erro</AlertTestButton>
                            <AlertTestButton $color="#60a5fa" onClick={() => callMessage("Informação importante aqui.", "info")}>ℹ Info</AlertTestButton>
                        </AlertButtonsGrid>
                    </Card>
                </ModuleCard>

                <ModuleCard $color="#ec4899">
                    <CardIcon>🎨</CardIcon>
                    <Card>
                        <CardTitle>Testar Temas</CardTitle>
                        <CardDescription>Escolha um tema para aplicar em toda a aplicação. A escolha fica salva.</CardDescription>
                        <ThemeButtonsGrid>
                            {THEME_OPTIONS.map((t) => (
                                <ThemeButton
                                    key={t.name}
                                    $color={t.color}
                                    $active={activeTheme === t.name}
                                    onClick={() => setTheme(t.name)}
                                >
                                    <ThemeDot $color={t.color} />
                                    {activeTheme === t.name ? `✓ ${t.label}` : t.label}
                                </ThemeButton>
                            ))}
                        </ThemeButtonsGrid>
                    </Card>
                </ModuleCard>
            </CardsContainer>
        </Container>
    );
}
