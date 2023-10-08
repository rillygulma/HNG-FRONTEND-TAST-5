import React from 'react'
import Image from 'next/image'

const MobilePreview = () => {
  return (
    <div className='col-span-1'>
      <Image
        src='/images/illustration-phone-mockup.svg'
        alt='Profile Image'
        width={128}
        height={128}
        className='w-auto'
      />
    </div>
  )
}

export default MobilePreview
