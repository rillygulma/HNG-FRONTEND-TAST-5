'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import ToasterContext from '@/context/ToastContext'
import ProfileContext from '@/context/ProfileContext'
interface Props {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ProfileContext>
        <ToasterContext />
        {children}
      </ProfileContext>
    </SessionProvider>
  )
}

export default Providers
