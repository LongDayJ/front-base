"use client";

import { MouseEvent, useState } from "react";
import { useAuth } from "@/context/auth/auth.context";
import { useAlert } from "@/providers/alert/page";
import { validateLogin } from "@/utils/validateEmail";
import Loading from "../spinner/page";
import {
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
    CardTitle,
    DemoHint,
    Divider,
    Field,
    Form,
    Input,
    InputWrapper,
    OrgLabel,
    ShieldIcon,
    SubmitButton,
    WarningBox,
} from "./styled";

export default function LoginPanel2() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const { callMessage } = useAlert();
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsLoading(true);

        const response = validateLogin({ email, password });

        if (!response.valid) {
            if (response.errors.email) callMessage(response.errors.email, "warning");
            else if (response.errors.password) callMessage(response.errors.password, "warning");
            setIsLoading(false);
            return null;
        }

        const responseLogin = await login(email, password);

        if (!responseLogin.status) callMessage(responseLogin.message ?? "Sistema está temporariamente fora do ar!", "error");
        setIsLoading(false);
    }

    return (
        <Card>
            <CardHeader>
                <ShieldIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                </ShieldIcon>

                <CardTitle>*Sigla do Projeto*</CardTitle>

                <CardSubtitle>
                    Nome do projeto
                    <br />por extenso
                </CardSubtitle>
            </CardHeader>

            <CardBody>
                <OrgLabel>
                    MINISTÉRIO DA SAÚDE <span>— *Setor*</span>
                </OrgLabel>

                <Divider />

                <Form>
                    <Field>
                        <label>Usuário (E-mail Institucional)</label>
                        <InputWrapper>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="usuario@saude.gov.br"
                            />
                        </InputWrapper>
                    </Field>

                    <Field>
                        <label>Senha</label>
                        <InputWrapper>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                            />
                        </InputWrapper>
                    </Field>

                    <SubmitButton disabled={isLoading} type="submit" onClick={handleLogin}>
                        {isLoading ? (
                            <Loading text="" heightSpinner="22px" widthSpinner="22px" />
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <polyline points="10 17 15 12 10 7" />
                                    <line x1="15" y1="12" x2="3" y2="12" />
                                </svg>
                                Acessar o sistema
                            </>
                        )}
                    </SubmitButton>
                </Form>

                <WarningBox>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    Acesso restrito a servidores autorizados. O uso indevido deste sistema é passível de responsabilização administrativa e penal.
                </WarningBox>
            </CardBody>
        </Card>
    );
}
