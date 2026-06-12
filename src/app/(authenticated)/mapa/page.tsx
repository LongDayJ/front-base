import BrazilMap from "@/components/BrazilMap";
import { MOCK_ITEMS } from "@/components/ProjectCards/mock";
import styled from "styled-components";

const PageWrapper = styled.div`
    flex: 1;
    width: 100%;
    background: #f0f2f5;
    padding: 1.5rem 2rem 0;

    @media (max-width: 768px) {
        padding: 0;
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
    }
`;

export default function MapaPage() {
    return (
        <PageWrapper>
            <BrazilMap data={MOCK_ITEMS} />
        </PageWrapper>
    );
}
