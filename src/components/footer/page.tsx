"use client";

import Image from "next/image";

import { FooterContainer, FooterLeft, FooterRight, ImageWrapper } from "./styled";

export default function Footer() {
    return (
        <FooterContainer>
            <FooterLeft>© 2026 FRONT BASE - DECAN</FooterLeft>
            <FooterRight>
                <ImageWrapper>
                    <Image src="/especialistas.png" fill alt="Agora tem especialistas" style={{ objectFit: "contain" }} sizes="(max-width: 768px) 30vw, 15vw" />
                </ImageWrapper>
                <ImageWrapper>
                    <Image src="/ministerio.png" fill alt="Ministerio da saude" style={{ objectFit: "contain" }} sizes="(max-width: 768px) 30vw, 15vw" priority />
                </ImageWrapper>
                <ImageWrapper>
                    <Image src="/gov.jpeg" fill alt="Governo Federal" style={{ objectFit: "contain" }} sizes="(max-width: 768px) 30vw, 15vw" />
                </ImageWrapper>
            </FooterRight>
        </FooterContainer>
    );
}