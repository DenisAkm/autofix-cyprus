import { useCallback, useRef, useState } from "react";

/**
 * Draggable before/after comparison slider.
 * Two stacked images; the "before" layer is clipped to the divider position.
 * Drag (mouse/touch), click, or use arrow keys to compare.
 */
export default function BeforeAfter({ before, after, alt = "", beforeLabel = "Before", afterLabel = "After", className = "" }) {
  const ref = useRef(null);
  const drag = useRef(false);
  const [pos, setPos] = useState(50);

  const move = useCallback((clientX) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative cursor-ew-resize select-none overflow-hidden ${className}`}
      style={{ aspectRatio: "474 / 440", touchAction: "none" }}
      role="slider"
      aria-label={alt || "Before and after comparison"}
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onPointerDown={(e) => {
        drag.current = true;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => drag.current && move(e.clientX)}
      onPointerUp={() => (drag.current = false)}
      onPointerCancel={() => (drag.current = false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
      }}
    >
      {/* AFTER — base layer (right side) */}
      <img src={after} alt={`${alt} — ${afterLabel}`} draggable="false" className="absolute inset-0 h-full w-full object-cover" />
      {/* BEFORE — clipped to the left of the divider */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={`${alt} — ${beforeLabel}`} draggable="false" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* labels */}
      <span className="spec pointer-events-none absolute left-3 top-3 rounded-md bg-ink-950/75 px-2.5 py-1 text-[0.66rem] text-white ring-1 ring-white/15 backdrop-blur">
        {beforeLabel}
      </span>
      <span className="spec pointer-events-none absolute right-3 top-3 rounded-md bg-brand-600 px-2.5 py-1 text-[0.66rem] text-white shadow-lg shadow-brand-950/40">
        {afterLabel}
      </span>

      {/* divider + handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-marigold-400" />
        <div className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-marigold-400 text-ink-950 shadow-lg ring-4 ring-white/70 transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 4l3 3-3 3M20 7H10M7 20l-3-3 3-3M4 17h10" />
          </svg>
        </div>
      </div>
    </div>
  );
}
