"use client";

import React from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { LinkPreview } from "@/components/ui/link-preview";
import { NotionPageHeader } from '@/components/NotionPageHeader'
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import Image from "next/image";
import { FocusCards } from "@/components/ui/focus-cards";
export default function Custom() {
  const words = [
    {
      text: "更多",
    },
    {
      text: "精彩内容",
    },
    {
      text: "即将上线",
    },
    {
      text: ",",
    },
    {
      text: "敬请期待",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "!",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className=" h-full min-h-[100vh] bg-white dark:bg-black flex flex-col items-center justify-center">

      <NotionPageHeader block={null} />
      <div className="m-auto">
        <div className="flex flex-col items-center justify-center h-[40rem] gap-8">
          <TypewriterEffect words={words} />
          <p className="text-xl text-center text-neutral-500 dark:text-neutral-400 md:text-3xl">
            Visit{" "}
            <LinkPreview
              url="https://www.ryrie.ink/"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500"
            >
              Ryrie Notion
            </LinkPreview>{" "}
            View more products to be released.
          </p>
          <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <button className="w-40 h-10 text-sm text-white bg-black border border-transparent rounded-xl dark:border-white">
              Join waiting
            </button>
            <button className="w-40 h-10 text-sm text-black bg-white border border-black rounded-xl">
              Signup Start
            </button>
          </div>
        </div>
        {/* <AnimatedTestimonials testimonials={testimonials} /> */}
        {/* <FocusCards cards={cards} /> */}
      </div>

    </div>
  );
}
