import React from 'react'
import Image from 'next/image'
import CustomLinkBlock from './CustomLinkBlock'

const ProfilePreview = ({ profile }) => {
  return (
    <>
      <div className='flex justify-center items-center border-4 border-primary.blue rounded-full h-32 w-32 mt-16'>
        {profile.profileImage && (
          <Image
            src={profile.profileImage}
            alt='Profile Image'
            width={128}
            height={128}
            className='w-auto rounded-full'
          />
        )}
      </div>
      <h1 className='text-4xl mt-4 text-black'>
        <span className='text-primary.blue font-semibold'>{'{'}</span>
        {profile?.username || 'Your username here'}
        <span className='text-primary.blue font-semibold'>{'}'}</span>
      </h1>
      <h3 className='text-xl mt-2 text-black'>
        <span className='text-primary.blue font-semibold'>{'{'}</span>
        {profile?.email || 'Your email here'}
        <span className='text-primary.blue font-semibold'>{'}'}</span>
      </h3>
      <section className='flex flex-col w-72 mt-10 justify-center items-center'>
        {profile.links?.map((link, index) => (
          <CustomLinkBlock
            key={link?.id}
            index={index}
            link={link}
            platform={link.platform}
          />
        ))}
      </section>
    </>
  )
}

export default ProfilePreview
