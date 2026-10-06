import * as React from "react";
import { cn } from "@/lib/utils";

/** The chevron mark. `wordmark` adds the "| Media" lockup used in the navbar. */
export function Logo({ className, wordmark }: { className?: string; wordmark?: boolean }) {
  return (
    <div className={cn("flex items-center", wordmark ? "gap-1.5 md:gap-2" : "gap-3", className)}>
      <svg
        // The wordmark crops the mark's built-in padding so the divider sits close.
        viewBox={wordmark ? "8 16 72 68" : "0 0 100 100"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={wordmark ? "h-7 w-7 md:h-8 md:w-8" : "h-10 w-20 md:h-12 md:w-12"}
      >
        <path
          d="M12 18C10 18 9 20 10 22L42 50L10 78C9 80 10 82 12 82H34C37 82 39 81 41 79L76 54C79 52 79 48 76 46L41 21C39 19 37 18 34 18H12Z"
          fill="#FF4B33"
        />
      </svg>
      {wordmark && (
        <>
          <span aria-hidden className="h-6 md:h-7 w-0.5 bg-neutral-900 dark:bg-white" />
          <span className="text-2xl md:text-[1.7rem] font-bold leading-none tracking-tight text-[#FF4B33]">
            Media
          </span>
        </>
      )}
    </div>
  );
}
