import React from 'react'

interface AddLinkProps {
  addLink: () => void
}

const AddLinkButton = ({ addLink }: AddLinkProps) => {
  return (
    <button
      onClick={addLink}
      className='bg-transparent hover:bg-tertiary.blue text-primary.blue font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4'
    >
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
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 1v16M1 9h16'
          />
        </svg>{' '}
        Add Link
      </div>
    </button>
  )
}

export default AddLinkButton
