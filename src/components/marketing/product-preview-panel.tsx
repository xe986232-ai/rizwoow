"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import localFont from "next/font/local";
import { getLenis } from "@/components/layout/smooth-scroll";
import {
  DownloadIcon,
  FlameIcon,
  HeartIcon,
  PauseIcon,
  PlayIcon,
  TileWaveformIcon,
} from "@/components/icons";
import type { Product, WordTiming } from "@/lib/products";

// Custom typeface used only for the animated word-by-word lyric preview.
const lyricFont = localFont({
  src: "../../fonts/SpotifyMix-Black.ttf",
  weight: "900",
  style: "normal",
  display: "swap",
});

// Lenis butuh easing berupa fungsi (t) => number, bukan array cubic-bezier
// ala Framer Motion — ini kurva quartic yang sama dipakai di setup Lenis
// (smooth-scroll.tsx), biar auto-scroll lirik "senada" sama smooth scroll
// bawaan situs.
const lenisEase = (t: number) => 1 - Math.pow(1 - t, 4);

type Status = "idle" | "loading" | "playing";

/** Ngurusin audio preview + expose currentTime/duration-nya, biar
 * tombol play dan animasi kata sama-sama bisa baca posisi yang sama. */
export function useAudioPreview(previewUrl?: string) {
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

export type AudioPreviewState = ReturnType<typeof useAudioPreview>;

/** Tokenize teks lirik + hitung kata mana yang lagi aktif di currentTime,
 * berdasarkan wordTimings (timestamp asli per kata). Dipakai bareng oleh
 * highlight teks (AnimatedDescription) dan gerakan kamera di cover art,
 * biar dua-duanya "denger" beat kata yang sama persis. */
export function useActiveLyricToken(
  text: string,
  wordTimings: WordTiming[] | undefined,
  currentTime: number
) {
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);

  const startByTokenIndex = useMemo(() => {
    if (!wordTimings || wordTimings.length === 0) return null;
    const map = new Map<number, number>();
    let wtIndex = 0;
    tokens.forEach((token, i) => {
      if (token === "" || /^\s+$/.test(token)) return;
      const timing = wordTimings[wtIndex];
      if (timing && timing.start !== null) {
        map.set(i, timing.start);
      }
      wtIndex += 1;
    });
    return map;
  }, [tokens, wordTimings]);

  const activeTokenIndex = useMemo(() => {
    if (!startByTokenIndex) return -1;
    let best = -1;
    let bestStart = -Infinity;
    startByTokenIndex.forEach((start, tokenIndex) => {
      if (start <= currentTime && start > bestStart) {
        bestStart = start;
        best = tokenIndex;
      }
    });
    return best;
  }, [startByTokenIndex, currentTime]);

  return { tokens, startByTokenIndex, activeTokenIndex };
}

/** Deskripsi yang nyorotin satu kata di posisi "sekarang" doang —
 * begitu lewat, balik abu lagi. Kalau `wordTimings` tersedia (hasil dari
 * Lyric Timing Tool), highlight dihitung dari timestamp asli per kata.
 * Kalau tidak ada, fallback ke estimasi proporsi karakter berbasis
 * `progress` (currentTime / duration).
 *
 * Selama audio diputar, paragraf ini juga auto-scroll (lewat Lenis)
 * supaya kata aktif selalu kelihatan di layar. Efek "zoom kamera"-nya
 * sendiri sekarang ditangani satu level di atas (ProductHero), yang
 * mecut seluruh panggung (gambar + judul + lirik) bareng-bareng setiap
 * kata baru aktif — bukan cuma paragraf ini doang. */
