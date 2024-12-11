import { type LottieOptions , useLottie } from 'lottie-react'

interface LottieAnimationProps {
  animationData: any
  className?: string
  loop?: boolean
  autoplay?: boolean
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
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
