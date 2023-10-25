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
interface User {
  links: React.JSX.Element[] | undefined
  id: string
  platform: string
  url: string
  createdAt: Date
  userId: string
  username: string
  firstName: string
  lastName: string
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
    url: '',
    createdAt: new Date(),
    userId: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
    updatedAt: new Date(),
  })
  const [uniqueUrl, setUniqueUrl] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const renderProfile = useCallback((profile) => {
    return <ProfilePreview profile={profile} />
  }, [])

  const toggleModal = () => {
    console.log('toggling modal...')
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
      signOut()
    }

    if (!hasFetchedWithError) {
      getProfile()
    }
  }, [hasFetchedWithError])

  return (
    <main className='flex flex-col justify-start align-middle items-center bg-background w-screen h-screen'>
      <nav className='flex desktop:w-80 phone:w-80 phone:px-2 desktop:text-md phone:text-sm h-16 items-start space-x-4'>
        <Link
          href='/editor'
          className='bg-transparent text-center hover:bg-tertiary.blue text-primary.blue font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4 w-full'
        >
          Back to Editor
        </Link>
        <Button text='Share Link' style='filled' handler={toggleModal} />
      </nav>
      {isOpen && (
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          uniqueUrl={uniqueUrl}
        />
      )}
      {renderProfile(profile)}
    </main>
  )
}

export default Preview
