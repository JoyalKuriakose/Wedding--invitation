import { motion } from "framer-motion";

export function SlideInvite() {
  return (
    <div className="clear-slide flex h-full w-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex w-[min(82vw,440px)] flex-col items-center text-center"
        style={{ transform: "translateY(-6%)" }}
      >
       

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 1 }}
          className="italic leading-[1.85]"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "clamp(1.2rem, 3.4vw, 1.55rem)",
            color: "#3d2f12",
            textShadow: "0 1px 2px rgba(255,250,235,0.5)",
          }}
        >
          “ഇതു യഹോവയാൽ സംഭവിച്ചു;
          <br />
          നമ്മുടെ ദൃഷ്ടിയിൽ
          <br />
          ആശ്ചര്യം ആയിരിക്കുന്നു.”
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="my-6 flex items-center gap-3 w-full justify-center"
        >
          <span className="h-px w-14" style={{ background: "rgba(122,90,36,0.6)" }} />
          <span className="ornament-dot" style={{ background: "#7a5a24" }} />
          <span className="h-px w-14" style={{ background: "rgba(122,90,36,0.6)" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="wedding-caps"
          style={{
            fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
            fontWeight: 550,
            letterSpacing: "0.12em",
            color: "#3d2f12",
            
          }}
        >
          സങ്കീർത്തനങ്ങൾ · 118 : 23
        </motion.p>
      </motion.div>
    </div>
  );
}
