import React from 'react'
import LinkBlock from './LinkBlock'
;<svg
  class='w-6 h-6 text-gray-800 dark:text-white'
  aria-hidden='true'
  xmlns='http://www.w3.org/2000/svg'
  fill='none'
  viewBox='0 0 16 12'
>
  <path
    stroke='currentColor'
    stroke-linecap='round'
    stroke-linejoin='round'
    stroke-width='2'
    d='M1 5.917 5.724 10.5 15 1.5'
  />
</svg>

const Links = () => {
  const testArr = Array.from({ length: 3 }) as Array<string>
  console.log(testArr.length)

  return (
    <section className='flex flex-col justify-start mb-10 z-20 bg-white text-black px-4 pt-2 mt-10 phone:w-72 phone:h-full rounded-md'>
      <h1 className='py-4'>Customize your links</h1>

      <p className='text-sm text-gray-500'>
        Add, edit, or remove links below, then share your collated links.
      </p>
      <button className='bg-transparent hover:bg-tertiary.blue text-primary.blue font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4'>
        <span className='text-lg'>+</span> Add Link
      </button>
      <form action='' className='w-full mb-4'>
        <div className='space-y-6'>
          {testArr.map((link, index) => {
            return <LinkBlock index={index} key={index} />
          })}
        </div>
        <button
          type='submit'
          className='flex justify-start bg-primary.blue hover:bg-tertiary.blue text-white font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4 w-full'
        >
          <div className='w-full tertiary.gray mr-4'>
            <svg
              className=' inline-block align-middle w-5 h-5 mx-4 text-tertiary.gray dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 16 12'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 5.917 5.724 10.5 15 1.5'
              />
            </svg>
            Save Links
          </div>
        </button>
      </form>
    </section>
  )
}

export default Links
