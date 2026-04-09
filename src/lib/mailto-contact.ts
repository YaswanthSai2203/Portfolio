const MAX_MAILTO_CHARS = 1800;

/** Build mailto: URL for portfolio contact when server email is not configured. */
export function buildPortfolioContactMailto(
  to: string,
  name: string,
  email: string,
  message: string,
): string {
  const subject = `Portfolio contact from ${name}`;
  let body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

  const prefix = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=`;
  const maxBodyEncoded = MAX_MAILTO_CHARS - prefix.length;
  let encoded = encodeURIComponent(body);
  if (encoded.length > maxBodyEncoded) {
    const approxRaw = Math.floor((body.length * maxBodyEncoded) / encoded.length) - 80;
    body =
      body.slice(0, Math.max(100, approxRaw)) +
      "\n\n[Message truncated — please send the rest in a follow-up.]";
    encoded = encodeURIComponent(body);
  }

  return prefix + encoded;
}
