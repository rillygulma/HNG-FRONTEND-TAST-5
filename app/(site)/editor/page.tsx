'use client'

import React, { useState, useEffect, useRef } from 'react'
import Nav from '@/components/Nav'
import Links from '@/components/Links'
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useTabletDetect from '@/hooks/useTabletDetect'
import useMobileDetect from '@/hooks/useMobileDetect'
import MobilePreview from '@/components/MobilePreview'

interface Link {
  id: string
  url: string
  platform: string
}

interface User {
  username: string
  email: string
  password: string // Please note storing password like this is not secure in a real application
  links: Link[]
}

const Editor = () => {
  // State to manage the active button in the toggle
  const isTablet = useTabletDetect()
  const isMobile = useMobileDetect()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeButton, setActiveButton] = useState('links') // 'links' or 'profile'
  const [links, setLinks] = useState<Link[]>([])
  const gridStyle = isTablet
    ? 'flex flex-col items-center w-auto'
    : 'grid grid-cols-2'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
    if (status === 'authenticated') {
      console.log(session, status)
    }
  }, [session, status])

  return (
    <>
      <Nav activeButton={activeButton} setActiveButton={setActiveButton} />
      <main
        className={`${gridStyle} justify-items-center space-y-2 bg-background min-w-screen pb-10 desktop:px-0 tablet:px-10`}
      >
        {!isTablet && <MobilePreview />}
        {activeButton === 'links' && (
          <Links links={links} setLinks={setLinks} />
        )}
        {activeButton === 'profile' && <Profile />}
      </main>
    </>
  )
}

export default Editor
