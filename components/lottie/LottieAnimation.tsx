import dynamic from 'next/dynamic'
import type { FC } from 'react'

interface LottieAnimationProps {
  animationData: any
  className?: string
  loop?: boolean
  autoplay?: boolean
}

// 完全客户端渲染的 Lottie 组件
const LottieComponent = dynamic(() => import('./LottieClient'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse" />
})

export const LottieAnimation: FC<LottieAnimationProps> = (props) => {
  return <LottieComponent {...props} />
}
