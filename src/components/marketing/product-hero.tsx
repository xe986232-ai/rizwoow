"use client";

import { ProductPreviewPanel, useAudioPreview } from "./product-preview-panel";
import { ProductCameraImage } from "./product-hero-image";
import type { Product } from "@/lib/products";

/** Satu-satunya tempat yang manggil useAudioPreview buat halaman produk —
 * hasilnya dipakai bareng oleh cover art (kamera pan/zoom + punch ngikutin
 * lirik) dan panel kanan (tombol play + teks lirik beranimasi), biar cuma
 * ada satu elemen <audio> dan keduanya selalu "denger" waktu yang sama. */
export function ProductHero({ product }: { product: Product }) {
  const audio = useAudioPreview(product.previewUrl);

  return (
    <div className="mt-lg grid grid-cols-12 gap-x-5">
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

        <ProductPreviewPanel product={product} audio={audio} />
      </div>
    </div>
  );
}
