import { readFile } from "node:fs/promises";

import { NextResponse } from "next/server";

import { profile } from "@/lib/data";
import { resumeDownloadFilename } from "@/lib/resume-download-name";
import { resolvePublicResumePdfPath } from "@/lib/resume";

export async function GET() {
  const filePath = await resolvePublicResumePdfPath();

  if (!filePath) {
    return NextResponse.json(
      {
        error:
          "Place exactly one .pdf file in the /public folder (no other PDFs).",
      },
      { status: 404 },
    );
  }

  try {
    const buffer = await readFile(filePath);
    const safeName = resumeDownloadFilename(profile.name).replace(
      /[^\w.\-()+ ]/g,
      "_",
    );

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not read resume file." },
      { status: 500 },
    );
  }
}
