import { CircleLoading } from './loading/CircleLoading'
import { LoadingIcon } from './loading/LoadingIcon'
import { LoadingTextLottie } from './loading/loadingTextLottie'
import styles from './styles.module.css'

export function Loading() {
  const loadingComponents = [
    <CircleLoading key={1} />,
    <LoadingIcon key={2} />,
    <LoadingTextLottie key={3} />
  ]

  // 生成随机索引
  // const randomIndex = Math.floor(Math.random() * loadingComponents.length)

  return (
    <div className={styles.container}>
      {/* {loadingComponents[randomIndex]} */}
      { loadingComponents[0] }
    </div>
  )
}
