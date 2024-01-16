import { Theme } from '@radix-ui/themes'

import React from 'react'

const RadixContext = ({ children }) => {
  return <Theme>{children}</Theme>
}

export default RadixContext
