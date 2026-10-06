import { createFileRoute, notFound } from "@tanstack/react-router";
import { ServicePage, services } from "@/components/services/ServicePage";
import { SITE, breadcrumbs, provider, seo } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    if (!services[params.slug]) throw notFound();
  },
  head: ({ params }) => {
    const s = services[params.slug];
    if (!s) return {};
    const path = `/services/${s.slug}`;
    return seo({
      title: s.metaTitle,
      description: s.metaDescription,
      path,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          serviceType: s.name,
          description: s.metaDescription,
          url: `${SITE}${path}`,
          provider,
          areaServed: "Worldwide",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.faqs.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        },
        breadcrumbs(["Services", "/#services"], [s.name, path]),
      ],
    });
  },
  component: function ServiceRoute() {
    return <ServicePage slug={Route.useParams().slug} />;
  },
});
