// Cloudflare Worker: serves the static site (dist) and a tiny /api/reviews
// proxy that returns live Google reviews from the Places API.
//
// The API key is a Worker SECRET (env.GOOGLE_PLACES_API_KEY) and is never sent
// to the browser. Responses are cached at the edge (~6h) so Google is hit about
// once per cache window, not once per visitor → effectively free.

const CACHE_TTL = 21600; // 6h
// Drop review-selling / rating-boost spam that sometimes lands in fresh reviews.
const SPAM =
  /(5[-\s]?star reviews?|remove (negative|bad) reviews?|contact me (on|via|through)|buy reviews?|boost (your )?rating|increase (your )?rating)/i;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/reviews") {
      return handleReviews(request, env, ctx);
    }
    // Everything else → static assets (with SPA fallback from wrangler config)
    return env.ASSETS.fetch(request);
  },
};

async function handleReviews(request, env, ctx) {
  const cache = caches.default;
  const cacheKey = new Request(new URL("/api/reviews", request.url).toString());

  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const key = env.GOOGLE_PLACES_API_KEY;
  const placeId = env.GOOGLE_PLACE_ID;

  let body;
  if (!key || !placeId) {
    body = { ok: false, reason: "not_configured" };
  } else {
    try {
      const fields = "rating,user_ratings_total,reviews,url";
      const api =
        `https://maps.googleapis.com/maps/api/place/details/json` +
        `?place_id=${encodeURIComponent(placeId)}&fields=${fields}` +
        `&reviews_no_translations=true&key=${key}`;
      const res = await fetch(api, { cf: { cacheTtl: CACHE_TTL } });
      const data = await res.json();
      body = data.status === "OK" ? normalize(data.result) : { ok: false, reason: data.status };
    } catch {
      body = { ok: false, reason: "fetch_failed" };
    }
  }

  const resp = new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, max-age=${body.ok ? CACHE_TTL : 300}`,
    },
  });
  if (body.ok) ctx.waitUntil(cache.put(cacheKey, resp.clone()));
  return resp;
}

function normalize(result) {
  const reviews = (result.reviews || [])
    .filter((r) => r.text && r.text.trim().length > 8) // skip empty/near-empty
    .filter((r) => r.rating >= 4) // only positive
    .filter((r) => !SPAM.test(r.text)) // drop review-selling spam
    .sort((a, b) => b.rating - a.rating || (b.time || 0) - (a.time || 0))
    .slice(0, 6)
    .map((r) => ({
      author: r.author_name || "Google user",
      photo: r.profile_photo_url || null,
      rating: r.rating || 5,
      text: r.text.trim(),
      relative: r.relative_time_description || "",
    }));
  return {
    ok: true,
    rating: result.rating ?? null,
    total: result.user_ratings_total ?? null,
    url: result.url || null,
    reviews,
  };
}
