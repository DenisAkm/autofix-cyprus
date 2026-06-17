import { Eyebrow, Reveal } from "./ui.jsx";

export default function SectionHeader({ eyebrow, title, subtitle, dark = false, center = true }) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && (
        <Reveal className={center ? "flex justify-center" : ""}>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal
        as="h2"
        variant="blur"
        delay={60}
        className={`mt-4 text-3xl font-extrabold tracking-[-0.01em] sm:text-4xl ${dark ? "text-white" : "text-ink-900"}`}
      >
        {title}
      </Reveal>
      {subtitle && (
        <Reveal as="p" delay={120} className={`mt-4 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}
