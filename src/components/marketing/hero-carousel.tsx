"use client";

import { Button } from "@/components/ui/button";
import { EqualizerIcon, PlayIcon, SectionArrowIcon } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Pack {
  title: string;
  subtitle: string;
  image: string;
}

const packs: Pack[] = [
  {
    title: "Midnight Static",
    subtitle: "Lo-fi textures pulled from late-night sessions",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Bersaing",
    subtitle: "Warm analog drums for boom-bap and neo-soul",
    image: "/products/concrete-bloom.png",
  },
  {
    title: "Mutiara",
    subtitle: "Mutiara - Ipank",
    image: "/products/mutiara.png",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const pack = packs[index];

  function go(delta: number) {
    setIsPlaying(false);
    setIndex((i) => (i + delta + packs.length) % packs.length);
  }

  // Auto-advance the hero slides every few seconds. Pauses while a
  // preview is playing so it doesn't jump mid-listen.
  useEffect(() => {
    if (isPlaying || packs.length <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % packs.length);
    }, 5000);

    return () => clearInterval(id);
  }, [isPlaying, index]);

  return (
    <div className="px-sm md:px-lg">
      <div className="relative isolate aspect-[10/11] w-full flex-shrink-0 overflow-hidden rounded-[32px] p-8 md:aspect-[16/9] md:p-12">
        {/* background image — full bleed, ignores the slide's own padding */}
        <span className="absolute inset-0 block overflow-hidden bg-surface-2">
          <AnimatePresence mode="wait">
            <motion.img
              key={pack.image}
              src={pack.image}
              alt={pack.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 h-full w-full object-cover"
            />
          </AnimatePresence>
        </span>

        {/* legibility overlay — text side stays darkest */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/40 to-black/60" />

        {/* nav arrows */}
        <div className="absolute right-8 top-8 z-30 flex gap-sm md:right-12 md:top-12">
          <button
            type="button"
            aria-label="Previous pack"
            onClick={() => go(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-foreground backdrop-blur transition-colors hover:bg-black/60"
          >
            <SectionArrowIcon width={22} height={22} />
          </button>
          <button
            type="button"
            aria-label="Next pack"
            onClick={() => go(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-foreground backdrop-blur transition-colors hover:bg-black/60"
          >
            <SectionArrowIcon width={22} height={22} className="rotate-180" />
          </button>
        </div>

        {/* content */}
        <div className="relative z-20 flex h-full w-full flex-col justify-end">
          {/* play button: inline on mobile, centered-right floating box on desktop */}
          <div className="flex md:absolute md:inset-0 md:mx-[35%] md:items-center md:justify-center">
            <button
              type="button"
              aria-label={isPlaying ? "Pause preview" : "Play preview"}
              onClick={() => setIsPlaying((p) => !p)}
              className="group/play flex h-16 w-16 touch-manipulation select-none items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 ease-in-out active:scale-90 md:hover:bg-surface-2 md:hover:text-foreground"
            >
              {isPlaying ? (
                <EqualizerIcon width={18} height={18} />
              ) : (
                <PlayIcon width={44} height={44} className="h-16 w-16" />
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={pack.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="mb-3 mt-8 max-w-xl text-xl font-medium text-foreground lg:text-lg">
                {pack.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-muted">{pack.subtitle}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <Button
            variant="secondary"
            className="mt-8 w-fit min-w-0 rounded-full px-4 md:hover:scale-105"
          >
            View Pack
          </Button>
        </div>
      </div>
    </div>
  );
}
