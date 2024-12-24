import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export function BackgroundGradientAnimationDemo() {
  return (
    <div className="overflow-hidden rounded-3xl notion-page-cover-wrapper notion-page-cover-hero">
      <BackgroundGradientAnimation>
        <div className="flex absolute inset-0 z-50 justify-center items-center px-4 w-full h-full text-3xl font-bold text-center text-white pointer-events-none md:text-4xl lg:text-7xl">
          <p className="text-transparent bg-clip-text bg-gradient-to-b drop-shadow-2xl from-white/80 to-white/20">
            About X Profile
          </p>
        </div>
      </BackgroundGradientAnimation>
    </div>

  );
}
