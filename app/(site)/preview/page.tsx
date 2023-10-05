'use client'
import React, { useEffect, useState, useCallback } from 'react'
import Button from '@/components/Button'
import Link from 'next/link'
import Image from 'next/image'
import ShareModal from '@/components/ShareLinkModal'
import axios from 'axios'
import ProfilePreview from '@/components/ProfilePreview'

interface User {
  links: React.JSX.Element[] | undefined
  id: string
  platform: string
  url: string
  createdAt: Date
  userId: string
  username: string
  email: string
  profileImage: string
  updatedAt: Date
}

const Preview = () => {
  const [profile, setProfile] = useState<User>({ links: undefined, user: null })
  const [uniqueUrl, setUniqueUrl] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const renderProfile = useCallback((profile) => {
    return <ProfilePreview profile={profile} />
  }, [])

  useEffect(() => {
    // Fetch data when the component mounts
    const getProfile = async () => {
      const fetchedData = await axios.get('/api/profile')
      setProfile(fetchedData.data)
    }

    getProfile()
  }, [])

  useEffect(() => {
    // Generate the unique URL only when profile is available
    if (profile.username) {
      const url = `${window.location.origin}/${profile.username}`
      setUniqueUrl(url)
    }
  }, [profile])

  const toggleModal = () => {
    console.log('toggling modal...')
    setIsOpen(!isOpen)
  }

  return (
    <main className='flex flex-col justify-start align-middle items-center bg-background w-screen h-screen'>
      <nav className='flex desktop:w-80 phone:w-80 phone:px-2 desktop:text-md phone:text-sm h-16 items-start space-x-4'>
        <Link
          href='/editor'
          className='bg-transparent text-center hover:bg-tertiary.blue text-primary.blue font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4 w-full'
        >
          Back to Editor
        </Link>
        <Button text='Share Link' style='filled' handler={toggleModal} />{' '}
        {/*we need to connect the state to this, to hide and show ShareModal*/}
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
