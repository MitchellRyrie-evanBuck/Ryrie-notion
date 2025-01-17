import React from 'react'
import Image from 'next/image'

export  function MockupIMack({
  className,
  ...props
}) {
  return (
    <div className={`relative ${className}`}>
      <div className={`overflow-hidden relative m-auto mt-0 w-full h-full max-w-[1138px]`} >
        <Image
          src="/customize/screen-body.png"
          alt="IMack"
          width={1140}
          height={822}
          className="w-full h-auto"
        />
        <div
          className="absolute top-[14px] left-[14px] w-full h-full grid max-w-[1110px] "
        >
          <Image
            src="/customize/screen.png"
            alt="IMack"
            width={1110}
            height={627}
            className="absolute w-full h-auto"
          />
          {/* video or photo*/}
          <div></div>
        </div>
        <Image
          src="/customize/screen-nav.png"
          alt="IMack"
          width={1140}
          height={822}
          className="absolute top-0 left-0 w-full h-auto"
        />
        {/* Time */}
        <div
          className='absolute top-[2.04%] right-[2%] whitespace-nowrap'
          style={{
            fontSize: '5.2px',
            letterSpacing: '-0.2px',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", FeyCalibre, sans-serif;',
            fontVariantNumeric: 'lining-nums tabular-nums',
            color: 'rgb(255, 255, 255)',
          }}
        >
          Tue Jan 14 &nbsp;&nbsp;11:15 PM
        </div>
      </div>
    </div>
  )
}
