import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null;
  return NextResponse.json({
    ok: true,
    service: "portfolio",
    version: sha ?? "local",
    environment: process.env.VERCEL_ENV ?? "development",
    timestamp: new Date().toISOString(),
  });
}
