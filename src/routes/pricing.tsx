import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingWidgets } from "@/components/site/FloatingWidgets";
import { PricingSections, plans } from "@/components/site/Pricing";
import { SITE, breadcrumbs, provider, seo } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    seo({
      title: "Pricing — Video Editing Packages from $449/mo | Vertex Media House",
      description:
        "Video editing plans from $449/month, or build a custom package: short-form videos from $30, long-form from $70, thumbnails from $15.",
      path: "/pricing",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Video editing packages",
          serviceType: "Video editing",
          url: `${SITE}/pricing`,
          provider,
          areaServed: "Worldwide",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Monthly video editing plans",
            itemListElement: plans.map((p) => ({
              "@type": "Offer",
              name: `${p.name} plan`,
              description: [...p.items.map((it) => `${it.qty} ${it.label}`), ...p.free].join(", "),
              price: p.price,
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: p.price,
                priceCurrency: "USD",
                unitText: "MONTH",
              },
            })),
          },
        },
        breadcrumbs(["Pricing", "/pricing"]),
      ],
    }),
  component: Pricing,
});

function Pricing() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-black">
        <main className="relative w-full bg-white dark:bg-neutral-950">
          <Navbar />
          <PricingSections />
          <Footer />
        </main>
        <FloatingWidgets />
      </div>
    </ThemeProvider>
  );
}
