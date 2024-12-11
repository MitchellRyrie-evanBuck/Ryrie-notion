import { type LottieOptions, useLottie } from 'lottie-react'
import React from 'react'

interface LottieClientProps {
  animationData: any
  className?: string
  loop?: boolean
  autoplay?: boolean
}

const LottieClient: React.FC<LottieClientProps> = ({
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
