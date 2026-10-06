import * as React from "react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { Twitter, Linkedin, Instagram, Info } from "lucide-react";

const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Why Us", href: "/#why-choose-us" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Pricing", href: "/pricing" },
];

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/vertex-media-house/posts/?feedView=all",
    label: "LinkedIn",
  },
  { icon: Instagram, href: "https://www.instagram.com/vertexmediahouse/", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="w-full px-4 pb-6 pt-12">
      <div
        className={cn(
          "relative mx-auto max-w-7xl rounded-2xl border border-white/20 dark:border-white/10 px-6 py-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden",
          "liquid-glass backdrop-blur-xl",
        )}
      >
        {/* ambient background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(59,130,246,0.08), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-white/10 to-transparent"
        />

        {/* Logo & Text */}
        <div className="flex items-center gap-3">
          <Logo className="scale-75 md:scale-90" />
          <span className="text-xl md:text-2xl font-bold tracking-tighter text-neutral-900 dark:text-white">
            VERTEX MEDIA HOUSE
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 md:gap-8">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-[#ff4d31] dark:hover:text-[#ff4d31] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-white/[0.02] text-neutral-600 dark:text-neutral-400 hover:border-orange-500/50 hover:text-[#ff4d31] dark:hover:text-[#ff4d31] transition-all duration-300"
            >
              <social.icon className="h-5 w-5" />
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Bottom decorative line for mobile */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-300/30 dark:via-white/10 to-transparent md:hidden" />
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-neutral-400 dark:text-neutral-600">
        © {new Date().getFullYear()} Vertex Media House. All rights reserved.
      </div>
    </footer>
  );
}
