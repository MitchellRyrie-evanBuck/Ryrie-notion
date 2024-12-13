import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoHome } from "react-icons/io5";

export function ActionHome() {
  return (
    <motion.div
      className="fixed left-6 top-1/2 z-50 -translate-y-1/2"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <Link href="/" passHref>
        <motion.div
          className="flex justify-center items-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer dark:bg-zinc-800 hover:shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <IoHome className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
        </motion.div>
      </Link>
    </motion.div>
  );
}