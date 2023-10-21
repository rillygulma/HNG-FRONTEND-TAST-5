import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CustomLinkBlockProps {
  index: number
  link: {
    id: string
    url: string
    platform: string
  }
  platform: string
  shape: string | null
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

const CustomLinkBlock = ({
  index,
  link,
  platform,
  shape = 'w-72 h-[4.55rem]',
}: CustomLinkBlockProps) => {
  const social = platform.toLowerCase().replace(/\s+/g, '')

  const platformColors: Record<PlatformKeys, string> = Object.freeze({
    facebook: 'facebook-bg',
    x: 'x-bg',
    linkedin: 'linkedin-bg',
    instagram: 'instagram-bg',
    frontendmentor: 'frontendmentor-bg',
    codewars: 'codewars-bg',
    codepen: 'codepen-bg',
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
    codepen: 'CodePen',
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

  const getPlatform = (platform: string) => {
    return platforms[platform as PlatformKeys]
  }

  console.log(link.url)

  return (
    <div
      className={`flex items-center justify-between ${getPlatformStyle(
        social
      )} m-5 ${shape} rounded-md`}
    >
      <Link
        href={link.url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center justify-between w-full'
      >
        <div className='flex items-center'>
          <Image
            src={`/images/${getIcon(social)}`}
            className='z-20 w-10 h-10 ml-4 fill-white'
            width={10}
            height={10}
            alt=''
          />
          <span className='text-xl mt-0.5 ml-4 font-semibold'>
            {getPlatform(platform)}
          </span>
        </div>
        <Image
          src='/images/icon-arrow-right.svg'
          className='z-20 w-7 h-7 pr-0.5 mr-4 mt-0.5 fill-white'
          width={10}
          height={10}
          alt=''
        />
      </Link>
    </div>
  )
}

export default CustomLinkBlock
