"use client";

import { useEffect, useRef } from "react";

const CELL_PX = 30; // keep in sync with --reel-cell in globals.css
const REEL_DUR_MS = 900; // keep in sync with --reel-dur
const STAGGER_MS = 60; // keep in sync with --reel-stagger

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

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const target = Number(digit);
    const delay = index * STAGGER_MS;

    if (prefersReducedMotion()) {
      strip.style.transition = "none";
      strip.style.transform = `translateY(-${target * CELL_PX}px)`;
      return;
    }

    // Initial paint already shows the strip at rest (translateY(0)) via
    // the default (no inline transform) state — this effect runs after
    // that paint, so setting the transition + target here animates from
    // the already-rendered state. Transform-only: no filter/blur, so this
    // is pure compositor work — cheap even with several reels animating
    // in the same carousel.
    strip.style.transition = `transform ${REEL_DUR_MS}ms var(--reel-ease) ${delay}ms`;
    strip.style.transform = `translateY(-${(spins * 10 + target) * CELL_PX}px)`;
  }, [digit, triggerKey, spins, index]);

  const cells: string[] = [];
  for (let loop = 0; loop <= spins; loop++) {
    for (let d = 0; d <= 9; d++) {
      cells.push(`${loop}-${d}`);
    }
  }

  return (
    <span className="t-reel-col" style={{ width: "0.6em" }}>
      <div ref={stripRef} className="t-reel-strip">
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
 * Transform-only animation (no filter/blur) — cheapest possible, runs
 * entirely on the compositor thread even with several reels animating
 * at once.
 *
 * Pass a new `triggerKey` to re-spin (e.g. when the value it's revealing
 * changes from an original price to a discounted one).
 */
export function PriceReel({
  value,
  spins = 0,
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