function AnimatedDescription({
  text,
  progress,
  activeTokenIndex,
  hasTimings,
  isPlaying,
}: {
  text: string;
  progress: number;
  activeTokenIndex: number;
  hasTimings: boolean;
  isPlaying: boolean;
}) {
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);
  const wordRefs = useRef<Map<number, HTMLSpanElement>>(new Map());
  const lastScrollKey = useRef<number>(-1);

  // rentang [start, end) 0..1 tiap kata, dihitung sekali per teks —
  // gak ada mutasi state pas render, cuma dibaca pas map di bawah.
  // Cuma dipakai kalau wordTimings gak tersedia (fallback).
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

  // Auto-scroll ngikutin kata aktif biar selalu kelihatan di layar. Cuma
  // jalan kalau lagi diputar & ada wordTimings (tanpa timing, gak ada
  // satu kata "aktif" yang jelas buat dituju).
  useEffect(() => {
    if (!isPlaying || !hasTimings || activeTokenIndex < 0) return;
    if (lastScrollKey.current === activeTokenIndex) return;
    lastScrollKey.current = activeTokenIndex;

    const wordEl = wordRefs.current.get(activeTokenIndex);
    if (!wordEl) return;

    const wordRect = wordEl.getBoundingClientRect();

    // Auto-scroll: pusatkan kata aktif di layar. `lock: true` bikin
    // Lenis abaikan scroll manual user selama animasi ini jalan — tiap
    // kata baru bakal narik posisi balik lagi ke sana.
    getLenis()?.scrollTo(wordEl, {
      offset: -window.innerHeight / 2 + wordRect.height / 2,
      duration: 0.9,
      easing: lenisEase,
      lock: true,
    });
  }, [activeTokenIndex, isPlaying, hasTimings]);

  useEffect(() => {
    if (isPlaying) return;
    lastScrollKey.current = -1;
  }, [isPlaying]);

  return (
    <p
      className={`${lyricFont.className} whitespace-pre-line text-sm leading-loose text-muted`}
      style={{
        // Bug yang sama kayak di product-hero.tsx: aturan global `p {
        // font-size: 20px }` di globals.css gak ke-layer, jadi dia
        // menang lawan utility Tailwind `.text-sm` (yang ke-layer),
        // walau specificity class harusnya lebih tinggi — cascade
        // layers bikin rule di luar @layer selalu menang. Makanya lirik
        // ini kebaca 20px padahal harusnya 14px (text-sm), jadi tampil
        // gak semestinya gede tiap baris pendeknya. fontSize eksplisit
        // di sini yang bereskan, sama kayak h1/h2 di product-hero.tsx.
        fontSize: "14px",
        WebkitTextSizeAdjust: "none",
        textSizeAdjust: "none",
      }}
    >
      {tokens.map((token, i) => {
        const range = wordRanges[i];
        if (!range) {
          return <span key={i}>{token}</span>;
        }
        const isActive = hasTimings
          ? i === activeTokenIndex
          : progress >= range.start && progress < range.end;

        return (
          <span
            key={i}
            ref={(el) => {
              if (el) wordRefs.current.set(i, el);
              else wordRefs.current.delete(i);
            }}
            className="relative inline-block px-0.5 py-0.5"
          >
            {/* AnimatePresence + pop in/out (bukan layoutId geser) sengaja
             * dipilih: waktu kata aktif lompat ke baris berikutnya,
             * animasi "geser" (FLIP) melar jadi garis tipis vertikal yang
             * meregang antar baris — itu sumber "glitch" yang keliatan.
             * Pop di tempat masing-masing kata jauh lebih aman & tetap
             * kerasa hidup. */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  key="highlight"
                  className="absolute inset-0 rounded-md bg-[#7c3aed]"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
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

export function ProductPreviewPanel({
  product,
  audio,
  activeTokenIndex,
  hasTimings,
}: {
  product: Product;
  audio: AudioPreviewState;
  // Dihitung sekali di ProductHero (bukan di sini) biar highlight kata dan
  // "detak" zoom seluruh panggung selalu pas di kata yang sama persis.
  activeTokenIndex: number;
  hasTimings: boolean;
}) {
  const { status, currentTime, duration, toggle } = audio;
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

      <div>
        <AnimatedDescription
          text={product.description}
          progress={progress}
          activeTokenIndex={activeTokenIndex}
          hasTimings={hasTimings}
          isPlaying={status === "playing"}
        />
      </div>
    </>
  );
}
