"use client";

import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

/** Extract warna DOMINAN (bukan cuma rata-rata) dari cover produk,
 * client-side, pakai `fast-average-color` dengan algorithm "dominant".
 * Hasilnya array [r, g, b, a] — disimpan sebagai string "r, g, b" biar
 * gampang disisipkan ke template rgba(...) dengan alpha custom di CSS. */
function useDominantColor(src?: string) {
  const [rgb, setRgb] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    const fac = new FastAverageColor();

    fac
      .getColorAsync(src, {
        algorithm: "dominant",
        crossOrigin: "anonymous",
        mode: "speed",
      })
      .then((result) => {
        if (cancelled) return;
        const [r, g, b] = result.value;
        setRgb(`${r}, ${g}, ${b}`);
      })
      .catch(() => {
        if (!cancelled) setRgb(null);
      });

    return () => {
      cancelled = true;
      fac.destroy();
    };
  }, [src]);

  return rgb;
}

/** Ambient glow tipis di area atas halaman produk (zona breadcrumb,
 * sebelum turun ke gambar produk) — warnanya ngikutin warna dominan
 * cover produk itu sendiri, biar transisi dari header ke gambar kerasa
 * nyambung (mirip glow "now playing" di Spotify), bukan potongan flat.
 *
 * Bentuknya: gradient horizontal penuh lebar, fade dari warna dominan
 * (tipis, opacity rendah) di atas turun ke transparan — makanya
 * `pointer-events-none` & `-z-10`, murni dekorasi di belakang konten. */
export function ProductAmbientGlow({ imageSrc }: { imageSrc: string }) {
  const rgb = useDominantColor(imageSrc);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 md:h-44"
      style={{
        background: rgb
          ? `linear-gradient(to bottom, rgba(${rgb}, 0.2), rgba(${rgb}, 0) 100%)`
          : undefined,
        opacity: rgb ? 1 : 0,
        transition: "opacity 0.5s ease-out",
      }}
    />
  );
}
