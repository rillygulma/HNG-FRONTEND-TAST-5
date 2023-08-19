'use client'

import React, { useState } from 'react'
import Nav from '../../components/Nav'
import Links from '../../components/Links'
import Profile from '../../components/Profile'
import { useSession } from 'next-auth/react'

const Editor = () => {
  // State to manage the active button in the toggle
  const { data: session, status } = useSession()
  const [activeButton, setActiveButton] = useState('links') // 'links' or 'profile'

  console.log(session, status)
  if (status === 'authenticated') {
    console.log(session, status)
  }

  return (
    <>
      <Nav activeButton={activeButton} setActiveButton={setActiveButton} />
      <main className='flex justify-center bg-background w-screen h-full'>
        {activeButton === 'links' && <Links />}
        {activeButton === 'profile' && <Profile />}
      </main>
    </>
  )
}

export default Editor
