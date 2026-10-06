// One place for page meta + structured data, so every route stays consistent.
export const SITE = "https://vertexmediahouse.com";
export const SITE_NAME = "Vertex Media House";
export const OG_IMAGE = `${SITE}/og-image.png`;

const ORG_ID = `${SITE}/#organization`;

export const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE,
  logo: `${SITE}/favicon-512.png`,
  image: OG_IMAGE,
  email: "dhrumil@vertexmediahouse.com",
  description:
    "Video editing agency for creators and brands: short-form reels, long-form YouTube and podcast editing, thumbnails and YouTube channel management.",
  areaServed: "Worldwide",
  priceRange: "$$",
  sameAs: [
    "https://www.linkedin.com/company/vertex-media-house/",
    "https://www.instagram.com/vertexmediahouse/",
  ],
};

export const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE,
  publisher: { "@id": ORG_ID },
};

/** Breadcrumb trail from the home page to `path`. */
export function breadcrumbs(...trail: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as const, ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE}${path}`,
    })),
  };
}

export const provider = { "@id": ORG_ID };

/** Title, description, Open Graph, Twitter, canonical and JSON-LD for one page. */
export function seo({
  title,
  description,
  path,
  jsonLd = [],
}: {
  title: string;
  description: string;
  path: string;
  jsonLd?: object[];
}) {
  const url = `${SITE}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}
