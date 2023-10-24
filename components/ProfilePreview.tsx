import React from 'react'
import Image from 'next/image'
import CustomLinkBlock from './CustomLinkBlock'

const ProfilePreview = ({ profile, isOverlay = false }) => {
  const shape = isOverlay ? 'w-60 h-[3.75rem]' : 'w-72 h-[4.55rem]'
  const placeholderLink = {
    id: 'placeholder',
    url: '',
    platform: '',
  }
  return (
    <div
      className={`${
        isOverlay
          ? 'w-64 h-full pb-2 mt-10 mx-1 flex flex-col items-center justify-center bg-white'
          : 'flex flex-col items-center justify-center'
      }`}
    >
      <div
        className={`border-4 border-primary.blue rounded-full mt-16 ${
          isOverlay ? 'w-24 h-24' : 'h-32 w-32 '
        }`}
      >
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
      <section
        className={`flex flex-col w-72 mt-10 justify-center items-center ${
          isOverlay ? 'w-60' : ''
        }`}
      >
        {!isOverlay &&
          profile.links?.map((link, index) => (
            <CustomLinkBlock
              key={link?.id}
              index={index}
              link={link}
              platform={link.platform}
              shape={shape}
              isOverlay={isOverlay}
            />
          ))}
        {isOverlay &&
          profile.links.length >= 3 &&
          profile.links.map((link, index) => (
            <CustomLinkBlock
              key={link?.id}
              index={index}
              link={link}
              platform={link?.platform}
              shape={shape}
              isOverlay={isOverlay}
            />
          ))}
        {isOverlay && profile.links.length < 3 && (
          <>
            {profile.links.map((link, index) => (
              <CustomLinkBlock
                key={link?.id}
                index={index}
                link={link}
                platform={link?.platform}
                shape={shape}
                isOverlay={isOverlay}
              />
            ))}

            {Array.from({ length: 3 - profile.links.length }).map(
              (link, index) => (
                <CustomLinkBlock
                  key={`placeholder-${index}`}
                  index={index}
                  link={placeholderLink}
                  platform={''}
                  shape={shape}
                  isOverlay={isOverlay}
                />
              )
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default ProfilePreview