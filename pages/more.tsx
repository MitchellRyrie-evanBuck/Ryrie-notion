"use client";

import React from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { LinkPreview } from "@/components/ui/link-preview";
import { NotionPageHeader } from '@/components/NotionPageHeader'
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import Image from "next/image";

export default function Custom() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "apps",
    },
    {
      text: "with",
    },
    {
      text: "Xcode.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const testimonials = [
    {
      quote:
        "Currently working in a network security company, doing web development work for network security",
      name: "Liu xiaowen",
      designation: "Developer at Cyberspace",
      src: "/ryrie.png",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];


  const blogContent = {
    slug: "amazing-tailwindcss-grid-layouts",
    author: "Manu Arora",
    date: "28th March, 2023",
    title: "Amazing Tailwindcss Grid Layout Examples",
    description:
      "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    image: "/demo/thumbnail.png",
    authorAvatar: "/ryrie.png",
  };

  const TitleComponent = ({
    title,
    avatar,
  }: {
    title: string;
    avatar: string;
  }) => (
    <div className="flex items-center space-x-2">
      <Image
        src={avatar}
        height="20"
        width="20"
        alt="thumbnail"
        className="rounded-full border-2 border-white"
      />
      <p>{title}</p>
    </div>
  );

  return (
    <div className=" h-full min-h-[100vh] bg-white dark:bg-black">

      <NotionPageHeader block={null} />
      <div className="m-auto">
        <div className="flex flex-col items-center justify-center h-[40rem] ">

          <TypewriterEffect words={words} />
          <div className="flex flex-col mt-10 space-x-0 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <button className="w-40 h-10 text-sm text-white bg-black rounded-xl border border-transparent dark:border-white">
                Join now
              </button>
              <button className="w-40 h-10 text-sm text-black bg-white rounded-xl border border-black">
                Signup
              </button>
          </div>
        </div>
        <p className="text-xl text-center text-neutral-500 dark:text-neutral-400 md:text-3xl">
          Visit{" "}
          <LinkPreview
            url="https://www.ryrie.ink/"
            className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500"
          >
            Ryrie Notion
          </LinkPreview>{" "}
          and for amazing Tailwind and Framer Motion components.
        </p>

        <AnimatedTestimonials testimonials={testimonials} />

      </div>

    </div>
  );
}
