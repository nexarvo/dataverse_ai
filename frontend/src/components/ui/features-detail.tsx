"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const dashboardImage = {
  src: "https://ui.shadcn.com/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-01-dark.png&w=3840&q=75",
  alt: "DataVerse Analytics Dashboard",
};

export default function FeaturesDetail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade-in animation for the image
    gsap.fromTo(
      imageRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-8 md:py-16">
      <div className="mx-auto">
        <div className="flex justify-center">
          <div
            ref={imageRef}
            className="relative rounded-2xl border-4 border-gray-300 shadow-2xl overflow-hidden"
          >
            <div className="relative aspect-[16/9] w-[70vw] max-w-6xl">
              <Image
                src={dashboardImage.src}
                alt={dashboardImage.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/5 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
