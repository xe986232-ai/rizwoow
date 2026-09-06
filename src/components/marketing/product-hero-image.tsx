"use client";

import { useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useActiveLyricToken, type AudioPreviewState } from "./product-preview-panel";
import type { Product } from "@/lib/products";

// Kurva ease-out yang sama dipakai di scroll-reveal & page transition,
// biar "rasa" gerakannya konsisten di seluruh web — gak kaku/linear.
const cameraEase = [0.22, 1, 0.36, 1] as const;

/** Cover art yang gerak sendiri ("kamera") ngikutin lagu:
 * - Pan + zoom pelan (Ken Burns) yang jalan seiring progress audio,
 *   di-smooth pakai spring biar gak nyentak walau currentTime update
 *   per beberapa ratus ms.
 * - Punch/zoom kecil tiap kali kata lirik yang aktif berganti — biar
 *   berasa "nendang" ngikutin ketukan, bukan cuma geser doang.
 * Kalau belum diputar / belum ada wordTimings, gambar diem normal. */
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

  const isPlaying = status === "playing";
  const rawProgress = duration > 0 ? currentTime / duration : 0;

  // Ken Burns: progress mentah di-smooth pakai spring, jadi pan/zoom-nya
  // ngalir halus walau sumber datanya update patah-patah (timeupdate).
  const progressMv = useMotionValue(rawProgress);
  useEffect(() => {
    progressMv.set(isPlaying ? rawProgress : 0);
  }, [rawProgress, isPlaying, progressMv]);
  const smoothProgress = useSpring(progressMv, {
    stiffness: 45,
    damping: 20,
    mass: 1,
  });

  const kenBurnsScale = useTransform(smoothProgress, [0, 1], [1, 1.14]);
  const kenBurnsX = useTransform(smoothProgress, [0, 1], [0, -16]);
  const kenBurnsY = useTransform(smoothProgress, [0, 1], [0, 12]);

  // Punch: tiap activeTokenIndex ganti (kata baru "kena"), kasih pulse
  // zoom kecil yang balik pelan pakai kurva ease-out custom di atas.
  const punch = useAnimation();
  useEffect(() => {
    if (!isPlaying || activeTokenIndex < 0) return;
    punch.start({
      scale: [1, 1.035, 1],
      transition: { duration: 0.55, ease: cameraEase },
    });
  }, [activeTokenIndex, isPlaying, punch]);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-2">
      <motion.div
        className="absolute inset-0"
        style={{ scale: kenBurnsScale, x: kenBurnsX, y: kenBurnsY }}
        transition={{ ease: cameraEase }}
      >
        <motion.img
          src={product.image}
          alt={`Sample Pack: ${product.name}`}
          animate={punch}
          className="product-image absolute inset-0 h-full w-full rounded-xl object-cover"
        />
      </motion.div>
    </div>
  );
}
