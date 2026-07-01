import { Eyebrow, Reveal } from "./ui.jsx";

export default function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <Reveal className={center ? "flex justify-center" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal
        as="h2"
        variant="blur"
        delay={60}
        className="mt-5 font-serif text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.01em] text-white sm:text-[2.9rem]"
      >
        {title}
      </Reveal>
      {subtitle && (
        <Reveal as="p" delay={120} className="mt-5 text-lg leading-relaxed text-slate-300">
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}
