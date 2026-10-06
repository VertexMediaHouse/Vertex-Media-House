import { createFileRoute, redirect } from "@tanstack/react-router";

// The single editing page was split into one page per service — keep old links working.
export const Route = createFileRoute("/edit")({
  beforeLoad: () => {
    throw redirect({ to: "/services/$slug", params: { slug: "short-form" }, statusCode: 301 });
  },
});
