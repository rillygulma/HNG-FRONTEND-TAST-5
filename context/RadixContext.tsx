import React from 'react'
import { Theme } from '@radix-ui/themes'

interface RadixContextProps {
  children: React.ReactNode
}

const RadixContext: React.FC<RadixContextProps> = ({ children }) => {
  return <Theme>{children}</Theme>
}

export default RadixContext
