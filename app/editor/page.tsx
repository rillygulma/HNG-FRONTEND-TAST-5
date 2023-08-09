'use client'

import React, { useState } from 'react'
import Nav from '../../components/Nav'
import Links from '../../components/Links'
import Profile from '../../components/Profile'

const Editor = () => {
  // State to manage the active button in the toggle
  const [activeButton, setActiveButton] = useState('links') // 'links' or 'profile'

  return (
    <>
      <Nav activeButton={activeButton} setActiveButton={setActiveButton} />
      <main className='flex justify-center bg-background w-screen h-screen'>
        {activeButton === 'links' && <Links />}
        {activeButton === 'profile' && <Profile />}
      </main>
    </>
  )
}

export default Editor
