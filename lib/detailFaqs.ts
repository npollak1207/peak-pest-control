import { faqs, site, type Pest, type ServiceItem } from "./site";

// FAQ lists for the detail pages, built off the data in lib/site.ts plus a
// few evergreen answers.

const lcFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

// per-pest "when are they active" answers. kept these manual so year-round
// pests and off-season ones read right instead of one seasonal template.
const activityBySlug: Record<string, string> = {
  ants: "Ants are most active from spring through early fall around Reno and Sparks, marching indoors for food and water as the heat sets in. A warm stretch can push that window wider, which is why year-round prevention keeps the trails from ever starting.",
  spiders:
    "Spiders peak in late summer and into fall around Reno and Sparks, when cooling nights push them, and the insects they hunt, toward your walls and eaves. You'll spot a few year-round, but fall is when activity really climbs.",
  "black-widows":
    "Black widows are most active in the warm months around Reno and Sparks, but they hide year-round in garages, woodpiles, meter boxes, and other quiet, sheltered spots. Any sighting is worth a closer look.",
  cockroaches:
    "Cockroaches stay active year-round in the Reno-Sparks area because they live indoors where it's warm, so there really isn't an off-season. If you're seeing them, they've settled in and it's time for an inspection.",
  "mice-and-rats":
    "Mice and rats push indoors hardest in fall and winter as the high desert cools, though they'll move in any time they find food and warmth. Scratching in the walls or fresh droppings means it's time for an inspection.",
  "wasps-and-hornets":
    "Wasps and hornets build and grow their nests from late spring through fall around Reno and Sparks, with activity peaking in the heat of late summer, when nests get largest and most defensive.",
  earwigs:
    "Earwigs are most active in spring and summer around Reno and Sparks, chasing moisture into bathrooms, kitchens, and basements. Dry spells outdoors often drive them inside.",
  silverfish:
    "Silverfish are active year-round indoors around Reno and Sparks, favoring humid spots like bathrooms, laundry rooms, and storage boxes. Because they live inside, they don't follow a season.",
  crickets:
    "Crickets surge in late summer and into fall around Reno and Sparks, pushing into garages, basements, and crawl spaces as the nights cool. That fall push is when most homeowners start noticing them.",
  scorpions:
    "Scorpions are most active in the warm months around Reno and Sparks, hunting at night and sheltering in cool, dark places by day. They can turn up indoors any time they find a way in.",
  "box-elder-bugs":
    "Box elder bugs cluster on warm, sunny walls in fall, and on warm winter days, around Reno and Sparks as they look for a place to overwinter. A warm spell can bring them out even in the colder months.",
  "wolf-spiders":
    "Wolf spiders are most active in late summer and into fall around Reno and Sparks, wandering indoors as it cools rather than spinning webs. They're ground hunters, so you'll usually spot them along floors and walls.",
};

export function pestFaqs(p: Pest): { q: string; a: string }[] {
  const n = p.name.toLowerCase();
  const isRodent = p.service === "rodent-control";
  const method = isRodent
    ? "Every visit focuses on trapping, exclusion, and sealing entry points, not blanket spraying."
    : "We use EPA-registered products, applied precisely per label.";
  return [
    {
      q: `When are ${n} most active around Reno and Sparks?`,
      a:
        activityBySlug[p.slug] ??
        `${p.name} are most active in ${lcFirst(
          p.season
        )} around Reno and Sparks, and our high-desert temperature swings can stretch that window. If you're seeing activity well outside it, they've likely settled in, and it's worth a free inspection.`,
    },
    {
      q: `Are ${n} dangerous?`,
      a: p.risks,
    },
    {
      q: `How do you get rid of ${n}?`,
      a: `We follow a straightforward approach: ${p.treatment
        .map(lcFirst)
        .join("; ")}. ${method}`,
    },
    {
      q: "What products do you use around kids and pets?",
      a: faqs[0].a,
    },
    {
      q: `What if the ${n} come back?`,
      a: faqs[3].a,
    },
  ];
}

export function serviceFaqs(s: ServiceItem): { q: string; a: string }[] {
  const t = s.title.toLowerCase();
  const isWeed = s.slug === "weed-control";
  const subject = isWeed ? "weeds" : "pests";
  return [
    {
      q: `What does ${t} include?`,
      a: `Every visit covers: ${s.includes.map(lcFirst).join("; ")}.`,
    },
    {
      q: `Is ${t} right for my property?`,
      a: `It's the right fit for: ${s.goodFor
        .map(lcFirst)
        .join("; ")}. Not sure? Call ${site.phone} and we'll give you an honest answer, even if that answer is "you don't need us."`,
    },
    {
      q: "Do I need a recurring plan, or can I get a one-time visit?",
      a: "Either. Recurring plans keep a protective barrier up year-round and include free re-treats between visits, but if you just want the problem in front of you handled, we do one-time treatments with no contract and no obligation.",
    },
    {
      q: "How fast can you come out?",
      a: faqs[1].a,
    },
    {
      q: `What if the ${subject} come back after treatment?`,
      a: isWeed
        ? "If weeds break through between your scheduled visits, so do we. We'll re-treat the affected areas free of charge, no trip fees, no arguing, no extra invoice."
        : faqs[3].a,
    },
  ];
}
