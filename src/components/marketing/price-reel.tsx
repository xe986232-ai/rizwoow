"use client";

import { useEffect, useId, useRef } from "react";

const CELL_PX = 30; // keep in sync with --reel-cell in globals.css
const REEL_DUR_MS = 1400; // keep in sync with --reel-dur
const STAGGER_MS = 90; // keep in sync with --reel-stagger
const SPIN_BLUR_PX = 3; // keep in sync with --reel-spin-blur

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/** Total time (ms) for the last column of a reel with `count` columns to settle. */
export function reelSettleDuration(count: number) {
  return REEL_DUR_MS + Math.max(0, count - 1) * STAGGER_MS;
}

function ReelColumn({
  digit,
  index,
  spins,
  triggerKey,
}: {
  digit: string;
  index: number;
  spins: number;
  triggerKey: string | number;
}) {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const filterId = `t-reel-blur-${useId().replace(/:/g, "")}`;
  const blurRef = useRef<SVGFEGaussianBlurElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const blur = blurRef.current;
    if (!strip) return;

    const target = Number(digit);
    const reduced = prefersReducedMotion();
    const delay = index * STAGGER_MS;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (reduced) {
      strip.style.transition = "none";
      strip.style.transform = `translateY(-${target * CELL_PX}px)`;
      if (blur) blur.setAttribute("stdDeviation", "0 0");
      return;
    }

    // Reset instantly to the top of the strip, then force reflow so the
    // transition below actually starts from 0.
    strip.style.transition = "none";
    strip.style.transform = "translateY(0px)";
    if (blur) blur.setAttribute("stdDeviation", `0 ${SPIN_BLUR_PX}`);
    void strip.offsetHeight;

    strip.style.transition = `transform ${REEL_DUR_MS}ms var(--reel-ease) ${delay}ms`;
    strip.style.transform = `translateY(-${(spins * 10 + target) * CELL_PX}px)`;

    // Decay the directional blur across this column's own window
    // (its stagger delay + the reel duration), easing toward 0.
    const start = performance.now() + delay;
    const duration = REEL_DUR_MS;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      const value = SPIN_BLUR_PX * (1 - eased);
      if (blur) blur.setAttribute("stdDeviation", `0 ${value.toFixed(2)}`);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [digit, triggerKey, spins, index]);

  const cells = [];
  for (let loop = 0; loop <= spins; loop++) {
    for (let d = 0; d <= 9; d++) {
      cells.push(`${loop}-${d}`);
    }
  }

  return (
    <span className="t-reel-col" style={{ width: "0.6em" }}>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id={filterId}>
          <feGaussianBlur ref={blurRef} stdDeviation="0 0" />
        </filter>
      </svg>
      <div
        ref={stripRef}
        className="t-reel-strip"
        style={{ filter: `url(#${filterId})` }}
      >
        {cells.map((key) => (
          <span key={key} className="t-reel-digit">
            {key.split("-")[1]}
          </span>
        ))}
      </div>
    </span>
  );
}

/**
 * Spinning-reel number display. Non-digit characters (currency prefix,
 * thousand separators) render as static text; digits each get their own
 * reel column that spins in and lands on the target value.
 *
 * Pass a new `triggerKey` to re-spin (e.g. when the value it's revealing
 * changes from an original price to a discounted one).
 */
export function PriceReel({
  value,
  spins = 1,
  triggerKey = value,
  className,
}: {
  value: string;
  spins?: number;
  triggerKey?: string | number;
  className?: string;
}) {
  const chars = value.split("");
  const parts = chars.reduce<{ char: string; digitIndex: number | null }[]>(
    (acc, char) => {
      const digitsSoFar = acc.filter((p) => p.digitIndex !== null).length;
      acc.push({
        char,
        digitIndex: /\d/.test(char) ? digitsSoFar : null,
      });
      return acc;
    },
    []
  );

  return (
    <span className={`t-reel ${className ?? ""}`}>
      {parts.map(({ char, digitIndex }, i) => {
        if (digitIndex !== null) {
          return (
            <ReelColumn
              key={i}
              digit={char}
              index={digitIndex}
              spins={spins}
              triggerKey={triggerKey}
            />
          );
        }
        return (
          <span key={i} className="t-reel-digit" style={{ width: "0.35em" }}>
            {char}
          </span>
        );
      })}
    </span>
  );
}
