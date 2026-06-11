"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import {
    ActivePathDisplay,
    EmptyParams,
    ParamsSection,
    ParamsSectionTitle,
    ParamsTable,
    ParamsTableHead,
    ParamsTd,
    ParamsTh,
    RouteCard,
    RouteCardDescription,
    RouteCardHeader,
    RouteCardIcon,
    RouteCardTitle,
    RouteGroupBadge,
    RouteHeaderText,
    RouteLabel,
    RouteList,
    RoutePath,
    RouteRow,
} from "./styled";

interface RouteEntry {
    path: string;
    label: string;
    group: string;
    isActive: boolean;
}

const REGISTERED_ROUTES = [
    { path: "/",       label: "Login",     group: "Pública"     },
    { path: "/login2", label: "Login v2",  group: "Pública"     },
    { path: "/dev",    label: "Dev Tools", group: "Autenticada" },
    { path: "/cards",  label: "Cards",  group: "Autenticada" },
];

const COLOR = "#84cc16";

function RouteInspectorInner() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const routes: RouteEntry[] = REGISTERED_ROUTES.map((r) => ({
        ...r,
        isActive: pathname === r.path,
    }));

    const queryEntries = Array.from(searchParams.entries());

    return (
        <RouteCard $color={COLOR}>
            <RouteCardHeader>
                <RouteCardIcon>🗺️</RouteCardIcon>
                <RouteHeaderText>
                    <RouteCardTitle>Route Inspector</RouteCardTitle>
                    <RouteCardDescription>
                        Navegue entre rotas e inspecione params da rota atual.
                    </RouteCardDescription>
                </RouteHeaderText>
            </RouteCardHeader>

            <RouteList>
                {routes.map((route) => (
                    <RouteRow
                        key={route.path}
                        $active={route.isActive}
                        $color={COLOR}
                        onClick={() => router.push(route.path)}
                    >
                        <RoutePath>{route.path}</RoutePath>
                        <RouteLabel>{route.label}</RouteLabel>
                        <RouteGroupBadge $group={route.group}>{route.group}</RouteGroupBadge>
                    </RouteRow>
                ))}
            </RouteList>

            <ParamsSection>
                <ParamsSectionTitle>Rota ativa</ParamsSectionTitle>
                <ActivePathDisplay $color={COLOR}>
                    {pathname}
                    {queryEntries.length > 0 && (
                        <span style={{ opacity: 0.6 }}>
                            ?{searchParams.toString()}
                        </span>
                    )}
                </ActivePathDisplay>

                <ParamsSectionTitle style={{ marginTop: "0.4rem" }}>
                    Query strings
                </ParamsSectionTitle>

                {queryEntries.length === 0 ? (
                    <EmptyParams>Sem query strings nesta rota.</EmptyParams>
                ) : (
                    <ParamsTable>
                        <ParamsTableHead>
                            <tr>
                                <ParamsTh>Param</ParamsTh>
                                <ParamsTh>Valor</ParamsTh>
                            </tr>
                        </ParamsTableHead>
                        <tbody>
                            {queryEntries.map(([key, value]) => (
                                <tr key={key}>
                                    <ParamsTd>{key}</ParamsTd>
                                    <ParamsTd>{value}</ParamsTd>
                                </tr>
                            ))}
                        </tbody>
                    </ParamsTable>
                )}
            </ParamsSection>
        </RouteCard>
    );
}

export default function RouteInspector() {
    return (
        <Suspense>
            <RouteInspectorInner />
        </Suspense>
    );
}
