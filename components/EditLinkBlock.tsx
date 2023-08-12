import React from 'react'
import Image from 'next/image'

type LinkBlockProps = {
  index: number
  key: number
}

const LinkBlock = ({ index, key }: LinkBlockProps) => {
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
        <span className='mr-2 pt-0.5 text-primary.gray'>Remove</span>
      </div>
      <div className='px-4 space-y-4'>
        <div>
          <label htmlFor='platform'> Platform</label>
          <select
            name='platform'
            className='w-full px-4 py-2 border rounded-md  text-black placeholder-primary.gray bg-tertiary.gray'
          >
            <option value=''>Select a platform</option>
            <option value=''>Category 1</option>
            <option value=''>Category 2</option>
            <option value=''>Category 3</option>
          </select>
        </div>
        <div>
          <label htmlFor='link'> Link</label>
          <select
            name='link'
            className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
          >
            <option value=''>Select a category</option>
            <option value=''>Category 1</option>
            <option value=''>Category 2</option>
            <option value=''>Category 3</option>
          </select>
        </div>
      </div>
    </article>
  )
}

export default LinkBlock
