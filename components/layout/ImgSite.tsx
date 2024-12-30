
import Image from 'next/image';
import Link from 'next/link';

import * as config from '@/lib/config'
import { motion } from 'framer-motion';
import cs from 'classnames'


export function ImgSite() {
  return (
    <motion.div
      className={cs('breadcrumbs')}
      style={{ height: '32px', overflow: 'hidden' }}
    >
      <Link href="/" className={cs('breadcrumb', 'button','h-full', 'flex', 'justify-center', 'items-center',  'cursor-pointer')} >
        <Image src={config.defaultPageIcon} alt="logo"
          width={22}
          height={22}
          priority={true}
          className='w-5.5 h-5.5 rounded-3xl'
        />
        <div className='ml-2 text-sm'
          style={{
            fontFamily: 'logoBrush',
          }}
        >
          {config.name}
        </div>
      </Link>
    </motion.div>
  )
}

