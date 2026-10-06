import { createFileRoute, redirect } from "@tanstack/react-router";

// Automation moved to the sister company — keep old links and search equity pointing there.
export const Route = createFileRoute("/automate")({
  beforeLoad: () => {
    throw redirect({ href: "https://vertextechhouse.com/automate", statusCode: 301 });
  },
});
