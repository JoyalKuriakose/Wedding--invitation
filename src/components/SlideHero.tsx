import { motion } from "framer-motion";
import { useEffect } from "react";
import { slideBackgrounds } from "@/config/backgrounds";

interface SlideHeroProps {
  onStart: () => void;
}

export function SlideHero({ onStart }: SlideHeroProps) {
  useEffect(() => {
    const preventScroll = (e: Event) => e.preventDefault();
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    // Store the handler on window so handleStart can remove the exact
    // same reference (cleanup below only runs if this component ever
    // unmounts, which it doesn't — it stays mounted as slide 1 forever).
    (window as any).__heroPreventScroll = preventScroll;

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  const handleStart = () => {
    const preventScroll = (window as any).__heroPreventScroll;
    document.body.style.overflow = "auto";
    if (preventScroll) {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      delete (window as any).__heroPreventScroll;
    }
    onStart();
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={slideBackgrounds.heroPoster}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={slideBackgrounds.heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/25 to-black/60" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-10 px-6 text-center">
       

<motion.button
  onClick={handleStart}
  initial={{ scale: 0.7, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0.55, type: "spring", stiffness: 160 }}
  whileTap={{ scale: 0.95 }}
  className="group relative flex h-48 w-48 items-center justify-center rounded-full overflow-visible"
  style={{
    background:
      "radial-gradient(circle at center)",
    border: "2px solid rgba(230,200,145,0.7)",
    backdropFilter: "blur(50px)",
  }}
>
  {/* Glow Ring */}
  <div
    className="absolute inset-0 rounded-full"
    style={{
      boxShadow: "0 0 40px rgba(214,185,120,0.35)",
    }}
  />

  {/* Animated Border */}
  <div className="absolute inset-0 rounded-full border border-[#d6b978]/30 animate-ping" />

  {/* JL Text */}
  <span
    className="shimmer-text transition-transform duration-300 group-hover:scale-110"
    style={{
      fontFamily: "var(--font-script)",
      fontSize: "4rem",
      lineHeight: "1.35",
      display: "inline-block",
      color: "#f4d28c",

      /* FIX CUTTING */
      paddingTop: "12px",
      paddingLeft: "8px",
    }}
  >
    JL
  </span>
</motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="wedding-caps text-[1rem] text-wedding-ivory">
            Tap to open
          </p>
        </motion.div>
      </div>
    </section>
  );
}
