import { useEffect, useState } from "react";

// Single shared fetch of /api/reviews across the page (hero chip, stats, testimonials).
// Module-level memo so it runs once regardless of how many components use it.
let cache = null;
let inflight = null;

function load() {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetch("/api/reviews")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        cache = d && d.ok && Array.isArray(d.reviews) ? d : { ok: false };
        return cache;
      })
      .catch(() => {
        cache = { ok: false };
        return cache;
      });
  }
  return inflight;
}

// Correct plural form of "review" for the count (en + ru).
export function reviewWord(n, lang) {
  if (lang === "ru") {
    const d = n % 10;
    const dd = n % 100;
    if (d === 1 && dd !== 11) return "отзыв";
    if (d >= 2 && d <= 4 && (dd < 10 || dd >= 20)) return "отзыва";
    return "отзывов";
  }
  return n === 1 ? "review" : "reviews";
}

// Returns null until loaded, then { ok, rating, total, url, reviews } or { ok:false }.
export function useGoogleReviews() {
  const [data, setData] = useState(cache);
  useEffect(() => {
    let alive = true;
    load().then((d) => alive && setData(d));
    return () => {
      alive = false;
    };
  }, []);
  return data;
}
