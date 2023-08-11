import React from 'react'
import Image from 'next/image'

type CustomLinkBlockProps = {
  index: number
  link: string
  platform: string
}

const CustomLinkBlock = ({ index, link, platform }: CustomLinkBlockProps) => {
  const color = 'primary.blue'
  const icon = 'icon-linkedin.svg'

  return (
    <article
      className={`flex items-center text-white bg-${color} m-5 w-full h-[4.55rem] rounded-md`}
    >
      <Image
        src={`./images/${icon}`}
        className='z-20 w-10 h-10 ml-4 text-white'
        width={10}
        height={10}
        alt=''
      />
    </article>
  )
}

export default CustomLinkBlock
