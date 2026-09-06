import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { SamplesSection } from "@/components/marketing/samples-section";
import { ProductHero } from "@/components/marketing/product-hero";
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

        <ProductHero product={product} />

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
