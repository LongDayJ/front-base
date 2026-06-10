"use client";
import Footer from "@/components/footer/page";
import Topbar from "@/components/Topbar/page";
import styled from "styled-components";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
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
`;
