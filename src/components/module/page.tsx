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
  PermissionTag,
  PermissionTagsRow,
  ProfileAvatar,
  ProfileButton,
  ProfileInfo,
  ProfileName,
  ProfilesGrid,
  ThemeButton,
  ThemeButtonsGrid,
  ThemeDot,
  SideBySideRow,
} from "./styled";
import Loading from "../spinner/page";
import { useAuth } from "@/context/auth/auth.context";
import { useRouter } from "next/navigation";
import { proposalService } from "@/services/proposal/Proposal";
import { useAlert } from "@/providers/alert/page";
import { type ThemeName, useThemeContext } from "@/context/theme/theme.context";
import { useDevUser } from "@/context/devUser/devUser.context";
import StorageInspector from "@/components/StorageInspector/page";
import FeatureFlagsCard from "@/components/FeatureFlagsCard/page";
import RouteInspector from "@/components/RouteInspector/page";
import CSSTokenInspector from "@/components/CSSTokenInspector/page";
import ViewportSimulator from "@/components/ViewportSimulator/page";
import GridOverlay from "@/components/GridOverlay/page";

const THEME_OPTIONS: { name: ThemeName; label: string; color: string }[] = [
  { name: "padrao", label: "Verde Escuro", color: "#1b5e3b" },
  { name: "azulEscuro", label: "Azul Escuro", color: "#0d1b4b" },
  { name: "azulClaro", label: "Azul Claro", color: "#0e6fa8" },
  { name: "verdeClaro", label: "Verde Claro", color: "#2e7d52" },
  { name: "vermelho", label: "Vermelho", color: "#6b1a1a" },
  { name: "amarelo", label: "Amarelo", color: "#b8860b" },
];

export default function Page() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const { callMessage } = useAlert();
  const { activeTheme, setTheme } = useThemeContext();
  const { activeProfile, setProfile, profiles } = useDevUser();
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
        callMessage(response.message ?? "Sistema está temporariamente fora do ar!", "error");
        setInterval(async () => {
          await logout();
        }, 1800);
      }
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
        <ModuleCard $color="#0ea5e9">
          <CardIcon>
            <ProfileAvatar $color={activeProfile.color} style={{ width: "100%", height: "100%", borderRadius: "1vw", fontSize: "1.2vw" }}>
              {activeProfile.initials}
            </ProfileAvatar>
          </CardIcon>
          <Card>
            <CardTitle>Perfil de Dev</CardTitle>
            <CardDescription>Simule diferentes perfis sem autenticação real. A escolha fica salva.</CardDescription>
            <ProfilesGrid>
              {profiles.map((profile) => (
                <ProfileButton
                  key={profile.id}
                  $color={profile.color}
                  $active={activeProfile.id === profile.id}
                  onClick={() => setProfile(profile.id)}
                >
                  <ProfileAvatar $color={profile.color}>{profile.initials}</ProfileAvatar>
                  <ProfileInfo>
                    <ProfileName>{profile.name}</ProfileName>
                    <PermissionTagsRow>
                      {profile.permissions.map((perm) => (
                        <PermissionTag key={perm} $color={profile.color}>{perm}</PermissionTag>
                      ))}
                    </PermissionTagsRow>
                  </ProfileInfo>
                </ProfileButton>
              ))}
            </ProfilesGrid>
          </Card>
        </ModuleCard>
        <FeatureFlagsCard />
        <GridOverlay />
        <ViewportSimulator />
        <RouteInspector />
        <SideBySideRow>
          <CSSTokenInspector />
          <StorageInspector />
        </SideBySideRow>
      </CardsContainer>
    </Container>
  );
}
