import animationData from 'public/lottie/loading-lottie.json'

import { LottieAnimation } from '@/components/lottie/LottieAnimation'

export function LoadingTextLottie() {
  return (
    <LottieAnimation
      animationData={animationData}
      className="w-64 h-64" // 自定义大小
      loop={true}
      autoplay={true}
    />
  )
}
