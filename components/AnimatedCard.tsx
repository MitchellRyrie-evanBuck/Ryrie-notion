import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/legacy/image';
import React from 'react';

interface AnimatedCardProps {
  id: string;
  href: string;
  title: string;
  coverImage: string;
  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  id,
  href,
  title,
  coverImage,
  className
}) => {
  return (
    <Link href={href} passHref>
      <motion.div
        layoutId={`notion-${id}`}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30
        }}
      >
        <motion.div layoutId={`notion-image-${id}`}>
          <Image
            src={coverImage}
            alt={title}
            width={700}
            height={400}
            className="rounded-lg"
          />
        </motion.div>
        <motion.h2
          layoutId={`notion-title-${id}`}
          className="mt-4 text-xl font-semibold"
        >
          {title}
        </motion.h2>
      </motion.div>
    </Link>
  );
};
