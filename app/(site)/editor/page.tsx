'use client'

import React, { useState, useEffect, useRef } from 'react'
import Nav from '@/components/Nav'
import Links from '@/components/Links'
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useMobileDetect from '@/hooks/useMobileDetect'
import MobilePreview from '@/components/MobilePreview'

const Editor = () => {
  // State to manage the active button in the toggle
  const isMobile = useMobileDetect()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeButton, setActiveButton] = useState('links') // 'links' or 'profile'
  const gridStyle = isMobile ? 'flex flex-col items-center' : 'grid grid-cols-2'

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
        className={`${gridStyle} justify-items-center space-y-2 bg-background w-screen min-h-screen`}
      >
        {!isMobile && <MobilePreview />}
        {activeButton === 'links' && <Links />}
        {activeButton === 'profile' && <Profile />}
      </main>
    </>
  )
}

export default Editor
