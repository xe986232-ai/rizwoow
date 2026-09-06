import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { ProductAmbientGlow } from "@/components/marketing/product-ambient-glow";
import { SamplesSection } from "@/components/marketing/samples-section";
import { ProductPreviewPanel } from "@/components/marketing/product-preview-panel";
import { FeaturedProductsCarousel } from "@/components/marketing/featured-products-carousel";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { getProductBySlug, products } from "@/lib/products";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col pb-xl">
      <div className="relative">
        <ProductAmbientGlow imageSrc={product.image} />

        <div className="mt-md px-sm md:mt-lg md:px-lg">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Providers", href: "/providers" },
              {
                label: product.providerName,
                href: `/provider/sample-packs/${product.providerSlug}`,
              },
              { label: product.name },
            ]}
          />

          <div className="mt-lg grid grid-cols-12 gap-x-5">
            <div className="col-span-12 flex flex-col sm:col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-2">
                <img
                  src={product.image}
                  alt={`Sample Pack: ${product.name}`}
                  className="product-image absolute inset-0 h-full w-full rounded-xl object-cover"
                />
              </div>
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

              <ProductPreviewPanel product={product} />
            </div>
          </div>

          {product.samples && product.samples.length > 0 && (
            <ScrollReveal>
              <SamplesSection
                samples={product.samples}
                packImage={product.image}
                providerSlug={product.providerSlug}
              />
            </ScrollReveal>
          )}
        </div>
      </div>

      <ScrollReveal className="mt-lg">
        <FeaturedProductsCarousel
          excludeSlug={product.slug}
          title="Related Product"
          showTags={false}
        />
      </ScrollReveal>
    </div>
  );
}
