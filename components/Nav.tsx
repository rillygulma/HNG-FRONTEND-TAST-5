'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useMobileDetect from '@/hooks/useMobileDetect'
import LogoutButton from './LogoutButton'

type NavProps = {
  activeButton: string
  setActiveButton: React.Dispatch<React.SetStateAction<string>>
}

const Nav = ({ activeButton, setActiveButton }: NavProps) => {
  const isMobile = useMobileDetect()

  return (
    <nav className='flex items-center justify-between p-4 bg-white'>
      <Image
        src={`/images/logo-devlinks-${isMobile ? 'small' : 'large'}.svg`}
        alt='DevLinks Logo'
        className='h-8 w-auto'
        width={100}
        height={100}
      />

      {/* Toggle buttons */}
      <div className={`flex ${!isMobile && 'space-x-4'}`}>
        <button
          className={`px-4 py-2 hover:text-primary.blue ${
            activeButton === 'links'
              ? 'bg-tertiary.blue text-white rounded-lg'
              : 'text-black'
          }`}
          onClick={() => setActiveButton('links')}
        >
          <div className='flex'>
            <Image
              src='/images/icon-links-header.svg'
              alt='Links Icon'
              className='h-6 w-auto'
              width={100}
              height={100}
            />
            {!isMobile && (
              <p className='text-primary.gray pl-2 font-semibold'>Links</p>
            )}
          </div>
        </button>
        <button
          className={`px-4 py-2 ${
            activeButton === 'profile'
              ? 'bg-tertiary.blue text-white rounded-lg'
              : 'text-black'
          }`}
          onClick={() => setActiveButton('profile')}
        >
          <div className='flex'>
            <Image
              src='/images/icon-profile-details-header.svg'
              alt='Profile Details Icon'
              className='h-6 w-auto'
              width={100}
              height={100}
            />
            {!isMobile && (
              <p className='text-primary.gray pl-2 font-semibold'>Profile</p>
            )}
          </div>
        </button>
      </div>

      <div className='flex justify-end space-x-5'>
        <Link
          href='/preview'
          className='px-2 py-1 text-white border-primary.blue rounded-md border-2 hover:bg-tertiary.blue'
        >
          {isMobile ? (
            <Image
              src='/images/icon-preview-header.svg'
              alt='Preview Icon'
              className='h-6 w-auto'
              width={100}
              height={100}
            />
          ) : (
            <p className='text-primary.blue font-semibold px-2 py-1'>Preview</p>
          )}
        </Link>

        <LogoutButton />
      </div>
    </nav>
  )
}

export default Nav
