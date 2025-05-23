import * as React from 'react'

import * as config from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

/**
 * @ryrie: Added comments system powered by Giscus
 * TODO: could make this configurable in the future.
 */
export const RyrieComments: React.FC = () => {
  const { isDarkMode } = useDarkMode()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    const giscusScript = document.createElement('script')
    giscusScript.src = 'https://giscus.app/client.js'
    giscusScript.dataset.repo = 'www.ryrie.ink'
    giscusScript.dataset.repoId = 'R_kgDOId_ODg'
    giscusScript.dataset.category = 'Posts'
    giscusScript.dataset.categoryId = 'DIC_kwDOId_ODs4CUre0'
    giscusScript.dataset.mapping = 'pathname'
    giscusScript.dataset.strict = '1'
    giscusScript.dataset.reactionsEnabled = '0'
    giscusScript.dataset.emitMetadata = '0'
    giscusScript.dataset.inputPosition = 'top'
    giscusScript.dataset.theme = `${config.host}/giscus/${isDarkMode ? 'dark' : 'light'}.css`
    giscusScript.dataset.lang = 'en'
    giscusScript.dataset.loading = 'lazy'
    giscusScript.setAttribute('crossorigin', 'anonymous')
    giscusScript.setAttribute('async', 'true')
    document.body.append(giscusScript)
    return () => {
      giscusScript.remove()
    }
  }, [])

  return <div className='giscus'></div>
}
