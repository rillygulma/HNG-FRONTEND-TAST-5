'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Nav from '@/components/Nav'
import Links from '@/components/Links'
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useTabletDetect from '@/hooks/useTabletDetect'
import useMobileDetect from '@/hooks/useMobileDetect'
import MobilePreview from '@/components/MobilePreview'
import ProfilePreview from '@/components/ProfilePreview'
import toast from 'react-hot-toast'
import { signOut } from 'next-auth/react'
import axios from 'axios'
interface Link {
  id: string
  url: string
  platform: string
}

interface User {
  links: React.JSX.Element[] | undefined
  id: string
  platform: string
  url: string
  createdAt: Date
  userId: string
  username: string
  firstname: string
  lastname: string
  email: string
  profileImage: string
  updatedAt: Date
}

const Editor = () => {
  // State to manage the active button in the toggle
  const isTablet = useTabletDetect()
  const { data: session, status } = useSession()
  const [hasFetchedWithError, setHasFetchedWithError] = useState(false)

  const router = useRouter()
  const [activeButton, setActiveButton] = useState('links') // 'links' or 'profile'
  const [preview, setPreview] = useState<Object | null>(null)
  const [profile, setProfile] = useState<User>({
    links: [],
    id: '',
    platform: '',
    url: '',
    createdAt: new Date(),
    userId: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    profileImage: '',
    updatedAt: new Date(),
  })

  const gridStyle = isTablet
    ? 'flex flex-col items-center w-auto'
    : 'grid grid-cols-2 '

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
    if (status === 'authenticated') {
      console.log(session, status)
    }
  }, [session, status])

  useEffect(() => {
    // Fetch data when the component mounts
    const getProfile = async () => {
      try {
        const response = await axios.get('/api/profile')

        if (response.data.error) {
          throw new Error(response.data.error)
        }

        setProfile(response.data)
      } catch (err: any) {
        if (!hasFetchedWithError) {
          setHasFetchedWithError(true)
          toast.error(
            err.response.data.error || 'An unexpected error occurred.'
          )
        }
      }
    }

    if (!hasFetchedWithError) {
      getProfile()
    }
  }, [hasFetchedWithError])

  return (
    <>
      <Nav activeButton={activeButton} setActiveButton={setActiveButton} />
      <main
        className={`${gridStyle} justify-items-center space-y-2 bg-background max-h-screen pb-10 desktop:px-0 tablet:px-10`}
      >
        {!isTablet && <MobilePreview profile={profile} preview={preview} />}
        {activeButton === 'links' && (
          <div className='flex flex-col pb-32 mr-10'>
            <Links profile={profile} setProfile={setProfile} />
          </div>
        )}
        {activeButton === 'profile' && (
          <Profile
            profile={profile}
            setProfile={setProfile}
            preview={preview}
            setPreview={setPreview}
          />
        )}
      </main>
    </>
  )
}

export default Editor
