"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { openQuoteModal } from "./QuoteButton";
import { ServiceIcon, Arrow, Check, Clock } from "./Icons";
import { pests, services, plans } from "@/lib/site";

type Option = {
  label: string;
  scores: Record<string, number>;
  // follow-up shown when this option is picked
  followUp?: Question;
};
type Question = { q: string; options: Option[] };

const STORAGE_KEY = "peak:pest-finder";

// widow vs wolf vs everyday spider, the call that matters most
const spiderFollowUp: Question = {
  q: "Did you get a look at it?",
  options: [
    {
      label: "Glossy black with a red hourglass",
      scores: { "black-widows": 4 },
    },
    {
      label: "Big, hairy & fast on the ground",
      scores: { "wolf-spiders": 4 },
    },
    {
      label: "Messy, really strong webs down low",
      scores: { "black-widows": 2, spiders: 1 },
    },
    {
      label: "Webs up in corners & eaves",
      scores: { spiders: 3 },
    },
    { label: "Not really", scores: { spiders: 1 } },
  ],
};

const signsFollowUp: Question = {
  q: "What signs are you seeing?",
  options: [
    { label: "Droppings or gnaw marks", scores: { "mice-and-rats": 4 } },
    {
      label: "Scratching sounds in walls or ceiling",
      scores: { "mice-and-rats": 3 },
    },
    { label: "Chirping, especially at night", scores: { crickets: 4 } },
    {
      label: "Pepper-like specks in cabinets",
      scores: { cockroaches: 3 },
    },
    { label: "Fine sawdust near wood or trim", scores: { ants: 3 } },
  ],
};

// each answer adds points to pest slugs, top total wins. in-season pests
// get a +1 nudge when we score.
const QUESTIONS: Question[] = [
  {
    q: "Where are you seeing it?",
    options: [
      {
        label: "Kitchen or bathroom",
        scores: { ants: 2, cockroaches: 2, silverfish: 1, earwigs: 1 },
      },
      {
        label: "Garage, shed, or storage",
        scores: {
          "black-widows": 2,
          "wolf-spiders": 1,
          "mice-and-rats": 1,
          crickets: 1,
          scorpions: 1,
        },
      },
      {
        label: "Yard, patio, or eaves",
        scores: {
          "wasps-and-hornets": 2,
          spiders: 1,
          "box-elder-bugs": 1,
          scorpions: 1,
        },
      },
      {
        label: "In the walls or attic",
        scores: { "mice-and-rats": 3 },
      },
      { label: "Not sure / all over", scores: {} },
    ],
  },
  {
    q: "What does it look like?",
    options: [
      {
        label: "Small insects in a trail or cluster",
        scores: { ants: 3 },
      },
      {
        label: "Black & red bugs massed on a sunny wall",
        scores: { "box-elder-bugs": 4 },
      },
      {
        label: "A spider or webbing",
        scores: { spiders: 1 },
        followUp: spiderFollowUp,
      },
      {
        label: "Fast and scurrying at night",
        scores: { cockroaches: 2, crickets: 1, silverfish: 1, "mice-and-rats": 1 },
      },
      {
        label: "It flies and stings",
        scores: { "wasps-and-hornets": 3 },
      },
      {
        label: "Pincers or a curved tail",
        scores: { earwigs: 2, scorpions: 3 },
      },
      {
        label: "Haven't seen it, just signs",
        scores: {},
        followUp: signsFollowUp,
      },
      { label: "Not sure", scores: {} },
    ],
  },
  {
    q: "When do you notice it most?",
    options: [
      {
        label: "Warm, sunny days",
        scores: { ants: 1, "wasps-and-hornets": 1, "box-elder-bugs": 1 },
      },
      {
        label: "At night",
        scores: {
          cockroaches: 1,
          scorpions: 1,
          "mice-and-rats": 1,
          crickets: 1,
          "wolf-spiders": 1,
        },
      },
      {
        label: "Around damp spots or watering",
        scores: { earwigs: 2, silverfish: 2 },
      },
      { label: "All the time / not sure", scores: {} },
    ],
  },
];

// builds the question order for a set of answers, splicing in follow-ups
// after the option that triggers them. returns null if a saved answer no
// longer fits (e.g. stale sessionStorage after a content change).
function buildFlow(answers: number[]) {
  const seq: Question[] = [];
  const pending: Question[] = [...QUESTIONS];
  while (pending.length > 0) {
    const q = pending.shift()!;
    seq.push(q);
    const ai = answers[seq.length - 1];
    if (ai === undefined) {
      return { seq, done: false, total: seq.length + pending.length };
    }
    if (!q.options[ai]) return null;
    const fu = q.options[ai].followUp;
    if (fu) pending.unshift(fu);
  }
  if (answers.length > seq.length) return null;
  return { seq, done: true, total: seq.length };
}

