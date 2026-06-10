"use client";

import LoginPanel2 from "@/components/LoginPanel2/page";
import { AlertBar, FooterLeft, FooterRight, Main, PageFooter, PageWrapper } from "./styled";

export default function HeroPanel2() {
    return (
        <PageWrapper>
            <AlertBar>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Acesso restrito a Usuários Autorizados — Sistema de uso exclusivo do Ministério da Saúde
            </AlertBar>

            <Main>
                <LoginPanel2 />
            </Main>

            <PageFooter>
                <FooterLeft>© 2026 Ministério da Saúde — *Setor* · *Projeto* v1.0 · Todos os direitos reservados</FooterLeft>
                <FooterRight>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Acesso restrito a Usuários Autorizados
                </FooterRight>
            </PageFooter>
        </PageWrapper>
    );
}
