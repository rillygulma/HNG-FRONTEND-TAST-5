import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type CustomLinkBlockProps = {
  index: number
  link: string
  platform: string
}

type PlatformKeys =
  | 'facebook'
  | 'x'
  | 'linkedin'
  | 'instagram'
  | 'frontendmentor'
  | 'codewars'
  | 'freecodecamp'
  | 'twitch'
  | 'youtube'
  | 'github'
  | 'website'

const CustomLinkBlock = ({ index, link, platform }: CustomLinkBlockProps) => {
  const color = 'primary.blue'
  const icon = 'icon-linkedin.svg'
  const social = platform.toLowerCase().replace(/\s+/g, '')

  const platformColors: Record<PlatformKeys, string> = Object.freeze({
    facebook: 'facebook-bg',
    x: 'x-bg',
    linkedin: 'linkedin-bg',
    instagram: 'instagram-bg',
    frontendmentor: 'frontendmentor-bg',
    codewars: 'codewars-bg',
    freecodecamp: 'freecodecamp-bg',
    twitch: 'twitch-bg',
    youtube: 'youtube-bg',
    github: 'github-bg',
    website: 'website-bg',
  })

  const platforms: Record<PlatformKeys, string> = Object.freeze({
    facebook: 'Facebook',
    x: 'X',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    frontendmentor: 'Frontend Mentor',
    codewars: 'Codewars',
    freecodecamp: 'FreeCodeCamp',
    twitch: 'Twitch',
    youtube: 'YouTube',
    github: 'GitHub',
    website: 'Website',
  })

  const getPlatformStyle = (social: string) => {
    return platformColors[social as PlatformKeys]
  }

  const getIcon = (social: string) => {
    return `icon-${social}.svg`
  }

  console.log(social)

  return (
    <article
      className={`flex items-center justify-between ${getPlatformStyle(
        social
      )} m-5 w-full h-[4.55rem] rounded-md`}
    >
      <Link
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center justify-between w-full'
      >
        <div className='flex items-center'>
          <Image
            src={`./images/${getIcon(social)}`}
            className='z-20 w-10 h-10 ml-4 fill-white'
            width={10}
            height={10}
            alt=''
          />
          <span className='text-lg mt-1 ml-6 font-semibold'>{platform}</span>
        </div>
        <Image
          src='./images/icon-arrow-right.svg'
          className='z-20 w-7 h-7 pr-0.5 mr-4 mt-0.5 fill-white'
          width={10}
          height={10}
          alt=''
        />
      </Link>
    </article>
  )
}

export default CustomLinkBlock
