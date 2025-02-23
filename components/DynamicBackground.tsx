import React, { useEffect, useState } from 'react'
import ColorThief from 'colorthief'
import { motion } from 'framer-motion'

interface DynamicBackgroundProps {
  coverImage?: string
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ coverImage }) => {
  const [gradientColors, setGradientColors] = useState<string[]>(['rgba(255,255,255,0.5)', 'rgba(240,240,240,0.5)'])

  useEffect(() => {
    if (!coverImage) {
      console.log('No cover image provided')
      return
    }

    console.log('Cover image URL:', coverImage)
    const colorThief = new ColorThief()
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    
    // 处理 Notion 图片 URL
    const imageUrl = coverImage.startsWith('http') 
      ? coverImage 
      : `https://www.notion.so${coverImage}`
    
    img.src = imageUrl

    img.onload = () => {
      try {
        const palette = colorThief.getPalette(img, 3)
        console.log('Extracted palette:', palette)
        const colors = palette.map(([r, g, b]) => `rgba(${r}, ${g}, ${b}, 0.3)`)
        console.log('Generated gradient colors:', colors)
        setGradientColors(colors)
      } catch (error) {
        console.error('Error extracting colors:', error)
      }
    }

    img.onerror = (error) => {
      console.error('Error loading image:', error)
    }
  }, [coverImage])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
