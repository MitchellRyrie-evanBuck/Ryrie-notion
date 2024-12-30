/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import ky from 'ky'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { ImageResponse } from 'next/og'
import { type PageBlock } from 'notion-types'
import {
  getBlockIcon,
  getBlockTitle,
  getPageProperty,
  isUrl,
  parsePageId
} from 'notion-utils'

import * as libConfig from '@/lib/config'
import interSemiBoldFont from '@/lib/fonts/inter-semibold'

// import playwriteFont from '@/lib/fonts/playwrite'
// import alexBrushFont from '@/lib/fonts/alexbrush'

import { mapImageUrl } from '@/lib/map-image-url'
import { notion } from '@/lib/notion-api'
import { type NotionPageInfo, type PageError } from '@/lib/types'

export const runtime = 'edge'

export default async function OGImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchParams } = new URL(req.url)
  const pageId = parsePageId(
    searchParams.get('id') || libConfig.rootNotionPageId
  )
  if (!pageId) {
    return new Response('Invalid notion page id', { status: 400 })
  }

  const pageInfoOrError = await getNotionPageInfo({ pageId })
  if (pageInfoOrError.type === 'error') {
    return res.status(pageInfoOrError.error.statusCode).send({
      error: pageInfoOrError.error.message
    })
  }
  const pageInfo = pageInfoOrError.data
  console.log(pageInfo)

  return new ImageResponse(
    // 意思是如果一个 div 有多个子元素，必须明确设置 display: flex 或 display: none
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFF',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black'
        }}
      >
        {pageInfo.image && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            src={pageInfo.image}
            style={{
              position: 'absolute',
              width: '560px',
              height: '560px',
              right: '35px',
              top: '35px',
              objectFit: 'cover'
            }}
          />
        )}

        <div
          style={{
            position: 'absolute',
            width: 530,
            height: 425,
            top: 35,
            left: 35,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 700,
          }}
        >
          {pageInfo.title && (
            <div style={{
              fontSize: 36,
              opacity: 1,
              background: 'linear-gradient(135deg, #FF0080 0%, #7928CA 50%, #577DF3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              width: '100%',
              maxWidth: '480px',
              margin: '0 auto',
              padding: '0 20px'
            }}>
              {pageInfo.title}
            </div>
          )}
        </div>

        {pageInfo.authorImage && (
          <div
            style={{
              position: 'absolute',
              bottom: 35,
              left: 35,
              height: 100,
              width: 530,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img
              src={pageInfo.authorImage}
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
              {pageInfo.detail && (
                <div style={{ fontSize: 32, fontWeight: 700, fontFamily: 'Inter' }}>
                  {pageInfo.detail}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      // <div
      //   style={{
      //     width: '1920px',
      //     height: '1080px',
      //     display: 'flex',
      //     flexDirection: 'column',
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //     background: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
      //     padding: '40px',
      //     position: 'relative',
      //     overflow: 'hidden',
      //     fontFamily: 'Inter',
      //   }}
      // >
      //   {/* 背景装饰模糊效果 */}
      //   <div style={{
      //     position: 'absolute',
      //     width: '1200px',
      //     height: '1200px',
      //     background: 'radial-gradient(circle at center, rgba(0, 78, 146, 0.4) 0%, rgba(0, 4, 40, 0) 70%)',
      //     filter: 'blur(120px)',
      //     transform: 'translate(-50%, -50%)',
      //     top: '0%',
      //     left: '0%',
      //   }} />
      //   {/* 背景装饰圆形 */}
      //   <div style={{
      //     position: 'absolute',
      //     width: '1200px',
      //     height: '1200px',
      //     background: 'radial-gradient(circle at center, rgba(0, 78, 146, 0.3) 0%, rgba(0, 4, 40, 0) 80%)',
      //     filter: 'blur(140px)',
      //     transform: 'translate(-30%, -30%)',
      //     bottom: '-20%',
      //     right: '-20%',
      //   }} />
      //   <div style={{
      //     position: 'absolute',
      //     width: '800px',
      //     height: '800px',
      //     background: 'radial-gradient(circle at center, rgba(0, 78, 146, 0.2) 0%, transparent 80%)',
      //     filter: 'blur(100px)',
      //     transform: 'translate(-50%, -50%)',
      //     top: '50%',
      //     left: '50%',
      //   }} />

      //   {/* 主卡片容器 */}
      //   <div style={{
      //     background: 'radial-gradient(circle at center, rgba(146, 0, 78, 0.1) 0%, rgba(86, 41, 53, 0.08) 40%, transparent 90%)',
      //     backdropFilter: 'blur(10px)',
      //     borderRadius: '30px',
      //     border: '1px solid rgba(255, 255, 255, 0.1)',
      //     padding: '60px',
      //     width: '85%',
      //     height: '85%',
      //     display: 'flex',
      //     flexDirection: 'column',
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //     boxShadow: '0 8px 32px 0 rgba(0, 4, 40, 0.37)',
      //     position: 'relative',
      //     mixBlendMode: 'soft-light',
      //   }}>
      //     {/* 卡片内部装饰模糊 */}
      //     <div style={{
      //       position: 'absolute',
      //       width: '600px',
      //       height: '600px',
      //       background: 'radial-gradient(circle at center, rgba(0, 78, 146, 0.2) 0%, rgba(41, 53, 86, 0.15) 30%, rgba(28, 27, 51, 0.1) 50%, rgba(0, 4, 40, 0) 70%)',
      //       filter: 'blur(80px)',
      //       transform: 'translate(30%, -30%)',
      //       top: '40%',
      //       right: '10%',
      //       mixBlendMode: 'soft-light',
      //     }} />

      //     {/* 可以再添加一个互补色调的模糊效果 */}
      //     <div style={{
      //       position: 'absolute',
      //       width: '400px',
      //       height: '400px',
      //       background: 'radial-gradient(circle at center, rgba(146, 0, 78, 0.1) 0%, rgba(86, 41, 53, 0.08) 40%, transparent 90%)',
      //       filter: 'blur(100px)',
      //       transform: 'translate(-50%, -50%)',
      //       top: '60%',
      //       left: '30%',
      //       mixBlendMode: 'overlay',
      //     }} />

      //     {pageInfo.image && (
      //       <img
      //         src={pageInfo.image}
      //         style={{
      //           position: 'absolute',
      //           width: '770px',
      //           height: '770px',
      //           right: '35px',
      //           top: '35px',
      //           objectFit: 'cover'
      //         }}
      //       />
      //     )}

      //     {pageInfo.authorImage && (
      //       <div
      //         style={{
      //           position: 'absolute',
      //           bottom: 35,
      //           left: 35,
      //           height: 100,
      //           width: 530,
      //           display: 'flex',
      //           alignItems: 'center'
      //         }}
      //       >
      //         <img
      //           src={pageInfo.authorImage}
      //           style={{
      //             width: 100,
      //             height: 100,
      //             borderRadius: '50%',
      //             overflow: 'hidden',
      //           }}
      //         />
      //         <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
      //             {pageInfo.author && (
      //             <div style={{ fontSize: 32, fontWeight: 700, fontFamily: 'Inter' }}>
      //                 {pageInfo.author}
      //             </div>
      //           )}
      //         </div>
      //       </div>
      //     )}
      //     <div
      //       style={{
      //         position: 'absolute',
      //         width: 730,
      //         height: 625,
      //         top: 35,
      //         left: 35,
      //         display: 'flex',
      //         flexDirection: 'column',
      //         fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
      //         textAlign: 'center',
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //         fontWeight: 700,
      //         background: '#FFF'
      //       }}
      //     >
      //       {pageInfo.title && (
      //         <div style={{
      //           fontSize: 36,
      //           opacity: 1,
      //           background: 'linear-gradient(135deg, #FF0080 0%, #7928CA 50%, #577DF3 100%)',
      //           WebkitBackgroundClip: 'text',
      //           WebkitTextFillColor: 'transparent',
      //           backgroundClip: 'text',
      //           color: 'transparent',
      //           width: '100%',
      //           maxWidth: '480px',
      //           margin: '0 auto',
      //           padding: '0 20px'
      //         }}>
      //           {pageInfo.title}
      //         </div>
      //       )}
      //     </div>

      //     {/* 底部装饰线 */}
      //     <div style={{
      //       position: 'absolute',
      //       bottom: '40px',
      //       width: '420px',
      //       height: '4px',
      //       background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
      //       borderRadius: '2px',
      //     }} />
      //   </div>
      // </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBoldFont,
          style: 'normal',
          weight: 700
        },
        // {
        //   name: 'Playwrite',
        //   data: playwriteFont,
        //   style: 'normal',
        //   weight: 400,
        // },
        // {
        //   name: 'AlexBrush',
        //   data: alexBrushFont,
        //   style: 'normal',
        //   weight: 400,
        // }
      ]
    }
  )
}

export async function getNotionPageInfo({
  pageId
}: {
  pageId: string
}): Promise<
  | { type: 'success'; data: NotionPageInfo }
  | { type: 'error'; error: PageError }
> {
  const recordMap = await notion.getPage(pageId)

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  if (!block) {
    throw new Error('Invalid recordMap for page')
  }

  const blockSpaceId = block.space_id

  if (
    blockSpaceId &&
    libConfig.rootNotionSpaceId &&
    blockSpaceId !== libConfig.rootNotionSpaceId
  ) {
    return {
      type: 'error',
      error: {
        statusCode: 400,
        message: `Notion page "${pageId}" belongs to a different workspace.`
      }
    }
  }

  const isBlogPost =
    block.type === 'page' && block.parent_table === 'collection'
  const title = getBlockTitle(block, recordMap) || libConfig.name

  const imageCoverPosition =
    (block as PageBlock).format?.page_cover_position ??
    libConfig.defaultPageCoverPosition
  const imageObjectPosition = imageCoverPosition
    ? `center ${(1 - imageCoverPosition) * 100}%`
    : null

  const imageBlockUrl = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
    (block as PageBlock).format?.page_cover,
    block
  )
  const imageFallbackUrl = mapImageUrl(libConfig.defaultPageCover, block)

  const blockIcon = getBlockIcon(block, recordMap)
  const authorImageBlockUrl = mapImageUrl(
    blockIcon && isUrl(blockIcon) ? blockIcon : null,
    block
  )
  const authorImageFallbackUrl = mapImageUrl(libConfig.defaultPageIcon, block)
  const [authorImage, image] = await Promise.all([
    getCompatibleImageUrl(authorImageBlockUrl, authorImageFallbackUrl),
    getCompatibleImageUrl(imageBlockUrl, imageFallbackUrl)
  ])

  const author =
    getPageProperty<string>('Author', block, recordMap) || libConfig.author

  // const socialDescription =
  //   getPageProperty<string>('Description', block, recordMap) ||
  //   libConfig.description

  // const lastUpdatedTime = getPageProperty<number>(
  //   'Last Updated',
  //   block,
  //   recordMap
  // )
  const publishedTime = getPageProperty<number>('Published', block, recordMap)
  const datePublished = publishedTime ? new Date(publishedTime) : undefined
  // const dateUpdated = lastUpdatedTime
  //   ? new Date(lastUpdatedTime)
  //   : publishedTime
  //   ? new Date(publishedTime)
  //   : undefined
  const date =
    isBlogPost && datePublished
      ? `${datePublished.toLocaleString('en-US', {
        month: 'long'
      })} ${datePublished.getFullYear()}`
      : undefined
  const detail = date || author || libConfig.domain

  const pageInfo: NotionPageInfo = {
    pageId,
    title,
    image,
    imageObjectPosition,
    author,
    authorImage,
    detail
  }

  return {
    type: 'success',
    data: pageInfo
  }
}

async function isUrlReachable(url: string | null): Promise<boolean> {
  if (!url) {
    return false
  }

  try {
    await ky.head(url)
    return true
  } catch {
    return false
  }
}

async function getCompatibleImageUrl(
  url: string | null,
  fallbackUrl: string | null
): Promise<string | null> {
  const image = (await isUrlReachable(url)) ? url : fallbackUrl

  if (image) {
    const imageUrl = new URL(image)

    if (imageUrl.host === 'images.unsplash.com') {
      if (!imageUrl.searchParams.has('w')) {
        imageUrl.searchParams.set('w', '1200')
        imageUrl.searchParams.set('fit', 'max')
        return imageUrl.toString()
      }
    }
  }

  return image
}
