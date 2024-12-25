
import Image from 'next/image';
import Link from 'next/link';

import * as config from '@/lib/config'
import { motion } from 'framer-motion';

export function ImgSite() {
  return (
    <motion.div
      className='px-2 h-full dark:text-neutral-200'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
    >
      <Link href="/" className="flex justify-center items-center h-full cursor-pointer">
        <Image src={config.defaultPageIcon} alt="logo"
          width={28}
          height={28}
          priority={true}
          className='w-7 h-7 rounded-3xl'
        />
        <div className='ml-2 text-sm'>
          {config.name}
        </div>
      </Link>
    </motion.div>
  )
}

