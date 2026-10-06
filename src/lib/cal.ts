/* eslint-disable @typescript-eslint/no-explicit-any, prefer-rest-params -- Cal.com's official embed snippet */
import { useEffect } from "react";

/**
 * Loads the Cal.com embed once for the whole site, so every
 * `data-cal-link` button (navbar, hero, pricing...) opens the booking popup.
 */
export function useCalEmbed() {
  useEffect(() => {
    const win = window as any;
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      win.Cal =
        win.Cal ||
        function () {
          const cal = win.Cal as any;
          const ar = arguments as any;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // Initialize Cal.com namespace
    if (win.Cal) {
      win.Cal("init", "15min", { origin: "https://app.cal.com" });

      // Detect current theme from <html> class
      const isDark = document.documentElement.classList.contains("dark");

      win.Cal.ns["15min"]("ui", {
        theme: isDark ? "dark" : "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          dark: {
            "cal-bg": "#030303",
            "cal-bg-emphasis": "#111111",
            "cal-bg-subtle": "#0a0a0a",
            "cal-bg-muted": "#171717",
            "cal-bg-inverted": "#ffffff",
            "cal-border": "rgba(255,255,255,0.08)",
            "cal-border-emphasis": "rgba(255,255,255,0.14)",
            "cal-border-subtle": "rgba(255,255,255,0.05)",
            "cal-text": "#e5e5e5",
            "cal-text-emphasis": "#ffffff",
            "cal-text-subtle": "#a3a3a3",
            "cal-text-muted": "#737373",
            "cal-text-inverted": "#030303",
            "cal-brand": "#ff4d31",
            "cal-brand-emphasis": "#e8432b",
            "cal-brand-text": "#ffffff",
            "cal-brand-subtle": "rgba(255,77,49,0.15)",
          },
          light: {
            "cal-bg": "#f9fafb",
            "cal-bg-emphasis": "#ffffff",
            "cal-bg-subtle": "#f3f4f6",
            "cal-bg-muted": "#e5e7eb",
            "cal-bg-inverted": "#111111",
            "cal-border": "rgba(0,0,0,0.08)",
            "cal-border-emphasis": "rgba(0,0,0,0.14)",
            "cal-border-subtle": "rgba(0,0,0,0.05)",
            "cal-text": "#1a1a1a",
            "cal-text-emphasis": "#000000",
            "cal-text-subtle": "#6b7280",
            "cal-text-muted": "#9ca3af",
            "cal-text-inverted": "#ffffff",
            "cal-brand": "#ff4d31",
            "cal-brand-emphasis": "#e8432b",
            "cal-brand-text": "#ffffff",
            "cal-brand-subtle": "rgba(255,77,49,0.1)",
          },
        },
        styles: {
          branding: { brandColor: "#ff4d31" },
        },
      });
    }
  }, []);
}
