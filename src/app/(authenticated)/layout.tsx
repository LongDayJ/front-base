"use client";
import Footer from "@/components/footer/page";
import Loading from "@/components/spinner/page";
import Topbar from "@/components/Topbar/page";
import { useAuth } from "@/context/auth/auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/");
        }
    }, [isLoading, user, router]);

    if (isLoading) return <FullPageLoader><Loading /></FullPageLoader>;
    if (!user) return null;

    return (
        <Shell>
            <Topbar />
            <Main>{children}</Main>
            <Footer />
        </Shell>
    );
}

const Shell = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const FullPageLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
`;
