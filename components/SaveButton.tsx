import React from 'react'
import useMobileDetect from '@/hooks/useMobileDetect'

const SaveButton = () => {
  const isMobile = useMobileDetect()

  return (
    <button
      type='submit'
      className={`flex bg-primary.blue hover:bg-secondary.blue text-white font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4 w-32 ${
        isMobile && 'w-full'
      } `}
    >
      <div className='w-full tertiary.gray'>
        {isMobile && (
          <svg
            className=' inline-block align-middle w-4 h-4 mx-3 mb-0.5 text-tertiary.gray dark:text-white'
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
        )}
        Save
      </div>
    </button>
  )
}

export default SaveButton
