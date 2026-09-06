"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { useActiveLyricToken, type AudioPreviewState } from "./product-preview-panel";
import type { Product } from "@/lib/products";

// Kurva ease-out yang sama dipakai di scroll-reveal & page transition,
// biar "rasa" gerakannya konsisten di seluruh web — gak kaku/linear.
const cameraEase = [0.22, 1, 0.36, 1] as const;

/** Cover art yang gerak sendiri ("kamera") ngikutin lagu: tiap kali kata
 * lirik yang aktif berganti, kamera pan + zoom ke titik baru (arah &
 * jaraknya acak dalam batas kecil), jalan pakai easing halus — jadi
 * berasa kayak handheld camera yang drift ngikutin ketukan lirik, bukan
 * cuma diem trus "denyut" doang. Kalau lagu belum ada wordTimings, kamera
 * tetap drift pelan berdasarkan progress audio biar gak statis total.
 * Berhenti / balik ke posisi normal kalau lagu gak lagi diputar. */
export function ProductCameraImage({
  product,
  audio,
}: {
  product: Product;
  audio: AudioPreviewState;
}) {
  const { status, currentTime, duration } = audio;
  const { activeTokenIndex } = useActiveLyricToken(
    product.description,
    product.wordTimings,
    currentTime
  );
  const hasTimings = Boolean(product.wordTimings && product.wordTimings.length > 0);

  const isPlaying = status === "playing";
  const rawProgress = duration > 0 ? currentTime / duration : 0;

  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const punchScale = useMotionValue(1);

  const lastMoveKey = useRef<number>(-1);

  // Kamera diem balik ke posisi awal begitu berhenti diputar.
  useEffect(() => {
    if (isPlaying) return;
    animate(scale, 1, { duration: 0.6, ease: cameraEase });
    animate(x, 0, { duration: 0.6, ease: cameraEase });
    animate(y, 0, { duration: 0.6, ease: cameraEase });
  }, [isPlaying, scale, x, y]);

  // Gerakan utama: pindah target pan/zoom tiap kata baru aktif.
  useEffect(() => {
    if (!isPlaying || !hasTimings || activeTokenIndex < 0) return;
    if (lastMoveKey.current === activeTokenIndex) return;
    lastMoveKey.current = activeTokenIndex;

    const targetScale = 1.08 + Math.random() * 0.08; // 1.08 – 1.16
    const targetX = (Math.random() - 0.5) * 32; // -16px .. 16px
    const targetY = (Math.random() - 0.5) * 24; // -12px .. 12px

    animate(scale, targetScale, { duration: 1.1, ease: cameraEase });
    animate(x, targetX, { duration: 1.1, ease: cameraEase });
    animate(y, targetY, { duration: 1.1, ease: cameraEase });

    // Aksen "nendang" kecil di atas gerakan kamera, biar tetep berasa
    // ketukannya.
    animate(punchScale, [1, 1.03, 1], { duration: 0.5, ease: cameraEase });
  }, [activeTokenIndex, isPlaying, hasTimings, scale, x, y, punchScale]);

  // Fallback buat produk tanpa wordTimings: drift pelan ngikutin
  // progress keseluruhan lagu, biar tetap ada gerakan.
  useEffect(() => {
    if (!isPlaying || hasTimings) return;
    animate(scale, 1 + rawProgress * 0.1, { duration: 0.8, ease: cameraEase });
    animate(x, -rawProgress * 14, { duration: 0.8, ease: cameraEase });
    animate(y, rawProgress * 10, { duration: 0.8, ease: cameraEase });
  }, [rawProgress, isPlaying, hasTimings, scale, x, y]);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-2">
      <motion.div className="absolute inset-0" style={{ scale, x, y }}>
        <motion.img
          src={product.image}
          alt={`Sample Pack: ${product.name}`}
          style={{ scale: punchScale }}
          className="product-image absolute inset-0 h-full w-full rounded-xl object-cover"
        />
      </motion.div>
    </div>
  );
}
