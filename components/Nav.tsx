'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type NavProps = {
  activeButton: string
  setActiveButton: React.Dispatch<React.SetStateAction<string>>
}

const Nav = ({ activeButton, setActiveButton }: NavProps) => {
  return (
    <nav className='flex items-center justify-between p-4 bg-white'>
      {/* Logo */}
      <Image
        src='./images/logo-devlinks-small.svg'
        alt='DevLinks Logo'
        className='h-8 w-auto'
        width={100}
        height={100}
      />

      {/* Toggle buttons */}
      <div className='flex'>
        <button
          className={`px-4 py-2 ${
            activeButton === 'links'
              ? 'bg-tertiary.blue text-white rounded-lg'
              : 'text-black'
          }`}
          onClick={() => setActiveButton('links')}
        >
          <Image
            src='/images/icon-links-header.svg'
            alt='Links Icon'
            className='h-6 w-auto'
            width={100}
            height={100}
          />
        </button>
        <button
          className={`px-4 py-2 ${
            activeButton === 'profile'
              ? 'bg-tertiary.blue text-white rounded-lg'
              : 'text-black'
          }`}
          onClick={() => setActiveButton('profile')}
        >
          <Image
            src='./images/icon-profile-details-header.svg'
            alt='Profile Details Icon'
            className='h-6 w-auto'
            width={100}
            height={100}
          />
        </button>
      </div>

      {/* Preview button */}
      <Link
        href='/preview'
        className='px-2 py-1 text-white border-primary.blue rounded-md border-2 hover:bg-tertiary.blue'
      >
        <Image
          src='./images/icon-preview-header.svg'
          alt='Preview Icon'
          className='h-6 w-auto'
          width={100}
          height={100}
        />
      </Link>
    </nav>
  )
}

export default Nav
