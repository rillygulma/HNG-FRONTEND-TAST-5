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
  isOverlay: boolean
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
  | 'stackoverflow'
  | 'hashnode'
  | 'gitlab'
  | 'website'

const CustomLinkBlock = ({
  index,
  link,
  platform,
  shape = 'w-72 h-[4.55rem]',
  isOverlay,
}: CustomLinkBlockProps) => {
  const social = platform?.toLowerCase().replace(/\s+/g, '')

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
    stackoverflow: 'stackoverflow-bg',
    hashnode: 'hashnode-bg',
    gitlab: 'gitlab-bg',

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
    freecodecamp: 'freeCodeCamp',
    twitch: 'Twitch',
    youtube: 'YouTube',
    github: 'GitHub',
    stackoverflow: 'Stack Overflow',
    hashnode: 'Hashnode',
    gitlab: 'GitLab',

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

  return (
    <div
      className={`flex items-center justify-between ${
        platform ? getPlatformStyle(social) : 'bg-secondary.gray'
      } ${(platform === 'x' || platform === 'website') && 'text-black'} ${
        isOverlay ? 'm-2 text-md' : 'm-5 text-xl'
      } ${shape} rounded-md`}
      data-testid={`custom-link-block-#${index}`}
    >
      <Link
        href={link ? link.url : null}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center justify-between w-full'
      >
        <div className='flex items-center'>
          {platform && (
            <Image
              src={`/images/${getIcon(social)}`}
              className='z-20 w-8 h-8 ml-4 fill-white'
              width={10}
              height={10}
              alt=''
            />
          )}
          <span className=' mt-0.5 ml-4 font-light'>
            {getPlatform(platform)}
          </span>
        </div>
        {platform && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='10'
            height='10'
            fill='white'
            className={`z-20 w-6 h-6 pr-0.5 mr-4 mt-0.5 ${
              platform === 'x' || platform === 'website'
                ? 'fill-current text-black'
                : ''
            }`}
            viewBox='0 0 16 16'
          >
            <path
              fill='fill-current'
              d='M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z'
            />
          </svg>
        )}
      </Link>
    </div>
  )
}

export default CustomLinkBlock
