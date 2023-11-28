'use client'
import React, { useEffect, useState, useCallback } from 'react'
import Button from '@/components/Button'
import Link from 'next/link'
import Image from 'next/image'
import ShareModal from '@/components/ShareLinkModal'
import axios from 'axios'
import ProfilePreview from '@/components/ProfilePreview'
import toast from 'react-hot-toast'
import { signOut } from 'next-auth/react'
import useMobileDetect from '@/hooks/useMobileDetect'
interface User {
  links: {
    id: string
    url: string
    platform: string
  }[]
  id: string
  platform: string
  userUrl: string
  createdAt: Date
  userId: string
  username: string
  firstname: string
  lastname: string
  email: string
  profileImage: string
  updatedAt: Date
}

const Preview = () => {
  const [hasFetchedWithError, setHasFetchedWithError] = useState(false)
  const [profile, setProfile] = useState<User>({
    links: [],
    id: '',
    platform: '',
    userUrl: '',
    createdAt: new Date(),
    userId: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    profileImage: '',
    updatedAt: new Date(),
  })
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobileDetect()

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    // Fetch data when the component mounts
    const getProfile = async () => {
      try {
        const response = await axios.get('/api/profile')

        if (response.data.error) {
          throw new Error(response.data.error)
        }

        setProfile(response.data)
      } catch (err) {
        if (!hasFetchedWithError) {
          setHasFetchedWithError(true)
          toast.error(
            err.response.data.error || 'An unexpected error occurred.'
          )
        }
      }
    }

    if (hasFetchedWithError) {
      const signOut = () => {
        toast.error('An unexpected error occurred.')
        signOut()
      }
      signOut()
    }

    if (!hasFetchedWithError) {
      getProfile()
    }
  }, [hasFetchedWithError])

  return (
    <main className='flex flex-col justify-start align-middle items-center bg-background w-screen min-h-screen'>
      {!isMobile && (
        <div className='w-full h-1/3 bg-primary.blue absolute rounded-b-3xl top-0 left-0 z-0' />
      )}
      <nav className='flex bg-tertiary.gray rounded-lg desktop:w-[60rem] desktop:mt-1 tablet:w-[40rem] desktop:text-md tablet:mt-2 phone:w-80 phone:px-2 phone:text-sm h-16 items-start space-x-4 z-10 justify-between'>
        <Link
          href='/editor'
          className='bg-transparent text-center hover:bg-tertiary.blue text-primary.blue font-bold border-primary.blue border-2 rounded-md px-4 py-2 mr-4 desktop:w-52 tablet:w-72 self-center' // Added right margin
        >
          Back to Editor
        </Link>
        <button
          className='flex justify-center align-middle bg-primary.blue hover:bg-secondary.blue text-white font-bold border-primary.blue border-2 rounded-md px-4 py-2 desktop:w-52 tablet:w-72 self-center'
          onClick={toggleModal}
        >
          Share Link
        </button>
      </nav>

      {isOpen && (
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          uniqueUrl={profile.userUrl}
        />
      )}
      <div className='mb-6 max-w-[22rem] w-full z-40'>
        <ProfilePreview profile={profile} />
      </div>
    </main>
  )
}

export default Preview
