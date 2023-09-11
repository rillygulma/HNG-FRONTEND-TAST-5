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

const EditLinkBlock = ({
  link,
  index,
  updateLink,
  removeLink,
}: LinkBlockProps) => {
  const [platform, setPlatform] = useState(link.platform)
  const [url, setUrl] = useState(link.url)

  useEffect(() => {
    updateLink(index, { id: link.id, platform, url })
  }, [platform, url])

  return (
    <article className='text-primary.gray text-sm z-50 bg-background rounded-md h-56 w-full my-4'>
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
      <div className='px-4 space-y-4'>
        <div>
          <label htmlFor='platform'> Platform</label>
          <select
            name='platform'
            className='w-full px-4 py-2 border rounded-md  text-black placeholder-primary.gray bg-tertiary.gray'
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value=''>Select a platform</option>
            <option value=''>GitHub</option>
            <option value=''>Frontend Mentor</option>
            <option value=''>X</option>
            <option value=''>LinkedIn</option>
            <option value=''>YouTube</option>
            <option value=''>Facebook</option>
            <option value=''>Twitch</option>
            <option value=''>Dev.to</option>
            <option value=''>Codewars</option>
            <option value=''>Codepen</option>
            <option value=''>freeCodeCamp</option>
            <option value=''>GitLab</option>
            <option value=''>Hashnode</option>
            <option value=''>Stack Overflow</option>
          </select>
        </div>
        <div>
          <label htmlFor='link'> Link</label>
          <input
            name='link'
            type='url'
            className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>
    </article>
  )
}

export default EditLinkBlock
