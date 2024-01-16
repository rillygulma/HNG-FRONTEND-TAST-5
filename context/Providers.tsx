'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import ToasterContext from '@/context/ToastContext'
import RadixContext from '@/context/RadixContext'

interface Props {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <RadixContext>
        <ToasterContext />
        {children}
      </RadixContext>
    </SessionProvider>
  )
}

export default Providers
