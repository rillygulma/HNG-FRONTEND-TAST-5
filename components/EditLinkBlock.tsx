import React, { useState, useEffect } from 'react'
import Image from 'next/image'
interface Link {
  id: string
  url: string
  platform: string
}

type LinkBlockProps = {
  link: Link
  index: number
  key?: number
  updateLink: (index: number, link: Link) => void
  removeLink: (index: number) => void
}

type PlatformKeys =
  | 'default'
  | 'github'
  | 'frontendmentor'
  | 'x'
  | 'linkedin'
  | 'youtube'
  | 'facebook'
  | 'twitch'
  | 'devto'
  | 'codewars'
  | 'codepen'
  | 'freecodecamp'
  | 'gitlab'
  | 'hashnode'
  | 'stackoverflow'

type PlatformOptions = {
  [K in PlatformKeys]: string
}

const platformOptions: PlatformOptions = {
  default: 'Select a platform',
  github: 'GitHub',
  frontendmentor: 'Frontend Mentor',
  x: 'X',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  facebook: 'Facebook',
  twitch: 'Twitch',
  devto: 'Dev.to',
  codewars: 'Codewars',
  codepen: 'Codepen',
  freecodecamp: 'freeCodeCamp',
  gitlab: 'GitLab',
  hashnode: 'Hashnode',
  stackoverflow: 'Stack Overflow',
}

const EditLinkBlock = ({
  link,
  index,
  updateLink,
  removeLink,
}: LinkBlockProps) => {
  const [platform, setPlatform] = useState(link.platform || '')
  const [url, setUrl] = useState(link.url || '')

  useEffect(() => {
    updateLink(index, { id: link.id, platform, url })
  }, [platform, url])

  const keys = Object.keys(platformOptions) as Array<
    keyof typeof platformOptions
  >

  return (
    <article className='text-primary.gray text-sm z-50 bg-background rounded-md h-60 w-full my-4'>
      <div className='flex justify-between py-4 px-3'>
        <div className=' flex w-full'>
          <Image
            src='./images/icon-drag-and-drop.svg'
            alt=''
            width={22}
            height={22}
            className='my-2 mx-2 pt-0.5'
          />

          <span className='font-semibold text-primary.gray ml-3 mt-1'>
            Link #{index + 1}
          </span>
        </div>
        <button
          onClick={() => removeLink(index)}
          className='mr-2 pt-0.5 text-primary.gray'
          type='button'
        >
          Remove
        </button>
      </div>
      <div className='px-4 space-y-5'>
        <div>
          <label htmlFor='platform'> Platform</label>
          <select
            name='platform'
            className='w-full px-4 py-2 mt-2 border rounded-md  text-black placeholder-primary.gray bg-white'
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            {keys.map((key, i) => (
              <option value={key} key={i}>
                <Image
                  src={`./images/icon-${key}.svg`}
                  width={22}
                  height={22}
                  alt=''
                />
                {platformOptions[key]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='link'> Link</label>
          <input
            name='link'
            type='url'
            className='input-with-icon w-full px-4 pl-10 py-2 mt-2 border rounded-md text-black placeholder-primary.gray bg-white'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>
    </article>
  )
}

export default EditLinkBlock
