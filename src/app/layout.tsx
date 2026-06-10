import type { Metadata } from "next";
import { Sora } from "next/font/google";
import Providers from "@/providers/Providers";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

export const metadata: Metadata = {
    title: "Front Base",
    description: "Base de front para o desenvolvimento de novos sistemas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className={sora.variable}>
            <body style={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
                <style>{`
                    *, *::before, *::after { box-sizing: border-box; }
                    body { margin: 0; font-family: var(--font-sora), system-ui, sans-serif; }
                    :root {
                        --font-geist-sans: system-ui, -apple-system, sans-serif;
                        --font-geist-mono: ui-monospace, 'Courier New', monospace;
                    }
                `}</style>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
