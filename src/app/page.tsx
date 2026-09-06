import { HeroCarousel } from "@/components/marketing/hero-carousel";
import { FeaturedProductsCarousel } from "@/components/marketing/featured-products-carousel";
import { SiteIntro } from "@/components/layout/site-intro";

export default function Home() {
  return (
    <div className="flex flex-col pb-xl">
      <div className="mt-md md:mt-lg">
        <HeroCarousel />
      </div>

      <div className="mt-lg">
        <FeaturedProductsCarousel />
      </div>

      <SiteIntro />
    </div>
  );
}
