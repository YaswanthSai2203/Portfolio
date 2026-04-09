import { readdir } from "node:fs/promises";
import path from "node:path";

/**
 * Expects exactly one `.pdf` in /public. Returns absolute path or null if not exactly one.
 */
export async function resolvePublicResumePdfPath(): Promise<string | null> {
  const publicDir = path.join(process.cwd(), "public");
  let entries;
  try {
    entries = await readdir(publicDir, { withFileTypes: true });
  } catch {
    return null;
  }

  const pdfs = entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".pdf"))
    .map((e) => e.name);

  if (pdfs.length !== 1) return null;
  return path.join(publicDir, pdfs[0]);
}
