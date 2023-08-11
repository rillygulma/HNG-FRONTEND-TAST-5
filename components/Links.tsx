import React from 'react'
import LinkBlock from './LinkBlock'
import SaveButton from './SaveButton'

const Links = () => {
  const testArr = Array.from({ length: 3 }) as Array<string>
  console.log(testArr.length)

  return (
    <section className='flex flex-col justify-start mb-10 z-20 bg-white text-black px-4 pt-2 mt-8 phone:w-80 phone:h-full rounded-md'>
      <h1 className='py-4'>Customize your links</h1>

      <p className='text-sm text-gray-500'>
        Add, edit, or remove links below, then share your collated links.
      </p>
      <button className='bg-transparent hover:bg-tertiary.blue text-primary.blue font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4'>
        <div className='w-full pr-2'>
          <svg
            className='inline-block align-middle w-4 h-4 mx-2 mb-0.5 text-blue dark:text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 18 18'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M9 1v16M1 9h16'
            />
          </svg>{' '}
          Add Link
        </div>
      </button>
      <form action='' className='w-full mb-4'>
        <div className='space-y-6'>
          {testArr.map((link, index) => {
            return <LinkBlock index={index} key={index} />
          })}
        </div>
        <SaveButton />
      </form>
    </section>
  )
}

export default Links
