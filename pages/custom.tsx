"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { NotionPageHeader } from '@/components/NotionPageHeader'

export default function Custom() {
  return (
    <div className="mt-10 h-full min-h-[100vh] bg-white dark:bg-black">
      <div className="m-auto ">
        <NotionPageHeader block={null} />
      </div>
    </div>
  );
}
