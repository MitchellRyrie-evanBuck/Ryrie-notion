import cs from 'classnames'
import dynamic from 'next/dynamic'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type PageBlock } from 'notion-types'
import {
  formatDate,
  getBlockTitle,
  getPageProperty,
  normalizeTitle,
  parsePageId
} from 'notion-utils'
import * as React from 'react'
import BodyClassName from 'react-body-classname'
import {
  type NotionComponents,
  NotionRenderer,
  useNotionContext
} from 'react-notion-x'
import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from 'react-tweet'
import { useSearchParam } from 'react-use'
import { removeHyphenAndJoin } from '@/lib/utils/string-utils'

import type * as types from '@/lib/types'
import * as config from '@/lib/config'
import { mapImageUrl } from '@/lib/map-image-url'
import { getCanonicalPageUrl, mapPageUrl } from '@/lib/map-page-url'
import { searchNotion } from '@/lib/search-notion'
import { useDarkMode } from '@/lib/use-dark-mode'

import { Footer } from './Footer'
// import { GitHubShareButton } from './GitHubShareButton'
import { Loading } from './Loading'
import { NotionPageHeader } from './NotionPageHeader'
import { Page404 } from './Page404'
import { PageAside } from './PageAside'
import { PageHead } from './PageHead'
import styles from './styles.module.css'
// import { GitHubShareButton } from './GitHubShareButton'
import { ActionHome } from './layout/ActionHome'
import { RyrieFooter } from './ryrie/RyrieFooter'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedCard } from './AnimatedCard'
import { DynamicBackground } from './DynamicBackground'

const Comment = dynamic(
  () => import('@/components/Comment'),
  { ssr: false }
);
// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // add / remove any prism syntaxes here
    await Promise.allSettled([
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-c.js'),
      import('prismjs/components/prism-cpp.js'),
      import('prismjs/components/prism-csharp.js'),
      import('prismjs/components/prism-docker.js'),
      import('prismjs/components/prism-java.js'),
      import('prismjs/components/prism-js-templates.js'),
      import('prismjs/components/prism-coffeescript.js'),
      import('prismjs/components/prism-diff.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-go.js'),
      import('prismjs/components/prism-graphql.js'),
      import('prismjs/components/prism-handlebars.js'),
      import('prismjs/components/prism-less.js'),
      import('prismjs/components/prism-makefile.js'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-objectivec.js'),
      import('prismjs/components/prism-ocaml.js'),
      import('prismjs/components/prism-python.js'),
      import('prismjs/components/prism-reason.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-sass.js'),
      import('prismjs/components/prism-scss.js'),
      import('prismjs/components/prism-solidity.js'),
      import('prismjs/components/prism-sql.js'),
      import('prismjs/components/prism-stylus.js'),
      import('prismjs/components/prism-swift.js'),
      import('prismjs/components/prism-wasm.js'),
      import('prismjs/components/prism-yaml.js'),
      import('prismjs/components/prism-glsl.js')
    ])
    return m.Code
  })
)

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => {
      function CollectionWrapper(props: {
        block: any;
        className?: string;
        ctx: any;
        collection: any;
        collectionView: any;
        collectionData: any;
      }) {
        const { collectionView } = props
        if (collectionView) {
          collectionView.type = 'gallery'
          if (!collectionView.format) {
            collectionView.format = {}
          }
          collectionView.format.gallery_cover_size = "medium"
          collectionView.format.gallery_cover_aspect = "contain"
          collectionView.format.gallery_properties = collectionView.format.gallery_properties || []
          collectionView.format.gallery_cover = true
          collectionView.format.columns = 2
        }
        return <m.Collection {...props} />
      }
      return CollectionWrapper
    }
  )
)

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => {
      m.Modal.setAppElement('.notion-viewport')
      return m.Modal
    }),
  {
    ssr: false
  }
)

function Tweet({ id }: { id: string }) {
  const { recordMap } = useNotionContext()
  const tweet = (recordMap as types.ExtendedTweetRecordMap)?.tweets?.[id]

  return (
    <React.Suspense fallback={<TweetSkeleton />}>
      {tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />}
    </React.Suspense>
  )
}

const propertyLastEditedTimeValue = (
  { block, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && block?.last_edited_time) {
    return `Last updated ${formatDate(block?.last_edited_time, {
      month: 'long'
    })}`
  }

  return defaultFn()
}

const propertyDateValue = (
  { data, schema, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'published') {
    const publishDate = data?.[0]?.[1]?.[0]?.[1]?.start_date

    if (publishDate) {
      return `${formatDate(publishDate, {
        month: 'long'
      })}`
    }
  }

  return defaultFn()
}

const propertyTextValue = (
  { schema, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'author') {
    return <b>{defaultFn()}</b>
  }

  return defaultFn()
}

const propertySelectValue = (
  { schema, value, key, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  value = normalizeTitle(value)

  if (pageHeader && schema.type === 'multi_select' && value) {
    return (
      <Link href={`/tags/${value}`} key={key}>
        {defaultFn()}
      </Link>
    )
  }

  return defaultFn()
}

const HeroHeader = dynamic<{ className?: string }>(
  () => import('./AboutHeader').then((m) => m.BackgroundGradientAnimationDemo),
  { ssr: false }
)

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
}

