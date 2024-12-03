import { type Block } from 'notion-types'
import { defaultMapImageUrl } from 'notion-utils'

import { defaultPageCover, defaultPageIcon } from './config'

export const mapImageUrl = (url: string | undefined, block: Block) => {
  if (!url) return url

  if (url === defaultPageCover || url === defaultPageIcon) {
    return url
  }

  // Handle custom emoji URLs
  if (url.includes('notion://custom_emoji')) {
    return url.replace('notion://custom_emoji', 'https://www.notion.so/image/notion%3A%2F%2Fcustom_emoji')
  }

  return defaultMapImageUrl(url, block)
}
