"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import {
  ProductPreviewPanel,
  useActiveLyricToken,
  useAudioPreview,
} from "./product-preview-panel";
import { ProductCameraImage } from "./product-hero-image";
import type { Product } from "@/lib/products";

// Kurva ease-out yang sama dipakai di scroll-reveal & page transition, biar
// "rasa" kamera ini nyambung sama animasi lain di situs.
const cameraEase = [0.22, 1, 0.36, 1] as const;

/** Satu-satunya tempat yang manggil useAudioPreview buat halaman produk —
 * hasilnya dipakai bareng oleh cover art, judul, dan panel lirik, biar cuma
 * ada satu elemen <audio> dan semuanya selalu "denger" waktu yang sama.
 *
 * activeTokenIndex juga dihitung di sini (bukan di dalam panel lirik) biar
 * ada satu sumber kebenaran buat "detak" kamera: dipakai bareng untuk
 * nge-highlight kata aktif DAN buat mecut zoom seluruh panggung (cover +
 * judul + lirik) bareng-bareng — bukan cuma kotak teksnya doang. */
export function ProductHero({ product }: { product: Product }) {
  const audio = useAudioPreview(product.previewUrl);
  const { activeTokenIndex } = useActiveLyricToken(
    product.description,
    product.wordTimings,
    audio.currentTime
  );
  const hasTimings = Boolean(product.wordTimings && product.wordTimings.length > 0);
  const isPlaying = audio.status === "playing";

  const cameraControls = useAnimationControls();

  useEffect(() => {
    if (!isPlaying) {
      cameraControls.start({ scale: 1, transition: { duration: 0.6, ease: cameraEase } });
      return;
    }
    if (!hasTimings || activeTokenIndex < 0) return;

    // Tiap kata baru = satu "detak" kamera. Origin-nya SENGAJA gak pernah
    // dipindah-pindah (fixed di style di bawah) — sumber "patah-patah" yang
    // lama itu justru transformOrigin yang loncat instan tiap kata ganti
    // sementara scale-nya masih lagi animasi. Sekarang cuma satu angka
    // (scale) yang di-tween lewat keyframes, jadi mulus dari kata ke kata,
    // dan yang ke-zoom seluruh panggung (gambar + judul + lirik), bukan
    // cuma paragraf lirik.
    cameraControls.start({
      scale: [1, 1.045, 1.015],
      transition: { duration: 0.9, ease: cameraEase, times: [0, 0.35, 1] },
    });
  }, [activeTokenIndex, isPlaying, hasTimings, cameraControls]);

  return (
    <motion.div
      animate={cameraControls}
      initial={{ scale: 1 }}
      style={{ transformOrigin: "50% 50%", willChange: "transform" }}
      className="mt-lg grid grid-cols-12 gap-x-5"
    >
      <div className="col-span-12 flex flex-col sm:col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3">
        <ProductCameraImage product={product} />
      </div>

      <div className="col-span-12 mt-4 flex flex-col gap-y-1.5 sm:col-span-6 sm:mt-0 md:col-span-7 lg:col-span-8 xl:col-span-9">
        <div className="space-y-0">
          <h1
            className="break-words font-medium text-foreground"
            style={{
              fontSize: "27px",
              WebkitTextSizeAdjust: "none",
              textSizeAdjust: "none",
            }}
          >
            {product.name}
          </h1>
          <h2
            className="-mt-1 text-muted"
            style={{
              fontSize: "16px",
              WebkitTextSizeAdjust: "none",
              textSizeAdjust: "none",
            }}
          >
            {product.tagline}
          </h2>
        </div>

        <ProductPreviewPanel
          product={product}
          audio={audio}
          activeTokenIndex={activeTokenIndex}
          hasTimings={hasTimings}
        />
      </div>
    </motion.div>
  );
}
