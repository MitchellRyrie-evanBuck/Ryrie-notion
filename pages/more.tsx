"use client";

import React from "react";
import { NotionPageHeader } from '@/components/NotionPageHeader'
import Image from "next/image";
import { ExternalLink, Star, ArrowRight } from "lucide-react";

export default function Custom() {
  const featuredProjects = [
    {
      id: 1,
      title: "Custom Figma & Framer Components",
      description: "A comprehensive collection of custom-designed components for Figma and Framer, featuring modern UI elements and interactive prototypes.",
      image: "https://picsum.photos/600/400?random=1",
      tags: ["Figma", "Framer", "UI/UX", "Components"],
      demoUrl: "https://demo.example.com",
      category: "Design System"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "A modern e-commerce platform built with Next.js and Stripe integration for seamless online shopping experience.",
      image: "https://picsum.photos/600/400?random=2",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
      demoUrl: "https://demo.example.com",
      category: "Web Development"
    },
    {
      id: 3,
      title: "Task Management Dashboard",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      image: "https://picsum.photos/600/400?random=3",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      demoUrl: "https://demo.example.com",
      category: "Web Application"
    },
    {
      id: 4,
      title: "Weather Analytics App",
      description: "A beautiful weather dashboard with detailed forecasts, interactive maps, and location-based weather alerts.",
      image: "https://picsum.photos/600/400?random=4",
      tags: ["Vue.js", "OpenWeather API", "Chart.js", "CSS3"],
      demoUrl: "https://demo.example.com",
      category: "Mobile App"
    }
  ];

  const gradientLibraries = [
    {
      id: 1,
      title: "Sunset Gradient",
      gradient: "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600",
      colors: ["#FB923C", "#EC4899", "#9333EA"]
    },
    {
      id: 2,
      title: "Ocean Depth",
      gradient: "bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600",
      colors: ["#2DD4BF", "#3B82F6", "#9333EA"]
    },
    {
      id: 3,
      title: "Warm Peach",
      gradient: "bg-gradient-to-br from-yellow-200 via-pink-200 to-pink-400",
      colors: ["#FEF08A", "#FBCFE8", "#F472B6"]
    },
    {
      id: 4,
      title: "Cool Breeze",
      gradient: "bg-gradient-to-br from-blue-200 via-purple-200 to-purple-400",
      colors: ["#DBEAFE", "#E9D5FF", "#C084FC"]
    }
  ];

  const uiComponents = [
    {
      id: 1,
      title: "Modern Dashboard UI",
      description: "Clean and modern dashboard interface with dark mode support and responsive design.",
      image: "https://picsum.photos/400/300?random=5",
      tags: ["React", "Tailwind", "Dashboard"]
    },
    {
      id: 2,
      title: "Mobile App Interface",
      description: "Sleek mobile application interface with smooth animations and intuitive navigation.",
      image: "https://picsum.photos/400/300?random=6",
      tags: ["React Native", "UI/UX", "Mobile"]
    }
  ];

  const landingPages = [
    {
      id: 1,
      title: "SaaS Landing Page",
      description: "Modern SaaS landing page with conversion-optimized design and interactive elements.",
      image: "https://picsum.photos/400/300?random=7",
      tags: ["Next.js", "Framer Motion", "SaaS"]
    },
    {
      id: 2,
      title: "Product Launch Page",
      description: "Eye-catching product launch page with countdown timer and pre-order functionality.",
      image: "https://picsum.photos/400/300?random=8",
      tags: ["React", "TypeScript", "E-commerce"]
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Creative portfolio website showcasing work with smooth scrolling and animations.",
      image: "https://picsum.photos/400/300?random=9",
      tags: ["Next.js", "GSAP", "Portfolio"]
    },
    {
      id: 4,
      title: "Agency Website",
      description: "Professional agency website with team showcase and project galleries.",
      image: "https://picsum.photos/400/300?random=10",
      tags: ["React", "CMS", "Agency"]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NotionPageHeader block={null} />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-200">
              <Star className="w-4 h-4 mr-2" />
              Featured Projects
            </div>
            <h1 className="mb-6 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text">
              My Projects
            </h1>
            <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600 dark:text-gray-400">
              A curated collection of my recent work showcasing innovative solutions,
              cutting-edge technologies, and creative problem-solving approaches.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Figma & Framer Components Section */}
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Custom Figma & Framer Components
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Professional design components and interactive prototypes for modern web applications
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 group dark:bg-gray-800 rounded-2xl dark:border-gray-700 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute px-2 py-1 text-xs font-medium text-gray-700 rounded-md top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm dark:text-gray-300">
                  {project.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <ExternalLink size={14} />
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-black rounded-lg dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100">
            View All
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Gradient Libraries Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Gradient Libraries
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Beautiful gradient collections for your next design project
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
            {gradientLibraries.map((gradient) => (
              <div
                key={gradient.id}
                className="relative overflow-hidden transition-all duration-300 group rounded-2xl hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`h-64 ${gradient.gradient} relative`}>
                  <div className="absolute inset-0 transition-colors duration-300 bg-black/20 group-hover:bg-black/10"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {gradient.title}
                    </h3>
                    <div className="flex gap-2">
                      {gradient.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 border-2 rounded-full border-white/50"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-black rounded-lg dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100">
              View All
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* UI Components Section */}
      <div className="py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              UI Components
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Reusable UI components built with modern frameworks and best practices
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
            {uiComponents.map((component) => (
              <div
                key={component.id}
                className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 group dark:bg-gray-800 rounded-2xl dark:border-gray-700 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <Image
                    src={component.image}
                    alt={component.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {component.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {component.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {component.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Landing Pages Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Landing Pages
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              High-converting landing pages designed for modern businesses
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {landingPages.map((page) => (
              <div
                key={page.id}
                className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 group dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <Image
                    src={page.image}
                    alt={page.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {page.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {page.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {page.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-black rounded-lg dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100">
              View All
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <div className="p-12 border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl dark:border-blue-800/30">
            <h2 className="mb-4 text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Ready to collaborate?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600 dark:text-gray-400">
              I&apos;m always excited to work on innovative projects and bring creative ideas to life.
              Let&apos;s build something amazing together.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="px-8 py-4 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl hover:shadow-xl hover:-translate-y-1">
                Get In Touch
              </button>
              <button className="px-8 py-4 font-semibold text-gray-700 transition-all duration-300 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10">
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              A Roadmap to whats
            </h2>
            <h2 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
              coming next!
            </h2>
          </div>

          <div className="space-y-6">
            {/* Roadmap Item 1 */}
            <div className="p-6 bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-16 bg-gray-100 rounded-lg dark:bg-gray-700">
                    <Image
                      src="https://picsum.photos/80/64?random=11"
                      alt="Awesome Framer Templates"
                      width={80}
                      height={64}
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                    Awesome Framer Templates
                  </h3>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    Estimation: 25th December
                  </p>
                  <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
                    Shipped
                  </span>
                </div>
              </div>
            </div>

            {/* Roadmap Item 2 */}
            <div className="p-6 bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-16 bg-gray-100 rounded-lg dark:bg-gray-700">
                    <Image
                      src="https://picsum.photos/80/64?random=12"
                      alt="Ready to Copy Framer Components"
                      width={80}
                      height={64}
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                    Ready to Copy Framer Components
                  </h3>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    Estimation: 2nd February
                  </p>
                  <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
                    Shipped
                  </span>
                </div>
              </div>
            </div>

            {/* Roadmap Item 3 */}
            <div className="p-6 bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-16 bg-pink-100 rounded-lg dark:bg-pink-900/30">
                    <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
                      Lets Sprint!
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                    Stunning Fonts
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estimation: 20th March
                  </p>
                </div>
              </div>
            </div>

            {/* Roadmap Item 4 */}
            <div className="p-6 bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-16 bg-yellow-100 rounded-lg dark:bg-yellow-900/30">
                    <Image
                      src="https://picsum.photos/80/64?random=13"
                      alt="Beautiful Illustration"
                      width={80}
                      height={64}
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                    Beautiful Illustration
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estimation: 15th June
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="mb-2 text-gray-600 dark:text-gray-400">
              And many many more...
            </p>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              So lets be a part of it :)
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-gray-900 rounded-lg dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
              <span className="text-yellow-400">⭐</span>
              Become a Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
