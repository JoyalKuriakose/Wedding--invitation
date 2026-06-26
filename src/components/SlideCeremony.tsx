import { motion } from "framer-motion";

export function SlideCeremony() {
  return (
    <div
      className="clear-slide flex w-[min(86vw,520px)] flex-col items-center justify-center text-center"
      style={{ transform: "translateY(-3%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-32 flex flex-col items-center gap-4"
      >
        <p className="wedding-caps" style={{
           color: "#3d2f12",
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.8rem, 2vw, 0.8rem)",
            lineHeight: "1",
            maxWidth: "300px",
            fontWeight: 700,
            textShadow: "0 1px 2px rgba(255,250,235,0.45)",
            }}>
          With Joyful Hearts
        </p>
        <p
          className="italic"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1.2rem, 2vw, 1.2rem)",
            color: "#3d2f12",
            lineHeight: "1.85",
            maxWidth: "300px",
            textShadow: "0 1px 2px rgba(255,250,235,0.45)",
          }}
        >
          We invite you to witness
          <br />
          the sacred union of
        </p>
      </motion.div>

      {/* Groom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="flex flex-col items-center gap-1 mt-5"
      >
        <p
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(2.5rem, 6.5vw, 3.8rem)",
            color: "#b8860b",
            lineHeight: "1.1",
            textShadow: "0 1px 3px rgba(255,250,235,0.45)",
          }}
        >
          Jikku Kuriakose
        </p>
        <p
          className="wedding-caps mt-1"
          style={{
            fontSize: "clamp(0.8rem, 1.4vw, 0.72rem)",
            fontWeight: 700,
            color: "#5a4520",
          }}
        >
        &nbsp;  S/o Mr. C. Kuriakose & Mrs. Jincy Kuriakose <br />
        &nbsp;  Chirackal
        </p>
      </motion.div>

      {/* AND */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex items-center gap-3 my-3"
      >
        <span className="h-px w-10" style={{ background: "rgba(122,90,36,0.5)" }} />
        <span
          className="italic"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 2.8vw, 1.8rem)",
            color: "#b8860b",
            letterSpacing: "0.15em",
          }}
        >
          &
        </span>
        <span className="h-px w-10" style={{ background: "rgba(122,90,36,0.5)" }} />
      </motion.div>

      {/* Bride */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex flex-col items-center gap-1"
      >
        <p
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(2.5rem, 6.5vw, 3.8rem)",
            color: "#b8860b",
            lineHeight: "1.1",
            textShadow: "0 1px 3px rgba(255,250,235,0.45)",
          }}
        >
          Lena Joseph
        </p>
        <p
          className="wedding-caps mt-1"
          style={{
            fontSize: "clamp(0.8rem, 1.4vw, 0.72rem)",
            fontWeight: 700,
            color: "#5a4520",
          }}
        >
        &nbsp;&nbsp; D/o Mr. Joseph K K & Mrs. Binu Joseph <br />
          Keechery Chamakkattu
        </p>
      </motion.div>
    </div>
  );
}
