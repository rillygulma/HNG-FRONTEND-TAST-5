import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ShareModal = ({ isOpen, onClose, uniqueUrl }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueUrl)
  }

  return (
    isOpen && (
      <div className='modal bg-background flex flex-col items-center p-8 rounded-lg'>
        <button
          onClick={onClose}
          className='bg-tertiary.blue text-white px-4 py-2 rounded-md'
        >
          Close
        </button>
        <p className='mt-4 text-xl text-primary.blue'>Share this link:</p>
        <input
          type='text'
          value={uniqueUrl}
          readOnly
          className='bg-white text-black mt-4 p-2 rounded-md w-3/4 text-center'
        />
        <button
          onClick={copyToClipboard}
          className='bg-primary.blue text-white mt-4 px-4 py-2 rounded-md'
        >
          Copy to Clipboard
        </button>
      </div>
    )
  )
}

export default ShareModal
