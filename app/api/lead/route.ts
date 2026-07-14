import { NextResponse } from "next/server";

// Estimate-form submissions land here and get forwarded into the CRM (Pest AI,
// which runs on GoHighLevel) via an inbound-webhook URL. The URL is a secret,
// so it stays in GHL_WEBHOOK_URL server-side and never touches the browser.
// If it isn't set (or GHL is down), we tell the client to fall back to email
// so a lead is never dropped on the floor.

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  zip?: string;
  city?: string;
  service?: string;
  message?: string;
  photoUrls?: string[]; // already uploaded to Blob by the browser
  company?: string; // honeypot — real people leave this blank
};

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // a filled honeypot means a bot — swallow it so it never reaches the CRM
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const webhook = process.env.GHL_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, fallback: true });
  }

  const name = (body.name ?? "").trim();
  const [firstName, ...rest] = name.split(/\s+/);
  const photoUrls = (body.photoUrls ?? []).filter(Boolean);

  // fold the photo links into the message so they show up in the existing CRM
  // note without any extra GoHighLevel setup
  let message = body.message ?? "";
  if (photoUrls.length) {
    const list = photoUrls.map((u) => `- ${u}`).join("\n");
    message = `${message ? `${message}\n\n` : ""}Photos attached:\n${list}`;
  }

  // keys named to line up with GoHighLevel's standard contact fields so the
  // workflow mapping is one-to-one
  const payload = {
    firstName: firstName || name || "Website lead",
    lastName: rest.join(" "),
    name,
    email: body.email ?? "",
    phone: body.phone ?? "",
    address1: body.address ?? "",
    city: body.city ?? "",
    state: "NV",
    postalCode: body.zip ?? "",
    source: "Website estimate form",
    service: body.service ?? "",
    message,
    photos: photoUrls.join("\n"),
    tags: ["website-lead"],
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return NextResponse.json({ ok: false, fallback: true });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, fallback: true });
  }
}
