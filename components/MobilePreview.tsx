import React from 'react'
import Image from 'next/image'
import ProfilePreview from '@/components/ProfilePreview'

const MobilePreview = ({ profile }) => {
  console.log(profile.links)
  return (
    <div className='col-span-1 mt-10 p-2'>
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
