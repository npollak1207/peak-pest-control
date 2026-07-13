import { site } from "@/lib/site";

export type Rating = { value: string; count: number };

// Live Google rating, pulled from the Places API (New). Cached for a day via
// Next's fetch cache, so the site refreshes on its own without a rebuild. Falls
// back to the hardcoded site.rating whenever the API key/Place ID is missing or
// the request fails, so the UI (and rich-results schema) never breaks.
export async function getRating(): Promise<Rating> {
  const fallback: Rating = site.rating;
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = site.googlePlaceId;
  if (!key || !placeId) return fallback;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount`,
      {
        headers: { "X-Goog-Api-Key": key },
        // Refresh at most once a day (well inside the free tier and Google's
        // caching limits for Places data).
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return fallback;

    const data: { rating?: number; userRatingCount?: number } = await res.json();
    if (
      typeof data.rating !== "number" ||
      typeof data.userRatingCount !== "number"
    ) {
      return fallback;
    }

    return {
      value: data.rating.toFixed(1),
      count: data.userRatingCount,
    };
  } catch {
    return fallback;
  }
}