export function NotionPage({
  site,
  recordMap,
  error,
  pageId,
  tagsPage,
  propertyToFilterName
}: types.PageProps) {
  const router = useRouter()
  const lite = useSearchParam('lite')

  const components = React.useMemo<Partial<NotionComponents>>(
    () => ({
      nextLegacyImage: Image,
      nextLink: Link,
      Code,
      Collection,
      Equation,
      Pdf,
      Modal,
      Tweet,
      Header: NotionPageHeader,
      propertyLastEditedTimeValue,
      propertyTextValue,
      propertyDateValue,
      propertySelectValue
    }),
    []
  )

  // lite mode is for oembed
  const isLiteMode = lite === 'true'

  const { isDarkMode } = useDarkMode()

  const siteMapPageUrl = React.useMemo(() => {
    const params: any = {}
    if (lite) params.lite = lite

    const searchParams = new URLSearchParams(params)
    return mapPageUrl(site, recordMap, searchParams)
  }, [site, recordMap, lite])

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  const isRootPage =
    parsePageId(block?.id) === parsePageId(site?.rootNotionPageId)
  const isBlogPost =
    block?.type === 'page' && block?.parent_table === 'collection'
  const isBioPage = parsePageId(block?.id) === config.rootNotionAboutPageId
  const showTableOfContents = !!isBlogPost
  const minTableOfContentsItems = 3

  const pageAside = React.useMemo(
    () => (
      <PageAside block={block} recordMap={recordMap} isBlogPost={isBlogPost} />
    ),
    [block, recordMap, isBlogPost]
  )

  const footer = React.useMemo(() => <Footer />, [])

  const pageCover = React.useMemo(() => {
    if (isBioPage) {
      return (
        <HeroHeader className='notion-page-cover-wrapper notion-page-cover-hero' />
      )
    } else {
      return null
    }
  }, [isBioPage])

  if (router.isFallback) {
    return <Loading />
  }

  if (error || !site || !block) {
    return <Page404 site={site} pageId={pageId} error={error} />
  }

  const name = getBlockTitle(block, recordMap) || site.name
  const title =
    tagsPage && propertyToFilterName ? `${propertyToFilterName} ${name}` : name


  console.log('notion page', {
    isDev: config.isDev,
    title,
    pageId,
    rootNotionPageId: site.rootNotionPageId,
    recordMap
  })

  if (!config.isServer) {
    // add important objects to the window global for easy debugging
    const g = window as any
    g.pageId = pageId
    g.recordMap = recordMap
    g.block = block
  }

  const canonicalPageUrl =
    !config.isDev && getCanonicalPageUrl(site, recordMap)(pageId)

  const socialImage = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
      (block as PageBlock).format?.page_cover ||
      config.defaultPageCover,
    block
  )

  const socialDescription =
    getPageProperty<string>('Description', block, recordMap) ||
    config.description

  console.log('black', block)
  const postFooter =
    block?.parent_table === 'collection' ? (
      <RyrieFooter />
    ) : undefined
  console.log('postFooter', postFooter)

  // const postComments = config.isCommentsEnabled ? (
  //   <Comments frontMatter={frontMatter} />
  // ) : null

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
    >
      <DynamicBackground coverImage={mapImageUrl(block?.format?.page_cover || '', block)} />
      <PageHead
        pageId={pageId}
        site={site}
        title={title}
        description={socialDescription}
        image={socialImage}
        url={canonicalPageUrl}
      />

      {isLiteMode && <BodyClassName className='notion-lite' />}
      {isDarkMode && <BodyClassName className='dark-mode' />}

      <div className={cs('notion', styles.notion)}>
        <NotionRenderer
          bodyClassName={cs(
            styles.notion,
            'index-page',
            isRootPage ? 'root-page' : 'other-page',
            // tagsPage && 'tags-page'
          )}
          darkMode={isDarkMode}
          components={components}
          recordMap={recordMap}
          rootPageId={site.rootNotionPageId}
          rootDomain={site.domain}
          fullPage={!isLiteMode}
          previewImages={!!recordMap.preview_images}
          showCollectionViewDropdown={false}
          showTableOfContents={showTableOfContents}
          minTableOfContentsItems={minTableOfContentsItems}
          defaultPageIcon={config.defaultPageIcon}
          defaultPageCover={config.defaultPageCover}
          defaultPageCoverPosition={config.defaultPageCoverPosition}
          linkTableTitleProperties={false}
          mapPageUrl={siteMapPageUrl}
          mapImageUrl={mapImageUrl}
          searchNotion={config.isSearchEnabled ? searchNotion : null}
          pageAside={pageAside}
          pageFooter={
            <>
              {block?.parent_table === 'collection' && <Comment />}
              {postFooter}
            </>
          }
          footer={footer}
          pageTitle={tagsPage && propertyToFilterName ? title : undefined}
          pageCover={pageCover}

        />
      </div>
      {/* <GitHubShareButton /> */}
      {config.rootNotionPageId !== removeHyphenAndJoin(pageId) && <ActionHome />}
    </motion.div>
  )
}
