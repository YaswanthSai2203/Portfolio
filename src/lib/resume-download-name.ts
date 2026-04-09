/** Suggested filename for Content-Disposition (from your display name). */
export function resumeDownloadFilename(displayName: string): string {
  const slug = displayName
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\-]+/g, "")
    .replace(/^-+|-+$/g, "");
  const base = slug.length > 0 ? slug : "Resume";
  return `${base}-Resume.pdf`;
}
