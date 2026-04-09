import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { profile } from "@/lib/data";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "public",
    profile.resumePublicFilename,
  );

  try {
    const buffer = await readFile(filePath);
    const safeName = profile.resumeDownloadFilename.replace(/[^\w.\-()+ ]/g, "_");
    const isPdf = profile.resumePublicFilename.toLowerCase().endsWith(".pdf");
    const contentType = isPdf
      ? "application/pdf"
      : "text/plain; charset=utf-8";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Resume file not found. Add it to /public or update profile.resumePublicFilename." },
      { status: 404 },
    );
  }
}
