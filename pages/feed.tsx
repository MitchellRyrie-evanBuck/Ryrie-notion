import type { GetServerSideProps } from 'next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { type ExtendedRecordMap } from 'notion-types'
import {
  getBlockParentPage,
  getBlockTitle,
  getPageProperty,
  idToUuid
} from 'notion-utils'
import RSS from 'rss'
import { NotionAPI } from 'notion-client'
import { renderToString } from 'react-dom/server'
import { NotionRenderer } from 'react-notion-x'

import * as config from '@/lib/config'
import { getSiteMap } from '@/lib/get-site-map'
import { getSocialImageUrl } from '@/lib/get-social-image-url'
import { getCanonicalPageUrl } from '@/lib/map-page-url'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'text/plain')
    res.end('Method Not Allowed')
    return { props: {} }
  }

  // Handle RSS feed authentication challenge
  const followChallenge = ( req as NextApiRequest).query?.follow_challenge
  if (followChallenge) {
    const response = {
      follow_challenge: {
        feed_id: "92574118675283968",
        user_id: "56705839927698432"
      }
    }

    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(response))
    res.end()
    return { props: {} }
  }

  const siteMap = await getSiteMap()
  const ttlMinutes = 180
  const ttlSeconds = ttlMinutes * 60

  const feed = new RSS({
    title: config.name,
    site_url: config.host,
    feed_url: `https://${config.host}/feed.xml`,
    language: config.language,
    ttl: ttlMinutes,
    description: `feedId:92574118675283968+userId:56705839927698432`
  })

  for (const pagePath of Object.keys(siteMap.canonicalPageMap)) {
    const pageId = siteMap.canonicalPageMap[pagePath]
    const recordMap = siteMap.pageMap[pageId] as ExtendedRecordMap
    if (!recordMap) continue

    const keys = Object.keys(recordMap?.block || {})
    const block = recordMap?.block?.[keys[0]]?.value
    if (!block) continue

    const parentPage = getBlockParentPage(block, recordMap)
    const isBlogPost =
      block.type === 'page' &&
      block.parent_table === 'collection' &&
      parentPage?.id === idToUuid(config.rootNotionPageId)
    if (!isBlogPost) {
      continue
    }

    const title = getBlockTitle(block, recordMap) || config.name
    const description =
      getPageProperty<string>('Description', block, recordMap) ||
      config.description
    const url = getCanonicalPageUrl(config.site, recordMap)(pageId)
    const lastUpdatedTime = getPageProperty<number>(
      'Last Updated',
      block,
      recordMap
    )
    const publishedTime = getPageProperty<number>('Published', block, recordMap)
    const date = lastUpdatedTime
      ? new Date(lastUpdatedTime)
      : publishedTime
        ? new Date(publishedTime)
        : undefined
    const socialImageUrl = getSocialImageUrl(pageId)

    // 使用 NotionRenderer 渲染页面内容
    const pageContent = renderToString(
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        disableHeader={true}
      />
    )

    feed.item({
      title,
      url,
      date,
      description,
      custom_elements: [
        { 'content:encoded': { _cdata: pageContent } }
      ],
      enclosure: socialImageUrl
        ? {
            url: socialImageUrl,
            type: 'image/jpeg'
          }
        : undefined
    })
  }

  const feedText = feed.xml({ indent: true })

  res.setHeader(
    'Cache-Control',
    `public, max-age=${ttlSeconds}, stale-while-revalidate=${ttlSeconds}`
  )
  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.write(feedText)
  res.end()

  return { props: {} }
}

export default function noop() {
  return null
}
