import type { LottieOptions } from 'lottie-react'
import { useLottie } from 'lottie-react'
import type { FC } from 'react'

interface LottieClientProps {
  animationData: any
  className?: string
  loop?: boolean
  autoplay?: boolean
}

const LottieClient: FC<LottieClientProps> = ({
  animationData,
  className = '',
  loop = true,
  autoplay = true
}) => {
  const options: LottieOptions = {
    animationData,
    loop,
    autoplay
  }

  const { View } = useLottie(options)

  return <div className={className}>{View}</div>
}

export default LottieClient
