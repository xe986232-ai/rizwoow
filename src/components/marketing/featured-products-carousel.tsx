"use client";

import { PlayIcon, SectionArrowIcon, TileWaveformIcon } from "@/components/icons";
import { products } from "@/lib/products";
import { TransitionLink } from "@/components/layout/transition-link";
import { useEffect, useRef, useState } from "react";

const tags = [
  "Latest",
  "Hip-Hop",
  "RnB",
  "Soul",
  "Boom Bap",
  "Trap",
  "Techno",
  "Tech-House",
  "Amapiano",
  "Pop",
];

export function FeaturedProductsCarousel({
  excludeSlug,
  title = "Featured products",
  showTags = true,
}: {
  /** When set, the product with this slug is left out of the list —
   * used on a product page to show "the rest" of the catalog. */
  excludeSlug?: string;
  /** Section heading text. */
  title?: string;
  /** Whether to show the genre tag filter row. */
  showTags?: boolean;
} = {}) {
  const visibleProducts = excludeSlug
    ? products.filter((product) => product.slug !== excludeSlug)
    : products;

  const [activeTag, setActiveTag] = useState("Latest");
  const [playingSlug, setPlayingSlug] = useState<string | null>(null);
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function scrollByAmount(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  function togglePlay(slug: string, previewUrl?: string) {
    if (!previewUrl) return;

    if (playingSlug === slug || loadingSlug === slug) {
      audioRef.current?.pause();
      setPlayingSlug(null);
      setLoadingSlug(null);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener("ended", () => setPlayingSlug(null));
    }

    const audio = audioRef.current;

    setPlayingSlug(null);
    setLoadingSlug(slug);

    const handlePlaying = () => {
      setLoadingSlug(null);
      setPlayingSlug(slug);
      audio.removeEventListener("playing", handlePlaying);
    };
    audio.addEventListener("playing", handlePlaying);

    audio.src = previewUrl;
    audio.currentTime = 0;
    audio.play().catch(() => {
      setLoadingSlug(null);
      audio.removeEventListener("playing", handlePlaying);
    });
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <section className="relative mx-sm rounded-2xl bg-surface py-12 md:mx-lg">
      <div className="mb-10 flex flex-col items-center justify-between gap-3 text-center md:items-start md:text-left">
        <h2 className="whitespace-nowrap px-12 text-xl font-medium lg:text-lg">
          {title}
        </h2>
        {showTags && (
          <div className="flex w-full gap-2 overflow-x-auto px-6 [scrollbar-width:none] [-ms-overflow-style:none] md:flex-wrap md:overflow-visible md:px-12 [&::-webkit-scrollbar]:hidden">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`inline-flex h-9 shrink-0 items-center justify-start rounded-3xl border px-4 transition-colors duration-200 ${
                  activeTag === tag
                    ? "border-white"
                    : "border-surface-2 hover:border-muted"
                }`}
              >
                <span className="whitespace-nowrap text-xs">{tag}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative mx-auto w-full">
        <ul
          ref={scrollerRef}
          className="carousel-viewport flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {visibleProducts.map((product) => (
            <li
              key={product.slug}
              className="group/card relative flex w-52 shrink-0 flex-col items-start justify-start gap-1 overflow-hidden rounded-2xl bg-surface-2 p-3 transition-colors duration-300 hover:bg-surface-2/70"
            >
              <div className="relative w-full">
                <TransitionLink href={`/products/${product.slug}`} className="block">
                  <span className="relative block aspect-square w-full overflow-hidden rounded-lg bg-background">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      loading="lazy"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </span>
                </TransitionLink>

                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                  <button
                    type="button"
                    aria-label={
                      loadingSlug === product.slug
                        ? "Loading"
                        : playingSlug === product.slug
                          ? "Pause"
                          : "Play"
                    }
                    onClick={() => togglePlay(product.slug, product.previewUrl)}
                    className="pointer-events-auto flex h-11 w-11 touch-manipulation select-none items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 ease-in-out active:scale-90 md:hover:bg-background md:hover:text-foreground"
                  >
                    {loadingSlug === product.slug ? (
                      <svg
                        className="animate-spin"
                        width={20}
                        height={20}
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
                          strokeWidth="1"
                          strokeOpacity="0.25"
                        />
                        <path
                          d="M41 22c0-10.493-8.507-19-19-19"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : playingSlug === product.slug ? (
                      <svg
                        className="block h-3.5 w-3.5 shrink-0 text-current transition-colors duration-300"
                        width="1em"
                        height="1em"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z"
                        />
                      </svg>
                    ) : (
                      <PlayIcon width={44} height={44} />
                    )}
                  </button>
                </div>

                <div className="absolute right-2 top-2 z-30">
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur transition-colors duration-200 md:hover:bg-background"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" />
                      <path d="M16 19h6" />
                      <path d="M19 16v6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex w-full min-w-0 flex-col px-2 pb-2 pt-3">
                <p className="truncate text-sm font-medium text-foreground transition-colors duration-300">
                  <TransitionLink href={`/products/${product.slug}`}>{product.name}</TransitionLink>
                </p>
                <p
                  className="truncate leading-tight text-muted"
                  style={{
                    fontSize: "15px",
                    WebkitTextSizeAdjust: "none",
                    textSizeAdjust: "none",
                  }}
                >
                  {product.providerName}
                </p>
              </div>

              <div className="flex flex-row flex-wrap gap-2 px-2 pb-2">
                <span className="flex flex-row items-center gap-1 rounded-full border border-muted/30 px-3 py-1 text-[11px] leading-none text-foreground transition-colors duration-200 md:group-hover/card:border-foreground">
                  <TileWaveformIcon width={16} height={16} />
                  {product.downloads}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex items-center justify-center gap-3 md:absolute md:right-12 md:top-16 md:mt-0">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => scrollByAmount(-320)}
          className="flex h-[52px] w-[52px] touch-manipulation select-none items-center justify-center rounded-full bg-surface-2 transition-all duration-200 ease-in-out active:scale-90 md:hover:bg-surface"
        >
          <SectionArrowIcon width={24} height={24} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => scrollByAmount(320)}
          className="flex h-[52px] w-[52px] touch-manipulation select-none items-center justify-center rounded-full bg-surface-2 transition-all duration-200 ease-in-out active:scale-90 md:hover:bg-surface"
        >
          <SectionArrowIcon width={24} height={24} className="rotate-180" />
        </button>
      </div>
    </section>
  );
}
