import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Reviews, homeReviews, videoTestimonials } from "@/components/site/Reviews";
import { Footer } from "@/components/site/Footer";
import { FloatingWidgets } from "@/components/site/FloatingWidgets";
import { GradualBlur } from "@/components/site/GradualBlur";
import { CalendarCTA } from "@/components/site/CalendarCTA";
import { TechHouseCTA } from "@/components/site/TechHouseCTA";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Vertex Media House | Video Editing for Creators & Brands",
      description:
        "Short-form reels, long-form YouTube and podcast editing, thumbnails and channel management. Vertex Media House turns raw footage into scroll-stopping content.",
      path: "/",
    }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-full bg-neutral-100 dark:bg-black">
        <main className="relative w-full bg-white dark:bg-neutral-950">
          <h1 className="sr-only">Video Editing Services for Creators & Brands</h1>
          <div className="relative">
            <Navbar />
            <Hero />
            <Services />
            <Portfolio />
            <WhyChooseUs />
            <Reviews rows={1} items={homeReviews} videos={videoTestimonials} />
            <CalendarCTA />
            <TechHouseCTA />
            <Footer />
          </div>
        </main>
        <FloatingWidgets />
        <GradualBlur
          position="bottom"
          height="4rem"
          strength={1.5}
          divCount={6}
          exponential
          opacity={1}
        />
      </div>
    </ThemeProvider>
  );
}
