import type * as types from 'notion-types'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import { motion } from 'framer-motion'
import Link from "next/link";
import * as React from 'react'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle, rootNotionPageId } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import { ImgSite } from './layout/ImgSite'
import styles from './styles.module.css'

import { removeHyphenAndJoin } from "@/lib/utils/string-utils";

function ToggleThemeButton() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <motion.div
      whileHover={{ scale: 1.4 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`${cs(!hasMounted && styles.hidden,)} px-2 cursor-pointer`}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </motion.div>
  )
}

export function NotionPageHeader({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) {
  const { components, mapPageUrl } = useNotionContext()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <motion.header
      className='notion-header'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className='notion-nav-header'>
        {block && removeHyphenAndJoin(block.id) !== rootNotionPageId && <Breadcrumbs block={block} rootOnly={false} />}
        {block && removeHyphenAndJoin(block.id) === rootNotionPageId && <ImgSite />}
        {!block && <ImgSite />}

        <div className='notion-nav-header-rhs breadcrumbs'>
          {navigationLinks
            ?.map((link, index) => {
              if (!link.pageId && !link.url) {
                return null
              }

              if (link.pageId) {
                return (
                  <motion.div
                    className='px-2'
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    key={index}
                  >
                    <components.PageLink
                      href={mapPageUrl(link.pageId)}
                      key={index}
                      className={`${cs(styles.navLink)} `}
                    >
                      {link.title}
                    </components.PageLink>
                  </motion.div>
                )
              } else {
                return (
                  <motion.div
                    key={index}
                  >
                    <components.Link
                      href={link.url}
                      key={index}
                      className={cs(styles.navLink,)}
                    >
                      {link.title}
                    </components.Link>
                  </motion.div>
                )
              }
            })
            .filter(Boolean)}

          <Link href="/more" className="">
            <motion.div
              className={`px-2 h-full`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              layout
            >
              <span >More</span>
            </motion.div>
          </Link>

          <ToggleThemeButton />

          {isSearchEnabled && block && <Search block={block} title={null} />}
        </div>
      </div>
    </motion.header>
  )
}
