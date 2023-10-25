'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import ToasterContext from '@/context/ToastContext'

interface Props {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ToasterContext />
      {children}
    </SessionProvider>
  )
}

export default Providers
