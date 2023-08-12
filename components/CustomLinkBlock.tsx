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
  const social = 'LinkedIn'

  return (
    <article
      className={`flex items-center justify-between bg-${color} m-5 w-full h-[4.55rem] rounded-md`}
    >
      <div className='flex items-center'>
        <Image
          src={`./images/${icon}`}
          className='z-20 w-10 h-10 ml-4 fill-white'
          width={10}
          height={10}
          alt=''
        />
        <span className='text-xl mt-1 ml-4 font-semibold'>{social}</span>
      </div>
      <div>
        <Image
          src='./images/icon-arrow-right.svg'
          className='z-20 w-7 h-7 pr-0.5 mr-4 fill-white'
          width={10}
          height={10}
          alt=''
        />
      </div>
    </article>
  )
}

export default CustomLinkBlock
