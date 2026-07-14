"use client";

import { useMemo, useRef, useState } from "react";
import { site, services, serviceAreas } from "@/lib/site";
import { Check, Arrow, ServiceIcon } from "@/components/Icons";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import type { QuotePrefill } from "@/components/QuoteButton";

const TOTAL_STEPS = 3;
const MAX_PHOTOS = 6;

type Photo = { file: File; url: string };

export default function QuoteForm({ initial }: { initial?: QuotePrefill }) {
  const [step, setStep] = useState(0);
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState(false);
  const [service, setService] = useState(initial?.service ?? "");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [dragging, setDragging] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const incoming = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setPhotos((prev) => [...prev, ...incoming].slice(0, MAX_PHOTOS));
  }

  function removePhoto(i: number) {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[i].url);
      return prev.filter((_, idx) => idx !== i);
    });
  }

  // match the entered ZIP against our service-area data
  const zipMap = useMemo(() => {
    const m = new Map<string, string>();
    serviceAreas.forEach((a) => a.zips.forEach((z) => m.set(z, a.name)));
    return m;
  }, []);
  const matchedCity = zip.length === 5 ? zipMap.get(zip) ?? null : null;

  function goToStep(n: number) {
    setStep(n);
  }

  function handleZipSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setZipError(true);
      return;
    }
    setZipError(false);
    // a prefilled service (from the pest finder) skips the picker step
    goToStep(initial?.service ? 2 : 1);
  }

  function pickService(title: string) {
    setService(title);
    goToStep(2);
  }

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // grab the values before any await, the event target goes stale after
    const data = new FormData(e.currentTarget);
    const contact = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      address: String(data.get("address") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""), // honeypot
    };

    setSubmitting(true);

    // upload any photos straight to Blob storage first. if the store isn't set
    // up (or a file fails) we just carry on without those links.
    const photoUrls: string[] = [];
    const photoErrors: string[] = [];
    if (photos.length) {
      // load the Blob client only when there's actually a photo to send, so it
      // stays out of the initial bundle on every page
      const { upload } = await import("@vercel/blob/client");
      const results = await Promise.allSettled(
        photos.map((p) =>
          upload(p.file.name, p.file, {
            access: "public",
            handleUploadUrl: "/api/blob/upload",
          }),
        ),
      );
      for (const r of results) {
        if (r.status === "fulfilled") photoUrls.push(r.value.url);
        else
          photoErrors.push(
            r.reason instanceof Error ? r.reason.message : String(r.reason),
          );
      }
    }

    const lead = {
      ...contact,
      zip,
      city: matchedCity ?? "",
      service: service || "",
      photoUrls,
      photoError: photoErrors.join(" | "),
    };

    // hand the lead to the CRM; if that's not wired up (or fails) fall back to
    // an email draft so nothing is ever lost
    let delivered = false;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      delivered = res.ok && json.ok === true;
    } catch {
      delivered = false;
    }

    if (!delivered) {
      const body = [
        `Name: ${lead.name}`,
        `Phone: ${lead.phone}`,
        `Email: ${lead.email}`,
        `Address: ${lead.address}`,
        `ZIP: ${zip}${matchedCity ? ` (${matchedCity})` : ""}`,
        `Service: ${service || "Not specified"}`,
        `Message: ${lead.message}`,
        photoUrls.length ? `Photos:\n${photoUrls.map((u) => `- ${u}`).join("\n")}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "Free estimate request",
      )}&body=${encodeURIComponent(body)}`;
    }

    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setSubmitting(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mint-050">
          <Check className="h-8 w-8 text-mint-600" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold text-ink">
          Request received!
        </h3>
        <p className="mt-3 max-w-sm text-slate">
          We&rsquo;ve got your details and someone from Peak will reach out
          shortly about your free estimate. Need us sooner? Call{" "}
          <a href={site.phoneHref} className="font-bold text-mint-600">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-slate">
          <span>Step {step + 1} of {TOTAL_STEPS}</span>
          <span>{Math.round(((step + 1) / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-mint transition-[width] duration-500 ease-out"
            style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1, ZIP */}
      {step === 0 && (
        <form key="zip" onSubmit={handleZipSubmit} className="form-step">
          <h3 className="font-display text-xl font-bold text-ink">
            Let&rsquo;s check your area
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate">
            Enter your ZIP code to confirm same-day availability across Reno,
            Sparks, and northern Nevada.
          </p>

          <label
            htmlFor="zip"
            className="mb-1.5 mt-6 block text-sm font-semibold text-ink/80"
          >
            ZIP code <span className="text-mint-600">*</span>
          </label>
          <input
            id="zip"
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
              setZipError(false);
            }}
            placeholder="89502"
            className={`w-full rounded-xl border bg-cream px-4 py-3 text-lg tracking-widest text-ink outline-none transition focus:bg-white ${
              zipError ? "border-red-400 focus:border-red-400" : "border-line focus:border-mint"
            }`}
          />
          {zipError && (
            <p className="mt-1.5 text-sm text-red-500">
              Please enter a valid 5-digit ZIP code.
            </p>
          )}
          {!zipError && zip.length === 5 && (
            matchedCity ? (
              <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-mint-600">
                <Check className="h-4 w-4 shrink-0" />
                We serve {matchedCity}. Same-day service available.
              </p>
            ) : (
              <p className="mt-2 text-sm font-medium text-amber-600">
                We don&rsquo;t regularly service {zip} yet. Continue and
                we&rsquo;ll let you know right away if we can still help.
              </p>
            )
          )}

          <button
            type="submit"
            className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint px-7 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white"
          >
            Check availability
            <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>
          <p className="mt-3 text-center text-xs text-slate">
            Serving Reno, Sparks &amp; communities across northern Nevada.
          </p>
        </form>
      )}

      {/* Step 2, Service */}
      {step === 1 && (
        <div key="service" className="form-step">
          {matchedCity ? (
            <div className="flex items-center gap-2 rounded-xl bg-mint-050 px-4 py-3 text-sm font-semibold text-mint-600">
              <Check className="h-5 w-5 shrink-0" />
              Good news! We serve {matchedCity}. Same-day service available.
            </div>
          ) : (
            <div className="rounded-xl bg-cream px-4 py-3 text-sm font-medium text-slate">
              We&rsquo;re growing fast across northern Nevada. Tell us what you
              need and we&rsquo;ll confirm coverage right away.
            </div>
          )}

          <h3 className="mt-6 font-display text-xl font-bold text-ink">
            What can we help with?
          </h3>
          <p className="mt-1.5 text-sm text-slate">Pick the closest match.</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {services.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() => pickService(s.title)}
                className="group flex flex-col gap-2 rounded-2xl border border-line bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-mint hover:shadow-soft"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-050 text-mint-600 transition group-hover:bg-mint group-hover:text-ink">
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold leading-tight text-ink">
                  {s.title}
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => pickService("Other / Not sure")}
              className="col-span-2 rounded-2xl border border-dashed border-line bg-white px-4 py-3 text-sm font-semibold text-slate transition hover:border-mint hover:text-mint-600"
            >
              Something else / Not sure
            </button>
          </div>

          <button
            type="button"
            onClick={() => goToStep(0)}
            className="mt-5 text-sm font-semibold text-slate transition hover:text-ink"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 3, Contact */}
      {step === 2 && (
        <form key="contact" onSubmit={handleContactSubmit} className="form-step space-y-4">
          {/* honeypot: hidden from people, bots fill it and get dropped */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hidden"
          />
          <div>
            <h3 className="font-display text-xl font-bold text-ink">
              Where should we send your quote?
            </h3>
            <p className="mt-1.5 text-sm text-slate">
              {service ? `${service} · ` : ""}
              {matchedCity ?? "Northern Nevada"} · almost done.
            </p>
          </div>

          <Field name="name" label="Full name" placeholder="Jane Doe" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              name="phone"
              label="Phone"
              type="tel"
              placeholder="(775) 555-0123"
              required
            />
            <Field name="email" label="Email" type="email" placeholder="you@email.com" />
          </div>
          <AddressAutocomplete />

          {/* Photo upload */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink/80">
              Add photos <span className="text-slate">(optional)</span>
            </label>
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                addFiles(e.dataTransfer.files);
              }}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition ${
                dragging
                  ? "border-mint bg-mint-050"
                  : "border-line bg-cream hover:border-mint hover:bg-mint-050/50"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mint-050 text-mint-600">
                <UploadIcon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-ink">
                Tap to add photos or drag them here
              </span>
              <span className="text-xs text-slate">
                A photo of the pest or problem area helps us quote faster · up to{" "}
                {MAX_PHOTOS}
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />

            {photos.length > 0 && (
              <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {photos.map((p, i) => (
                  <li
                    key={p.url}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-line"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.url}
                      alt={`Upload ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      aria-label={`Remove photo ${i + 1}`}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        aria-hidden
                      >
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-semibold text-ink/80"
            >
              Anything else? <span className="text-slate">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              defaultValue={initial?.message}
              placeholder="Tell us what you're seeing and where…"
              className="w-full resize-none rounded-xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-slate/60 outline-none transition focus:border-mint focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint px-7 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Sending…" : "Get My Free Estimate"}
            {!submitting && (
              <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
            )}
          </button>
          <p className="text-center text-xs leading-relaxed text-slate">
            By submitting, you agree to our{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-mint-600 hover:underline"
            >
              Privacy Policy
            </a>{" "}
            and consent to be contacted by phone, text, or email about your
            request. Message and data rates may apply.
          </p>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="text-sm font-semibold text-slate transition hover:text-ink"
            >
              ← Back
            </button>
            <p className="text-xs text-slate">No spam, ever.</p>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold text-ink/80"
      >
        {label}
        {required && <span className="text-mint-600"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-slate/60 outline-none transition focus:border-mint focus:bg-white"
      />
    </div>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 16V4m0 0L7 9m5-5 5 5" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}
