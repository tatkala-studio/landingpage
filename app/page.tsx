"use client";

import { useState } from "react";
import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { WorkServiceSection } from "./components/work-service-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { CtaSection } from "./components/cta-section";

export default function App() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const openAboutModal = () => {
    setIsAboutModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeAboutModal = () => {
    setIsAboutModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950"></div>

      {/* Subtle grain texture */}
      <div className="fixed inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

      <div className="relative w-full p-4 lg:p-6 overflow-auto lg:overflow-hidden h-auto lg:h-screen">
        {/* MOBILE/TABLET: stack cleanly */}
        <div className="flex flex-col gap-6 lg:hidden">
          <div className="w-full">
            <HeroSection onExploreClick={openAboutModal} />
          </div>
          {/* <div className="w-full">
            <AboutSection 
              isModalOpen={isAboutModalOpen}
              closeModal={closeAboutModal}
            />
          </div> */}
          <div className="w-full">
            <WorkServiceSection />
          </div>
          <div className="w-full">
            <TestimonialsSection />
          </div>
          <div className="w-full">
            <CtaSection />
          </div>
        </div>

        {/* DESKTOP: new layout */}
        <div
          className="
            hidden lg:grid
            lg:h-full lg:max-h-full
            lg:grid-cols-12 lg:grid-rows-12
            lg:gap-6
            lg:overflow-hidden
          "
        >
          {/* Hero - Left 50% */}
          <div className="min-h-0 h-full lg:col-span-6 lg:row-span-8">
            <div className="h-full min-h-0">
              <HeroSection onExploreClick={openAboutModal} />
            </div>
          </div>

          {/* Work & Service - Right 50% */}
          <div className="min-h-0 h-full lg:col-span-6 lg:row-span-8">
            <div className="h-full min-h-0">
              <WorkServiceSection />
            </div>
          </div>

          {/* Testimonials - Below Hero */}
          <div className="min-h-0 h-full lg:col-span-6 lg:row-span-4">
            <div className="h-full min-h-0">
              <TestimonialsSection />
            </div>
          </div>

          {/* CTA - Below Work/Service */}
          <div className="min-h-0 h-full lg:col-span-6 lg:row-span-4">
            <div className="h-full min-h-0">
              <CtaSection />
            </div>
          </div>

          {/* About Card (optional - jika ingin tetap ditampilkan) */}
          {/* <div className="min-h-0 h-full lg:col-span-12 lg:row-span-4">
            <div className="h-full min-h-0">
              <AboutSection 
                isModalOpen={isAboutModalOpen}
                closeModal={closeAboutModal}
              />
            </div>
          </div> */}
        </div>
      </div>

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-zinc-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}