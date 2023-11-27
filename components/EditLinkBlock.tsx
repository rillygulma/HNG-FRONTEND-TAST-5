import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Link {
  id: string
  url: string
  platform: string
  error?: string
}

interface LinkBlockProps {
  link: Link
  index: number
  key: string
  id: string
  updateLink: (index: number, link: Link) => void
  removeLink: (index: number) => void
  error?: string
  errorType?: string
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
  | 'codewars'
  | 'codepen'
  | 'freecodecamp'
  | 'gitlab'
  | 'hashnode'
  | 'stackoverflow'
  | 'website'

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
  codewars: 'Codewars',
  codepen: 'Codepen',
  freecodecamp: 'freeCodeCamp',
  gitlab: 'GitLab',
  hashnode: 'Hashnode',
  stackoverflow: 'Stack Overflow',
  website: 'Personal Website',
}

interface BaseUrlMap {
  [platform: string]: string
}

const baseUrlMap: BaseUrlMap = {
  github: 'https://github.com/',
  frontendmentor: 'https://frontendmentor.io/',
  linkedin: 'https://linkedin.com/in/',
  youtube: 'https://youtube.com/',
  facebook: 'https://facebook.com/',
  twitch: 'https://twitch.tv/',
  codewars: 'https://www.codewars.com/users/',
  codepen: 'https://codepen.io/',
  freecodecamp: 'https://www.freecodecamp.org/',
  gitlab: 'https://gitlab.com/',
  hashnode: 'https://hashnode.com/@',
  stackoverflow: 'https://stackoverflow.com/users/',
  x: 'https://twitter.com/',
  website: 'https://your.website.dev',
}

const EditLinkBlock = ({
  link,
  index,
  updateLink,
  removeLink,
  error,
  errorType,
}: LinkBlockProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id })
  const [platform, setPlatform] = useState(link.platform || '')
  const [url, setUrl] = useState(link.url || '')

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handlePlatformChange = (newPlatform: PlatformKeys) => {
    setPlatform(newPlatform)
    // If the new platform has a base URL and the current URL is empty or has the previous base URL, update it
    const base = baseUrlMap[newPlatform] || ''
    if (
      !url ||
      (baseUrlMap[platform] && url.startsWith(baseUrlMap[platform]))
    ) {
      setUrl(base)
    }
  }

  useEffect(() => {
    updateLink(index, { id: link.id, platform, url })
  }, [platform, url])

  const keys = Object.keys(platformOptions) as Array<
    keyof typeof platformOptions
  >

  useEffect(() => {
    console.log(error)
  }, [])

  return (
    <article
      ref={setNodeRef}
      style={style}
      className='text-primary.gray text-sm z-50 bg-background rounded-md h-60 w-full my-4'
      data-testid='edit-link-block'
    >
      <div className='flex justify-between py-4 pb-3 px-3'>
        <div className='flex w-full' data-testid='drag-handle'>
          <Image
            src='./images/icon-drag-and-drop.svg'
            alt=''
            width={22}
            height={22}
            className='my-2 mx-2 pt-0.5'
            {...attributes}
            {...listeners}
          />

          <span className='font-semibold text-primary.gray ml-3 mt-1'>
            Link #{index + 1}
          </span>
        </div>
        <button
          onClick={() => removeLink(index)}
          className='mr-2 pt-0.5 text-primary.gray'
          type='button'
          data-testid='remove-link'
        >
          Remove
        </button>
      </div>
      <div className='pt-1 px-4 space-y-4'>
        <div>
          <label htmlFor='platform'> Platform</label>
          <select
            name='platform'
            className='w-full px-4 py-2 mt-2 border rounded-md  text-black placeholder-primary.gray bg-white'
            value={platform}
            onChange={(e) =>
              handlePlatformChange(e.target.value as PlatformKeys)
            }
          >
            {keys.map((key, i) => (
              <option value={key} key={i}>
                {platformOptions[key]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='link'> Link</label>
          <input
            name='link'
            type='text'
            className={`input-with-icon w-full px-4 pl-10 py-2 mt-2 border rounded-md text-black placeholder-primary.gray bg-white ${
              error ? 'error-container' : null
            }`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {error && <p className='form-validation-error'>{error}</p>}
        </div>
      </div>
    </article>
  )
}

export default EditLinkBlock
