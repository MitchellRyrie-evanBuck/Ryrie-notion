import { type Block } from 'notion-types'
import { defaultMapImageUrl } from 'notion-utils'

import { defaultPageCover, defaultPageIcon } from './config'

export const mapImageUrl = (url: string | undefined, block: Block) => {
  // if (!url) return url
  console.log('mapImageUrl', url)
  if (url === defaultPageCover || url === defaultPageIcon) {
    return url
  }

  return defaultMapImageUrl(url, block)
}
