import { NextResponse } from "next/server";

import { profile } from "@/lib/data";

const MAX_NAME = 120;
const MAX_MESSAGE = 8000;
const MIN_MESSAGE = 10;

type Body = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > MAX_NAME) {
    return NextResponse.json({ ok: false, error: "Please enter a valid name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length < MIN_MESSAGE || message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { ok: false, error: `Message must be between ${MIN_MESSAGE} and ${MAX_MESSAGE} characters.` },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || profile.email;
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  const payload = {
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
  };

  if (resendKey && from) {
    const subject = `Portfolio contact: ${name}`;
    const text = `From: ${name} <${email}>\n\n${message}`;
    const html = `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", res.status, errText);
      return NextResponse.json(
        { ok: false, error: "Could not send email. Try again or use the mail link below." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, via: "email" });
  }

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("Webhook error:", res.status, await res.text());
        return NextResponse.json(
          { ok: false, error: "Could not deliver message. Try again or email directly." },
          { status: 502 },
        );
      }
      return NextResponse.json({ ok: true, via: "webhook" });
    } catch (e) {
      console.error("Webhook fetch failed:", e);
      return NextResponse.json(
        { ok: false, error: "Could not deliver message. Try again or email directly." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json(
    {
      ok: false,
      code: "NOT_CONFIGURED",
      error:
        "Contact form is not configured yet. Use mailto below or set RESEND_API_KEY + CONTACT_FROM_EMAIL in the server environment.",
    },
    { status: 503 },
  );
}