export default function PestFinder() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [restored, setRestored] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);

  // restore progress after a user clicks into a field guide and comes back
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (
          Array.isArray(saved) &&
          saved.every((n) => Number.isInteger(n)) &&
          buildFlow(saved)
        ) {
          setAnswers(saved);
        }
      }
    } catch {
      // can't read storage, just start fresh
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // storage full/blocked, quiz still works without it
    }
  }, [answers, restored]);

  // move focus to the heading as steps swap, but not on the initial
  // restored-from-storage render (don't yank focus on load)
  useEffect(() => {
    if (interacted.current) headingRef.current?.focus();
  }, [answers.length]);

  // stale/invalid stored flow -> reset
  let effAnswers = answers;
  let flow = buildFlow(effAnswers);
  if (!flow) {
    effAnswers = [];
    flow = buildFlow(effAnswers)!;
  }
  const { seq, done, total } = flow;
  const step = effAnswers.length;

  const pick = (i: number) => {
    interacted.current = true;
    setAnswers((a) => [...a, i]);
  };
  const back = () => {
    interacted.current = true;
    setAnswers((a) => a.slice(0, -1));
  };
  const restart = () => {
    interacted.current = true;
    setAnswers([]);
  };

  let result: (typeof pests)[number] | null = null;
  let runnerUp: (typeof pests)[number] | null = null;
  let inSeason = false;
  if (done) {
    const totals: Record<string, number> = {};
    effAnswers.forEach((ai, qi) => {
      for (const [slug, pts] of Object.entries(seq[qi].options[ai].scores)) {
        totals[slug] = (totals[slug] ?? 0) + pts;
      }
    });
    // nudge: pests in season this month win ties
    const month = new Date().getMonth() + 1;
    for (const slug of Object.keys(totals)) {
      const pest = pests.find((p) => p.slug === slug);
      if (pest?.activeMonths.includes(month)) totals[slug] += 1;
    }
    const ranked = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    if (ranked[0]) result = pests.find((p) => p.slug === ranked[0][0]) ?? null;
    if (ranked[1]) runnerUp = pests.find((p) => p.slug === ranked[1][0]) ?? null;
    inSeason = result?.activeMonths.includes(month) ?? false;
  }

  const fix = result ? services.find((s) => s.slug === result.service) : null;
  const planFrom = Math.min(...plans.map((pl) => pl.price));
  const quotePrefill = result
    ? {
        service: fix?.title,
        message: `From the pest finder: sounds like ${result.name.toLowerCase()}.`,
      }
    : undefined;

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-widest text-mint-600">
          {done ? "Our best guess" : `Question ${step + 1} of ${total}`}
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-8 rounded-full transition ${
                i < step ? "bg-mint" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>

      {!done ? (
        <div key={step} className="form-step mt-6">
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-2xl font-bold text-ink outline-none"
          >
            {seq[step].q}
          </h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {seq[step].options.map((o, i) => (
              <button
                key={o.label}
                type="button"
                onClick={() => pick(i)}
                className="rounded-2xl border border-line bg-cream px-5 py-4 text-left text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-mint hover:bg-mint-050"
              >
                {o.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="mt-6 text-sm font-bold text-slate transition hover:text-ink"
            >
              &larr; Back
            </button>
          )}
        </div>
      ) : (
        <div className="form-step mt-6" aria-live="polite">
          {result ? (
            <>
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mint-050 text-mint-600">
                  <ServiceIcon name={result.icon} className="h-8 w-8" />
                </span>
                <div>
                  <h3
                    ref={headingRef}
                    tabIndex={-1}
                    className="font-display text-2xl font-bold text-ink outline-none"
                  >
                    Sounds like {result.name.toLowerCase()}
                  </h3>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-mint-600" />
                      Active: {result.season}
                    </span>
                    {inSeason && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-2.5 py-0.5 text-xs font-bold text-ink">
                        In season now
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Self-check against the real field-guide signs */}
              <div className="mt-5 rounded-2xl border border-line bg-cream p-5">
                <p className="text-sm font-bold text-ink">
                  Does this match what you&rsquo;re seeing?
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {result.signs.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-ink/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-600" />
                      {s}
                    </li>
                  ))}
                </ul>
                {runnerUp && (
                  <p className="mt-3 text-sm text-slate">
                    Not quite it? Could also be{" "}
                    <Link
                      href={`/pests/${runnerUp.slug}`}
                      className="font-bold text-mint-600 transition hover:text-ink"
                    >
                      {runnerUp.name.toLowerCase()}
                    </Link>
                    .
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openQuoteModal(quotePrefill)}
                  className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 text-sm font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white"
                >
                  Get it handled
                </button>
                <Link
                  href={`/pests/${result.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-mint hover:text-ink"
                >
                  Read the field guide
                  <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                {fix && (
                  <Link
                    href={`/services/${fix.slug}`}
                    className="text-sm font-bold text-mint-600 transition hover:text-ink"
                  >
                    The fix: {fix.title} · plans from ${planFrom}/mo
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              <h3
                ref={headingRef}
                tabIndex={-1}
                className="font-display text-2xl font-bold text-ink outline-none"
              >
                Hard to say from here
              </h3>
              <p className="mt-3 leading-relaxed text-slate">
                No clear match, but that&rsquo;s exactly what free inspections
                are for. Browse the library, or have us come take a look.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/pests"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-mint hover:text-ink"
                >
                  Browse all pests
                </Link>
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 text-sm font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white"
                >
                  Get a free inspection
                </button>
              </div>
            </>
          )}
          <button
            type="button"
            onClick={restart}
            className="mt-6 block text-sm font-bold text-slate transition hover:text-ink"
          >
            &#8635; Start over
          </button>
        </div>
      )}
    </div>
  );
}
