import dynamic from 'next/dynamic'
import React from 'react'

interface LottieAnimationProps {
  animationData: any
  className?: string
  loop?: boolean
  autoplay?: boolean
}

// 完全客户端渲染的 Lottie 组件
const LottieComponent = dynamic(() => import('./LottieClient'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-full w-full" />
})

export const LottieAnimation: React.FC<LottieAnimationProps> = (props) => {
  return <LottieComponent {...props} />
}
