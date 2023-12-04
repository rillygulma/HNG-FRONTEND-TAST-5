import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  uniqueUrl: string
}

const ShareModal = ({ isOpen, onClose, uniqueUrl }: ShareModalProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueUrl)
    toast.success('Link copied to clipboard.')
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    isOpen && (
      <div className='bg-white flex py-2 rounded-lg w-auto desktop:w-[30rem] tablet:w-[32rem] phone:w-[24rem] top-20 absolute shadow-lg z-50'>
        <button onClick={onClose} className='px-4 py-2 rounded-md'>
          <svg
            className='w-6 h-6 text-primary.blue'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
          </svg>
        </button>

        <input
          type='text'
          value={uniqueUrl}
          readOnly
          className='bg-white text-black my-2 p-2 rounded-md w-3/4 text-center'
        />
        <button
          onClick={copyToClipboard}
          className='px-4 py-2 ml-1 rounded-md hover:bg-tertiary.blue hover:rounded-sm'
        >
          <svg
            className='w-6 h-6 text-primary.blue'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 18 20'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m7.708 2.292.706-.706A2 2 0 0 1 9.828 1h6.239A.97.97 0 0 1 17 2v12a.97.97 0 0 1-.933 1H15M6 5v4a1 1 0 0 1-1 1H1m11-4v12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 5h5.239A.97.97 0 0 1 12 6Z'
            />
          </svg>
        </button>
      </div>
    )
  )
}

export default ShareModal
