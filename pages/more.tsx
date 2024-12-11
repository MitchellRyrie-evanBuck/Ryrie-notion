"use client";

import React from "react";

import { NotionPageHeader } from '@/components/NotionPageHeader'

export default function Custom() {
  return (
    <div className=" h-full min-h-[100vh] bg-white dark:bg-black">
      <NotionPageHeader block={null} />
      <div className="m-auto">
        {
          Array.from({ length: 100 }).map((_, index) => (
            <div key={index}>
              <div className="w-full h-10 bg-gray-200"></div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
