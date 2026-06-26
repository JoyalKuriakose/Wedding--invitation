import { motion } from "framer-motion";
import { MapPin, CalendarPlus } from "lucide-react";
import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-24T11:00:00+05:30").getTime();

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return { days: null, hours: null, minutes: null, seconds: null };
  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}



export function SlideRegistry() {
  const { days, hours, minutes, seconds } = useCountdown();
  const fmt = (v: number | null) => (v === null ? "--" : String(v).padStart(2, "0"));


  const openMaps = () => {
    // Destination is fixed to St George Jacobite Syrian Church, Ponpally.
    // No origin is set, so Google Maps automatically uses the visitor's
    // current device location as the starting point (and lets them change
    // it manually inside Maps if they want to start from somewhere else).
    const destinationLat = 9.602942;
    const destinationLng = 76.549257;
    const destinationPlaceId = "ChIJGfmk1H0rBjsRv1nYAF3fVzY";
    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${destinationLat},${destinationLng}` +
      `&destination_place_id=${destinationPlaceId}` +
      `&travelmode=driving`;
    window.open(url, "_blank");
  };

  const addToGoogleCalendar = () => {
    const url =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=Jikku+%26+Lena+Wedding+Ceremony" +
      "&dates=20260824T053000Z/20260824T083000Z" +
      "&details=Wedding+Ceremony" +
      "&location=St+George+Jacobite+Syrian+Church+Ponpally,+Kottayam,+Kerala";
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-center gap-7 w-[min(88vw,440px)] text-center">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-3"
      >
        <span
          className="h-px w-20"
          style={{ background: "linear-gradient(to right, transparent, #ffd700, transparent)" }}
        />
        <p
          className="wedding-caps"
          style={{
            fontSize: "clamp(0.7rem, 1.8vw, 0.78rem)",
            color: "#ffd700",
            letterSpacing: "0.45em",
            fontWeight: 600,
            textShadow: "0 2px 8px rgba(0,0,0,0.7)",
          }}
        >
          The Ceremony
        </p>
        <span
          className="h-px w-20"
          style={{ background: "linear-gradient(to right, transparent, #ffd700, transparent)" }}
        />
      </motion.div>

      {/* Date — editorial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex items-center justify-center gap-5"
      >
        {/* Day */}
        <div className="flex flex-col items-center">
          <span
            className="wedding-caps"
            style={{ fontSize: "0.7rem", color: "#ffffff", letterSpacing: "0.3em", textShadow: "0 2px 6px rgba(0,0,0,0.85)" }}
          >
            Monday
          </span>
          <span
            style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(2.4rem, 7vw, 3.2rem)",
              color: "#ffffff",
              lineHeight: 1,
              textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 0 18px rgba(255,215,0,0.25)",
            }}
          >
            24
          </span>
          <span
            className="wedding-caps mt-1"
            style={{ fontSize: "0.7rem", color: "#ffffff", letterSpacing: "0.3em", textShadow: "0 2px 6px rgba(0,0,0,0.85)" }}
          >
            August 2026
          </span>
        </div>

        {/* Divider */}
        <div className="flex flex-col items-center gap-2">
          <span className="h-12 w-px" style={{ background: "linear-gradient(to bottom, transparent, #ffd700, transparent)" }} />
          <span style={{ color: "#ffd700", fontSize: "0.55rem", letterSpacing: "0.2em" }}>◆</span>
          <span className="h-12 w-px" style={{ background: "linear-gradient(to bottom, transparent, #ffd700, transparent)" }} />
        </div>

        {/* Time */}
        <div className="flex flex-col items-center">
          <span
            className="wedding-caps"
            style={{ fontSize: "0.7rem", color: "#ffffff", letterSpacing: "0.3em", textShadow: "0 2px 6px rgba(0,0,0,0.85)" }}
          >
            At
          </span>
          <span
            style={{
              fontFamily: "var(--font-display, serif)",
              fontSize: "clamp(2.4rem, 7vw, 3.2rem)",
              color: "#ffffff",
              lineHeight: 1,
              textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 0 18px rgba(255,215,0,0.25)",
            }}
          >
            11:00
          </span>
          <span
            className="wedding-caps mt-1"
            style={{ fontSize: "0.7rem", color: "#ffffff", letterSpacing: "0.3em", textShadow: "0 2px 6px rgba(0,0,0,0.85)" }}
          >
            Morning
          </span>
        </div>
      </motion.div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="flex items-center justify-center gap-3"
        style={{ marginTop: "-0.25rem" }}
      >
        {[
          { label: "Days", value: days },
          { label: "Hrs", value: hours },
          { label: "Min", value: minutes },
          { label: "Sec", value: seconds },
        ].map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <span
              style={{
                fontFamily: "var(--font-display, serif)",
                fontSize: "clamp(1.4rem, 4.2vw, 1.9rem)",
                color: "#ffd700",
                lineHeight: 1,
                textShadow: "0 2px 10px rgba(0,0,0,0.7), 0 0 14px rgba(255,215,0,0.25)",
                minWidth: "2ch",
                textAlign: "center",
              }}
            >
              {fmt(u.value)}
            </span>
            <span
              className="wedding-caps mt-1"
              style={{
                fontSize: "0.55rem",
                color: "#f5e6c8",
                letterSpacing: "0.3em",
                textShadow: "0 2px 6px rgba(0,0,0,0.85)",
              }}
            >
              {u.label}
            </span>
          </div>
        ))}
      </motion.div>


      {/* Ornament */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.45, duration: 0.8 }}
        className="flex items-center gap-3"
      >
        <span className="h-px w-14" style={{ background: "linear-gradient(to right, transparent, rgba(255,215,0,0.7))" }} />
        <span style={{ color: "#ffd700", fontSize: "0.7rem" }}>❦</span>
        <span className="h-px w-14" style={{ background: "linear-gradient(to left, transparent, rgba(255,215,0,0.7))" }} />
      </motion.div>

      {/* Venue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.8 }}
        className="flex flex-col items-center gap-2"
      >
        <p
          className="wedding-caps"
          style={{ fontSize: "0.65rem", color: "#f5e6c8", letterSpacing: "0.4em", textShadow: "0 2px 6px rgba(0,0,0,0.85)" }}
        >
          At the Venue of
        </p>
        <p
          style={{
            fontFamily: "var(--font-display, serif)",
            fontSize: "clamp(1.35rem, 3.8vw, 1.7rem)",
            color: "#ffffff",
            fontWeight: 600,
            lineHeight: 1.3,
            textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 0 14px rgba(255,255,255,0.12)",
          }}
        >
          St George Jacobite
          <br />
          Syrian Church, Ponpally
        </p>
        <p
          className="italic"
          style={{
            fontFamily: "var(--font-body, serif)",
            fontSize: "0.9rem",
            color: "#f5e6c8",
            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            letterSpacing: "0.08em",
          }}
        >
          Kottayam, Kerala
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center mt-1"
      >
        <button
          onClick={openMaps}
          className="flex items-center gap-2 rounded-full px-6 py-2.5 text-xs uppercase tracking-[0.22em] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.18), rgba(0,0,0,0.45))",
            border: "1px solid rgba(255,215,0,0.6)",
            color: "#fff8e7",
            fontFamily: "var(--font-body, serif)",
            fontWeight: 600,
            boxShadow: "0 0 16px rgba(255,215,0,0.2), 0 4px 14px rgba(0,0,0,0.4)",
          }}
        >
          <MapPin size={14} style={{ color: "#ffd700" }} />
          Location
        </button>

        <button
          onClick={addToGoogleCalendar}
          className="flex items-center gap-2 rounded-full px-6 py-2.5 text-xs uppercase tracking-[0.22em] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.18), rgba(0,0,0,0.45))",
            border: "1px solid rgba(255,215,0,0.6)",
            color: "#fff8e7",
            fontFamily: "var(--font-body, serif)",
            fontWeight: 600,
            boxShadow: "0 0 16px rgba(255,215,0,0.2), 0 4px 14px rgba(0,0,0,0.4)",
          }}
        >
          <CalendarPlus size={14} style={{ color: "#ffd700" }} />
          Save the Date
        </button>
      </motion.div>
    </div>
  );
}
