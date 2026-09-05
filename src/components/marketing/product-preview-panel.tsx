"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  DownloadIcon,
  FlameIcon,
  HeartIcon,
  PauseIcon,
  PlayIcon,
  TileWaveformIcon,
} from "@/components/icons";
import type { Product } from "@/lib/products";

type Status = "idle" | "loading" | "playing";

/** Ngurusin audio preview + expose currentTime/duration-nya, biar
 * tombol play dan animasi kata sama-sama bisa baca posisi yang sama. */
function useAudioPreview(previewUrl?: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function toggle() {
    if (!previewUrl) return;

    if (status === "playing" || status === "loading") {
      audioRef.current?.pause();
      setStatus("idle");
      return;
    }

    if (!audioRef.current) {
      const audio = new Audio();
      audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
      audio.addEventListener("loadedmetadata", () => setDuration(audio.duration || 0));
      audio.addEventListener("ended", () => {
        setStatus("idle");
        setCurrentTime(0);
      });
      audioRef.current = audio;
    }

    const audio = audioRef.current;
    setStatus("loading");

    const handlePlaying = () => {
      setStatus("playing");
      audio.removeEventListener("playing", handlePlaying);
    };
    audio.addEventListener("playing", handlePlaying);

    audio.src = previewUrl;
    audio.currentTime = 0;
    setCurrentTime(0);
    audio.play().catch(() => {
      setStatus("idle");
      audio.removeEventListener("playing", handlePlaying);
    });
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return { status, currentTime, duration, toggle };
}

/** Deskripsi yang nyorotin satu kata di posisi "sekarang" doang —
 * begitu lewat, balik abu lagi. Progress 0..1 berdasarkan
 * currentTime / duration audio preview yang lagi diputer. */
function AnimatedDescription({ text, progress }: { text: string; progress: number }) {
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);

  // rentang [start, end) 0..1 tiap kata, dihitung sekali per teks —
  // gak ada mutasi state pas render, cuma dibaca pas map di bawah.
  const wordRanges = useMemo(() => {
    const totalChars = tokens.reduce(
      (sum, t) => (/^\s+$/.test(t) ? sum : sum + t.length),
      0
    );

    const charLength = (t: string) => (/^\s+$/.test(t) ? 0 : t.length);

    return tokens.map((token, i) => {
      if (token === "" || /^\s+$/.test(token)) return null;
      const charsBefore = tokens.slice(0, i).reduce((sum, t) => sum + charLength(t), 0);
      const start = totalChars > 0 ? charsBefore / totalChars : 0;
      const end = totalChars > 0 ? (charsBefore + token.length) / totalChars : 0;
      return { start, end };
    });
  }, [tokens]);

  return (
    <p className="whitespace-pre-line text-sm leading-loose text-muted">
      {tokens.map((token, i) => {
        const range = wordRanges[i];
        if (!range) {
          return <span key={i}>{token}</span>;
        }
        const isActive = progress >= range.start && progress < range.end;

        return (
          <span key={i} className="relative inline-block px-0.5 py-0.5">
            {isActive && (
              <motion.span
                layoutId="active-word-highlight"
                className="absolute inset-0 rounded-md bg-[#7c3aed]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span
              className="relative z-10 transition-colors duration-150 ease-out"
              style={{ color: isActive ? "#ffffff" : undefined }}
            >
              {token}
            </span>
          </span>
        );
      })}
    </p>
  );
}

export function ProductPreviewPanel({ product }: { product: Product }) {
  const { status, currentTime, duration, toggle } = useAudioPreview(product.previewUrl);
  const [expanded, setExpanded] = useState(false);
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <>
      <div className="flex min-h-[52px] items-center gap-2">
        <button
          type="button"
          aria-label={
            status === "playing" ? "Pause" : status === "loading" ? "Loading" : "Play"
          }
          onClick={toggle}
          className="flex h-[52px] w-[52px] shrink-0 touch-manipulation select-none items-center justify-center rounded-full bg-surface-2 text-white transition-all duration-200 ease-in-out active:scale-90"
        >
          {status === "loading" ? (
            <svg
              className="h-6 w-6 animate-spin"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="22"
                cy="22"
                r="19"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.25"
              />
              <path
                d="M41 22c0-10.493-8.507-19-19-19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : status === "playing" ? (
            <PauseIcon className="h-[52px] w-[52px]" />
          ) : (
            <PlayIcon className="h-[52px] w-[52px]" />
          )}
        </button>

        <button
          type="button"
          className="flex h-[52px] shrink-0 touch-manipulation select-none items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-medium text-white transition-all duration-200 ease-in-out hover:bg-accent-hover active:scale-95"
        >
          <DownloadIcon className="h-5 w-5" />
          Download
        </button>

        <button
          type="button"
          aria-label="Add to wishlist"
          className="flex h-[52px] w-[52px] shrink-0 touch-manipulation select-none items-center justify-center rounded-full bg-surface-2 text-white transition-all duration-200 ease-in-out active:scale-90"
        >
          <HeartIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-row flex-wrap gap-2">
        {product.formats.map((format) => (
          <span
            key={format}
            className="flex flex-row items-center gap-1 rounded-full border border-surface-2 px-3 py-1 text-xs text-muted"
          >
            <TileWaveformIcon className="h-4 w-4 text-white" />
            {format}
          </span>
        ))}
        {product.featured && (
          <span className="flex flex-row items-center gap-1 rounded-full border border-surface-2 px-3 py-1 text-xs text-muted">
            <FlameIcon className="h-4 w-4 text-white" />
            Featured
          </span>
        )}
      </div>

      <div className={expanded ? "" : "line-clamp-5"}>
        <AnimatedDescription text={product.description} progress={progress} />
      </div>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="mt-2 w-fit text-sm text-foreground underline underline-offset-4 transition hover:text-accent"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </>
  );
}
