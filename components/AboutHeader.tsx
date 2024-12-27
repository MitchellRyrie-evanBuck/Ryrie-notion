import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { LinkPreview } from "@/components/ui/link-preview";

export function BackgroundGradientAnimationDemo() {
  return (
    <div className="overflow-hidden rounded-3xl notion-page-cover-wrapper notion-page-cover-hero">
      <BackgroundGradientAnimation>
        <div className="flex absolute inset-0 z-50 justify-center items-center px-4 w-full h-full text-2xl font-bold text-center text-white pointer-events-none md:text-3xl lg:text-6xl">
          <p className="text-transparent bg-clip-text bg-gradient-to-b drop-shadow-2xl from-white/80 to-white/20">
            Welcome to Visit {" "}
            <LinkPreview
              url="https://www.ryrie.ink/"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500 z-90"
            >
              Ryrie Notion
            </LinkPreview>{" "}
          </p>
        </div>
      </BackgroundGradientAnimation>
    </div>

  );
}
