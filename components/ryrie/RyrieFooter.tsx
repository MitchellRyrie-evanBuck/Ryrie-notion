/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import * as config from '@/lib/config'

import { site } from '@/lib/config'
import Image from 'next/image'
// import { ApplauseButton } from './ApplauseButton'

/**
 * @ryrie: Added my own personal footer
 */
export function RyrieFooter() {
  return (
    <div className='ryrie-post-footer'>
      <div className='wustep-post-footer-left'>
        <a href={`https://${site.domain}`}>
          <img src='/ryrie.png'
          className='w-16 h-16 rounded-full'
          alt='Ryrie'></img>
        </a>
      </div>
      <div className='ml-4 ryrie-post-footer-content'>
        <div className='ryrie-post-footer-content-author'>Ryrie</div>
        🚀 Building software in Beijing, CN
      </div>
      {/* Sadly applause is no longer working w/o self-hosting. See https://github.com/ColinEberhardt/applause-button/issues/101
          Disabling for now until working again.
      <div className='ryrie-post-footer-right'>
        <ApplauseButton />
      </div>
      */}
    </div>
  )
}
