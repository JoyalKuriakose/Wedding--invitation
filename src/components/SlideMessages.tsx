import { motion } from "framer-motion";

export function SlideMessages() {
  return (
    <div className="flex flex-col items-center justify-center gap-7 max-w-md text-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-3"
      >
        <p
          className="wedding-caps text-[0.7rem] text-wedding-ivory"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
        >
          A Note From Us
        </p>
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-wedding-champagne/70" />
          <span className="ornament-dot" />
          <span className="h-px w-10 bg-wedding-champagne/70" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="space-y-6"
      >
        <p
          className="italic"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1.1rem, 2.7vw, 1.35rem)",
            color: "#f5f0e6",
            lineHeight: "1.9",
            fontWeight: 400,
            textShadow: "0 2px 10px rgba(0,0,0,0.85)",
          }}
        >
          With immense joy in our hearts,
          <br />
          we warmly invite our beloved
          <br />
          family and dear friends to
          <br />
          celebrate this beautiful beginning.
        </p>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            color: "#ece2cf",
            letterSpacing: "0.08em",
            lineHeight: "1.8",
            textShadow: "0 2px 8px rgba(0,0,0,0.85)",
          }}
        >
          Your love &amp; blessings will make
          <br />
          our day truly meaningful.
        </p>

        <p
          className="wedding-name"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 3.2rem)",
            color: "#c9a96e",
          }}
        >
          Jikku &amp; Lena
        </p>
      </motion.div>
    </div>
  );
}
