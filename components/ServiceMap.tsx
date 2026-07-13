import { site } from "@/lib/site";

// Google Maps embed, no API key. Classic maps.google.com param form so the
// `z` zoom still works.
export default function ServiceMap({
  query,
  title,
  zoom = 12,
  className = "",
}: {
  // what to center on, defaults to the office address
  query?: string;
  title?: string;
  zoom?: number;
  className?: string;
}) {
  const q = encodeURIComponent(
    query ?? `${site.street}, ${site.city}, ${site.state} ${site.zip}`,
  );
  const src = `https://maps.google.com/maps?q=${q}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className={`overflow-hidden rounded-3xl border border-line shadow-soft ${className}`}
    >
      <iframe
        title={title ?? `${site.name} service area map`}
        src={src}
        className="block h-[360px] w-full sm:h-[440px]"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
