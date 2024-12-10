import type * as types from 'notion-types'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import { motion } from 'framer-motion'
import * as React from 'react'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'
import Link from "next/link";

import styles from './styles.module.css'

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
      className={`${cs(!hasMounted && styles.hidden, )} px-2 cursor-pointer`}
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
        {block && <Breadcrumbs block={block} rootOnly={false} />}

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
                  <motion.div>
                    <components.Link
                      href={link.url}
                      key={index}
                      className={cs(styles.navLink, )}
                    >
                    {link.title}
                    </components.Link>
                  </motion.div>
                )
              }
            })
            .filter(Boolean)}

          <Link href="/custom" className="">
            <motion.div
              className={`h-full px-2`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              layout
            >
              <span >Me</span>
            </motion.div>
          </Link>

          <ToggleThemeButton />

          {isSearchEnabled && block && <Search block={block} title={null} />}
        </div>
      </div>
    </motion.header>
  )
}
