import { useRef, useState } from "react";

/**
 * Background video that loops seamlessly. The source file is a boomerang
 * (forward + reversed) so end frame == start frame — a plain loop has no seam.
 * The video fades in over the poster once it starts playing; reduced-motion
 * users get the static poster only.
 */
export default function VideoLoop({ src, poster, mirror = false, className = "" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      {/* poster behind — instant paint + reduced-motion fallback */}
      <img src={poster} alt="" className="absolute inset-0 h-full w-full scale-105 object-cover" />
      {/* looping video fades in from the poster */}
      <video
        ref={ref}
        className={`absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-1000 ease-out motion-reduce:hidden ${
          show ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onPlaying={() => setShow(true)}
        onCanPlay={(e) => e.currentTarget.play?.().catch(() => {})}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
