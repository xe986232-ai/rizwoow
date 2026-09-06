"use client";

import { useEffect, useRef, useState } from "react";
import { PriceReel, reelSettleDuration } from "./price-reel";

const STRIKE_DELAY_MS = 250; // pause after the original price lands, before it gets struck through
const STRIKE_DURATION_MS = 320; // must match .t-price-strike::after transition
const DISCOUNT_DELAY_MS = 150; // pause after the strike finishes, before the discount reel spins in

/**
 * Price display for a product card.
 *
 * No discount: the price just spins in once.
 * With discount: the original price spins in first, gets struck through,
 * then the discount price spins in next to it.
 *
 * The whole sequence only starts once the tag actually scrolls into view
 * (IntersectionObserver) — in a horizontal carousel most cards start
 * off-screen, so this keeps every card's reel from firing at once on
 * page load. Before that, the price renders as plain static text (no
 * extra reel DOM, no layout shift).
 */
export function PriceTag({
  price,
  originalPrice,
}: {
  price: string;
  originalPrice?: string;
}) {
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );
  const [struck, setStruck] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (visible) return;
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];

    if (!visible || !originalPrice) return;

    const originalDigits = originalPrice.replace(/\D/g, "").length;
    const strikeAt = reelSettleDuration(originalDigits) + STRIKE_DELAY_MS;
    const discountAt = strikeAt + STRIKE_DURATION_MS + DISCOUNT_DELAY_MS;

    timers.current.push(window.setTimeout(() => setStruck(true), strikeAt));
    timers.current.push(
      window.setTimeout(() => setShowDiscount(true), discountAt)
    );

    return () => {
      timers.current.forEach((t) => clearTimeout(t));
    };
  }, [visible, originalPrice]);

  if (!originalPrice) {
    return (
      <span ref={wrapRef} className="text-sm font-medium text-foreground">
        {visible ? <PriceReel value={price} /> : price}
      </span>
    );
  }

  return (
    <span ref={wrapRef} className="flex flex-row flex-wrap items-center gap-2">
      <span
        className={`t-price-strike text-xs text-muted ${struck ? "is-struck" : ""}`}
      >
        {visible ? <PriceReel value={originalPrice} /> : originalPrice}
      </span>
      <span
        className="text-sm font-medium text-foreground transition-opacity duration-200"
        style={{ opacity: showDiscount ? 1 : 0 }}
      >
        {showDiscount && (
          <PriceReel value={price} triggerKey={`${price}-discount`} />
        )}
      </span>
    </span>
  );
}
