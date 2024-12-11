
import Image from 'next/image';
import Link from 'next/link';

import * as config from '@/lib/config'

export function ImgSite() {
  return (
    <div className='h-full' >
      <Link href="/" className="flex justify-center items-center h-full cursor-pointer">
        <Image src={config.defaultPageIcon} alt="logo"
          width={30}
          height={30}
          priority={true}
          className='w-7 h-7 rounded-3xl'
        />
        <div className='ml-2 text-sm'>
          {config.name}
        </div>
      </Link>
    </div>
  )
}

