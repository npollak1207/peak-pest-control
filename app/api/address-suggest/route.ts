import { NextRequest, NextResponse } from "next/server";

// bias results toward Reno / northern NV
const BIAS = { lat: 39.53, lon: -119.81 };

type Suggestion = { label: string };

// Google Places Autocomplete (New). Key stays server-side.
async function fromGoogle(q: string, key: string): Promise<Suggestion[]> {
  const res = await fetch(
    "https://places.googleapis.com/v1/places:autocomplete",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
      },
      body: JSON.stringify({
        input: q,
        includedRegionCodes: ["us"],
        locationBias: {
          circle: {
            center: { latitude: BIAS.lat, longitude: BIAS.lon },
            radius: 50000,
          },
        },
      }),
    },
  );
  if (!res.ok) throw new Error(`google ${res.status}`);
  const data = (await res.json()) as {
    suggestions?: { placePrediction?: { text?: { text?: string } } }[];
  };
  return (data.suggestions ?? [])
    .map((s) => s.placePrediction?.text?.text)
    .filter((t): t is string => Boolean(t))
    .map((label) => ({ label }));
}

// Keyless fallback (Photon/OSM). Lower quality but works with no API key.
async function fromPhoton(q: string): Promise<Suggestion[]> {
  const res = await fetch(
    `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&lat=${BIAS.lat}&lon=${BIAS.lon}&limit=6&lang=en`,
  );
  const data = (await res.json()) as {
    features?: { properties: Record<string, string> }[];
  };
  const seen = new Set<string>();
  return (data.features ?? [])
    .map((f) => f.properties)
    .filter((p) => p.countrycode === "US")
    .map((p) => {
      const line1 = [p.housenumber, p.street || p.name].filter(Boolean).join(" ");
      const line2 = [p.city || p.county, p.state].filter(Boolean).join(", ");
      return { label: [line1, line2, p.postcode].filter(Boolean).join(", ") };
    })
    .filter((s) => {
      if (!s.label || seen.has(s.label)) return false;
      seen.add(s.label);
      return true;
    });
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  if (q.length < 3) return NextResponse.json({ suggestions: [] });

  const key = process.env.GOOGLE_PLACES_API_KEY;
  try {
    const suggestions = key ? await fromGoogle(q, key) : await fromPhoton(q);
    return NextResponse.json({ suggestions });
  } catch {
    // bad key / billing off / quota, fall back to Photon
    try {
      return NextResponse.json({ suggestions: await fromPhoton(q) });
    } catch {
      return NextResponse.json({ suggestions: [] });
    }
  }
}
