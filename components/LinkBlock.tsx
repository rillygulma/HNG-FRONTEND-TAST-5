import React from 'react'
import Image from 'next/image'

const LinkBlock = ({ index }) => {
  return (
    <article className='text-primary.gray text-sm z-50 bg-blue-50 rounded-md h-52 w-full my-4'>
      <div className='flex justify-between py-4 px-2'>
        <div className=' flex w-full'>
          <Image
            src='./images/icon-drag-and-drop.svg'
            alt=''
            width={16}
            height={16}
            className='my-2 mx-2'
          />

          <span className='font-semibold text-primary.gray ml-2'>
            Link #{index + 1}
          </span>
        </div>
        <span className='mr-2 text-primary.gray'>Remove</span>
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
