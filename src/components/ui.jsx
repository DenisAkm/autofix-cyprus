import { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   Motion helpers
--------------------------------------------------------------------------- */
const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

/* Count-up: animates 0→target once the element scrolls into view */
export function useCountUp(target, { duration = 1700, decimals = 0 } = {}) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      setVal(target);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !ran.current) {
          ran.current = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
            setVal(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return [ref, decimals ? val.toFixed(decimals) : Math.round(val)];
}

/* Mouse-parallax 3D tilt (hover devices only) */
export function useTilt({ max = 8, scale = 1.02, perspective = 1000 } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !canHover()) return;
    el.style.transition = "transform .18s ease-out";
    let raf = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(${perspective}px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(${scale})`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = `perspective(${perspective}px) rotateY(0) rotateX(0) scale(1)`;
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [max, scale, perspective]);
  return ref;
}

/* Magnetic pull toward the cursor (hover devices only) */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !canHover()) return;
    el.style.transition = "transform .35s cubic-bezier(.16,1,.3,1)";
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const leave = () => {
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);
  return ref;
}

/* ---------------------------------------------------------------------------
   Scroll reveal — adds `.in` when the element enters the viewport.
   `variant`: up | scale | left | right | blur
--------------------------------------------------------------------------- */
export function Reveal({ children, as: Tag = "div", delay = 0, variant = "up", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-v={variant}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Small eyebrow / pill label */
export function Eyebrow({ children, dark = false }) {
  return (
    <span
      className={
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide " +
        (dark
          ? "bg-white/10 text-brand-100 ring-1 ring-white/15"
          : "bg-brand-50 text-brand-700 ring-1 ring-brand-100")
      }
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Icon set — inline SVG (lucide-style), no dependency
--------------------------------------------------------------------------- */
/* Multicolour Google "G" — for attributing live Google ratings/reviews */
export function GoogleG({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1c4.1-3.8 6.6-9.4 6.6-16.1z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.4l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.5C3 17.2 2.1 20.5 2.1 24s.9 6.8 2.4 9.9l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.1 29.9 2 24 2 15.4 2 8.1 6.9 4.5 14.1l7.3 5.7c1.7-5.2 6.5-9 12.2-9z" />
    </svg>
  );
}

const S = ({ children, className = "h-6 w-6", stroke = 2 }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const Icon = {
  phone: (p) => (
    <S {...p}>
      <path d="M13 5a5 5 0 0 1 4 4M13 1a9 9 0 0 1 8 8M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </S>
  ),
  whatsapp: ({ className = "h-6 w-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.2s-.7.9-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5s0-.4 0-.5L9 6.7c-.2-.5-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3A2.9 2.9 0 0 0 6.3 8.7c0 1.3.9 2.5 1 2.7s1.9 3 4.7 4.2c1.7.7 2.3.8 3.1.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4s-.2-.2-.5-.3Z" />
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.3 8.3 0 1 1 12 20.3Z" />
    </svg>
  ),
  shield: (p) => (
    <S {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </S>
  ),
  clock: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </S>
  ),
  gift: (p) => (
    <S {...p}>
      <path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8M2 8h20v4H2zM12 8v13M12 8S10.5 3 7.5 3 4 8 7 8M12 8s1.5-5 4.5-5S20 8 17 8" />
    </S>
  ),
  badge: (p) => (
    <S {...p}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </S>
  ),
  arrowRight: (p) => (
    <S {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </S>
  ),
  arrowUp: (p) => (
    <S {...p}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </S>
  ),
  menu: (p) => (
    <S {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </S>
  ),
  close: (p) => (
    <S {...p}>
      <path d="M18 6 6 18M6 6l12 12" />
    </S>
  ),
  chevron: (p) => (
    <S {...p}>
      <path d="m6 9 6 6 6-6" />
    </S>
  ),
  check: (p) => (
    <S {...p}>
      <path d="M20 6 9 17l-5-5" />
    </S>
  ),
  pin: (p) => (
    <S {...p}>
      <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </S>
  ),
  car: (p) => (
    <S {...p}>
      <path d="M5 16 3 11l1.6-4a2 2 0 0 1 1.9-1.3h11a2 2 0 0 1 1.9 1.3L21 11l-2 5M5 16h14M5 16v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2m8 0v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" />
      <path d="M7 11h10" />
    </S>
  ),
  wrench: (p) => (
    <S {...p}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </S>
  ),
  paint: (p) => (
    <S {...p}>
      <path d="M18.4 2.6a2 2 0 0 1 3 3L9 18l-4 1 1-4Z" />
      <path d="M15 5l4 4" />
    </S>
  ),
  file: (p) => (
    <S {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </S>
  ),
  truck: (p) => (
    <S {...p}>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </S>
  ),
  sparkle: (p) => (
    <S {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
    </S>
  ),
  star: ({ className = "h-5 w-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6 6.6.6-5 4.4 1.5 6.4L12 16.9 5.9 19.4l1.5-6.4-5-4.4 6.6-.6Z" />
    </svg>
  ),
  quote: ({ className = "h-8 w-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5V9a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5V9a2 2 0 0 0-2-2Z" />
    </svg>
  ),
  mail: (p) => (
    <S {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </S>
  ),
  instagram: (p) => (
    <S {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </S>
  ),
  facebook: ({ className = "h-5 w-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h2.5l.5-3H14V4.3c0-.9.3-1.5 1.6-1.5H17V.1A22 22 0 0 0 14.8 0C12.4 0 11 1.4 11 4v2H8.5v3H11v9h3Z" />
    </svg>
  ),
  upload: (p) => (
    <S {...p}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 9l5-5 5 5M12 4v12" />
    </S>
  ),
};
