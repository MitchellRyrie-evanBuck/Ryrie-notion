import React from "react";
import { motion } from "framer-motion";
import { PageHead } from '@/components/PageHead';
import { NotionPageHeader } from '@/components/NotionPageHeader';

export default function MorePage() {
  return (
    <>
      <PageHead
        title="敬请期待 | Ryrie"
        description="更多精彩内容即将上线，敬请期待！"
      />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="w-full">
          <NotionPageHeader block={null} />
        </div>
        <div className="flex flex-1 justify-center items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.17)' }}
            className="flex flex-col items-center p-12 w-full max-w-md rounded-3xl border shadow-2xl backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-white/30"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mb-6"
            >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="url(#paint0_linear)" />
                <g>
                  <path d="M24 16h16M24 48h16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M24 16c0 8 8 8 8 16s-8 8-8 16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M40 16c0 8-8 8-8 16s8 8 8 16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                  <ellipse cx="32" cy="32" rx="3" ry="1.5" fill="#fff" fillOpacity=".7"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#bae6fd" />
                    <stop offset="0.5" stopColor="#ddd6fe" />
                    <stop offset="1" stopColor="#fbcfe8" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <h1 className="mb-2 text-3xl font-extrabold text-center text-gray-900 drop-shadow-lg dark:text-white">敬请期待</h1>
            <p className="mb-2 text-lg text-center text-gray-700 dark:text-gray-200">更多精彩内容即将上线</p>
            <span className="text-sm text-gray-400">Stay tuned for more!</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}
