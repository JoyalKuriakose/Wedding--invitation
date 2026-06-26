import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// If a submission fails (e.g. guest loses signal mid-tap), we keep it here
// so it isn't silently lost. We retry any pending ones on the next visit
// or the next successful submit.
const PENDING_KEY = "rsvp_pending_submissions";

type PendingRSVP = {
  name: string;
  attending: boolean;
  guest_count: number;
  message: string | null;
};

function readPending(): PendingRSVP[] {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writePending(items: PendingRSVP[]) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable (private mode etc.) — nothing more we can do client-side.
  }
}

async function insertWithRetry(row: PendingRSVP, attempts = 2): Promise<{ ok: boolean }> {
  for (let i = 0; i < attempts; i++) {
    const { error } = await supabase.from("rsvps").insert(row);
    if (!error) return { ok: true };
    // brief backoff before retrying once
    await new Promise((r) => setTimeout(r, 600));
  }
  return { ok: false };
}

// Best-effort flush of anything left over from a previous failed attempt.
async function flushPending() {
  const pending = readPending();
  if (pending.length === 0) return;
  const stillFailed: PendingRSVP[] = [];
  for (const row of pending) {
    const { ok } = await insertWithRetry(row, 1);
    if (!ok) stillFailed.push(row);
  }
  writePending(stillFailed);
}

