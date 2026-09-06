"use client";

import type { Product } from "@/lib/products";

/** Cover art halaman produk. Statis — kamera/zoom efeknya sekarang ada
 * di panel lirik (AnimatedDescription), bukan di sini. */
export function ProductCameraImage({ product }: { product: Product }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-2">
      <img
        src={product.image}
        alt={`Sample Pack: ${product.name}`}
        className="product-image absolute inset-0 h-full w-full rounded-xl object-cover"
      />
    </div>
  );
}
