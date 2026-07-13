export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  invert = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={`js-reveal ${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      <span
        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${
          invert ? "text-white/90" : "text-mint-600"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${invert ? "bg-white" : "bg-mint"}`}
        />
        {eyebrow}
      </span>
      <h2
        className={`mt-4 font-display text-3xl font-bold tracking-tight sm:text-[2.5rem] sm:leading-[1.1] ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            invert ? "text-white/80" : "text-slate"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