export function SlideRSVP() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If a previous visit left a failed submission queued locally, try to
    // send it now — quietly, in the background, without blocking the form.
    flushPending();
  }, []);

  const submit = async () => {
    setError(null);

    const trimmed = name.trim();
    const wish = message.trim();

    if (!trimmed || attending === null) {
      setError("Please enter your name and select Yes or No.");
      return;
    }

    const row: PendingRSVP = {
      name: trimmed,
      attending,
      guest_count: attending ? guests : 0,
      message: wish || null,
    };

    setSubmitting(true);

    // Try to clear any earlier failed submissions first, then send this one.
    await flushPending();
    const { ok } = await insertWithRetry(row);

    setSubmitting(false);

    if (!ok) {
      // Never lose the response: keep it queued locally and retry
      // automatically next time the form loads or submits.
      const pending = readPending();
      writePending([...pending, row]);
      setError(
        "We couldn't reach the server, but your response has been saved on your device and will be sent automatically. You can also try again now."
      );
      return;
    }

    setSubmitted(true);
  };


  return (
    <div className="flex flex-col items-center gap-5 max-w-sm w-full px-4">

      {/* Heading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-xs tracking-[0.35em] uppercase font-serif font-bold"
        style={{
          color: "#ffffff",
          // textShadow: "0 2px 8px rgba(0,0,0,0.85)",
        }}
      >
        RSVP & Wishes
      </motion.p>

      {!submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full flex flex-col gap-3"
        >

          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            placeholder="Your name"
            className="rounded-lg px-4 py-3 font-serif text-sm focus:outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,215,0,0.25)",
              color: "#ffffff",
              backdropFilter: "blur(3px)",
            }}
          />

          {/* Accept / Decline */}
          <div className="flex gap-2">

            <button
              onClick={() => setAttending(true)}
              className="flex-1 px-4 py-3 rounded-lg text-xs font-serif tracking-wider uppercase transition-all"
              style={{
                background:
                  attending === true
                    ? "rgba(255,215,0,0.18)"
                    : "rgba(255,255,255,0.05)",
                border:
                  attending === true
                    ? "1px solid rgba(255,215,0,0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
              }}
            >
              Joyfully Accept
            </button>

            <button
              onClick={() => setAttending(false)}
              className="flex-1 px-4 py-3 rounded-lg text-xs font-serif tracking-wider uppercase transition-all"
              style={{
                background:
                  attending === false
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#ffffff",
              }}
            >
              Regretfully Decline
            </button>
          </div>

          {/* Guests */}
          {attending && (
            <div
              className="rounded-lg px-4 py-3 flex items-center justify-between"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,215,0,0.2)",
                backdropFilter: "blur(3px)",
              }}
            >
              <span
                className="font-serif text-xs"
                style={{ color: "#f5e6c8" }}
              >
                Number of guests
              </span>

              <div className="flex items-center gap-3">

                <button
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-7 h-7 rounded-full"
                  style={{
                    border: "1px solid rgba(255,215,0,0.4)",
                    color: "#ffd700",
                  }}
                >
                  −
                </button>

                <span
                  className="font-serif text-base w-4 text-center"
                  style={{ color: "#ffffff" }}
                >
                  {guests}
                </span>

                <button
                  onClick={() => setGuests((g) => Math.min(10, g + 1))}
                  className="w-7 h-7 rounded-full"
                  style={{
                    border: "1px solid rgba(255,215,0,0.4)",
                    color: "#ffd700",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Wishes */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Send your wishes…"
            className="rounded-lg px-4 py-3 font-serif text-sm resize-none focus:outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,215,0,0.25)",
              color: "#ffffff",
              // textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              backdropFilter: "blur(3px)",
            }}
          />

          {/* Error */}
          {error && (
            <p
              className="text-xs font-serif"
              style={{ color: "#ffb3b3" }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            onClick={submit}
            disabled={submitting}
            className="rounded-full px-6 py-3 font-serif text-sm tracking-[0.15em] uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{
              background: "rgba(255,215,0,0.18)",
              border: "1px solid rgba(255,215,0,0.4)",
              color: "#ffffff",
              backdropFilter: "blur(3px)",
            }}
          >
            {submitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <Heart size={14} style={{ color: "#ffd700" }} />
                Send RSVP
              </>
            )}
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-2xl px-8 py-9 flex flex-col items-center gap-3 w-full overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,215,0,0.14), rgba(0,0,0,0.55) 60%, rgba(255,215,0,0.10))",
            border: "1px solid rgba(255,215,0,0.45)",
            backdropFilter: "blur(8px)",
            boxShadow:
              "0 0 28px rgba(255,215,0,0.22), 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <span className="absolute top-3 left-3 text-[0.7rem]" style={{ color: "#ffd700", opacity: 0.7 }}>❦</span>
          <span className="absolute top-3 right-3 text-[0.7rem]" style={{ color: "#ffd700", opacity: 0.7 }}>❦</span>
          <span className="absolute bottom-3 left-3 text-[0.7rem]" style={{ color: "#ffd700", opacity: 0.7 }}>❦</span>
          <span className="absolute bottom-3 right-3 text-[0.7rem]" style={{ color: "#ffd700", opacity: 0.7 }}>❦</span>

          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 14 }}
            className="flex items-center justify-center rounded-full"
            style={{
              width: 85,
              height: 85,
              background: "radial-gradient(circle at 30% 30%, #fff2b0, #d4af37 60%, #8b6914)",
              boxShadow:
                "0 0 22px rgba(255,215,0,0.55), inset 0 -3px 8px rgba(0,0,0,0.35), inset 0 3px 6px rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-script, serif)",
                fontSize: "2rem",
                color: "#2a1a05",
                lineHeight: 1,
                marginTop: "4px",
                textShadow: "0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              JL
            </span>
          </motion.div>

          <div className="flex items-center gap-2 mt-2">
            <span className="h-px w-10" style={{ background: "linear-gradient(to right, transparent, #ffd700)" }} />
            <span style={{ color: "#ffd700", fontSize: "0.6rem" }}>◆</span>
            <span className="h-px w-10" style={{ background: "linear-gradient(to left, transparent, #ffd700)" }} />
          </div>

          <p
            style={{
              fontFamily: "var(--font-script, serif)",
              fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
              color: "#ffd700",
              lineHeight: 1.1,
              textShadow: "0 2px 10px rgba(0,0,0,0.7), 0 0 18px rgba(255,215,0,0.3)",
            }}
          >
            {attending ? "Thank You" : "With Gratitude"}
          </p>

          <p
            className="wedding-caps"
            style={{
              fontSize: "0.65rem",
              color: "#f5e6c8",
              letterSpacing: "0.4em",
              fontWeight: 600,
              textShadow: "0 2px 6px rgba(0,0,0,0.7)",
            }}
          >
            {attending ? "Your RSVP is Received" : "Your Response is Received"}
          </p>

          <p
            className="italic text-center mt-1"
            style={{
              fontFamily: "var(--font-body, serif)",
              fontSize: "0.85rem",
              color: "#fff8e7",
              lineHeight: 1.6,
              maxWidth: "260px",
              textShadow: "0 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            {attending
              ? "We are honoured by your presence and grateful for your wishes."
              : "You will be dearly missed on our special day. Thank you for your kind wishes."}
          </p>
        </motion.div>
      )}
    </div>
  );
}