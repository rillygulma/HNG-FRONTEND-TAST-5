import React from 'react'
import Image from 'next/image'
import ProfilePreview from '@/components/ProfilePreview'

const MobilePreview = ({ profile, preview, isLoading }) => {
  const { firstname, lastname } = profile
  console.log(firstname, lastname)

  return (
    <div className='flex flex-col col-span-1 mt-10 p-2 relative'>
      <Image
        src='/images/illustration-phone-mockup.svg'
        alt='Profile Image'
        width={128}
        height={128}
        className='w-auto'
      />
      <div className='absolute z-10 flex flex-col items-center justify-center ml-6 max-h-[48rem] rounded-md overflow-y-auto overflow-x-hidden'>
        <ProfilePreview
          profile={profile}
          isOverlay={true}
          preview={preview}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default MobilePreview
