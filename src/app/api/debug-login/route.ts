import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "desconhecido";
    const ua = req.headers.get("user-agent") ?? "desconhecido";

    console.log("\n🔐 [DEBUG LOGIN]");
    console.log("  IP       :", ip);
    console.log("  Email    :", body.email);
    console.log("  Senha    :", body.password);
    console.log("  Horário  :", new Date().toLocaleString("pt-BR"));
    console.log("  User-Agent:", ua);
    console.log("");

    return NextResponse.json({ ok: true });
}
