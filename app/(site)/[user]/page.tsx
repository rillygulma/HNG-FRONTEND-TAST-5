import React from 'react'
import axios from 'axios'
import Image from 'next/image'
import CustomLinkBlock from '@/components/CustomLinkBlock'

interface DevLinksProps {
  id: string
  email: string
  username: string
  firstname: string
  lastname: string
  profileImage: string
  links: [
    {
      id: string
      url: string
      platform: string
    }
  ]
}

const DevLinks = async ({ params }: { params: { user: DevLinksProps } }) => {
  const user = params.user
  //console.log(user)

  const { data } = await axios.post('http://localhost:3000/api/devLink', {
    user: user,
  })
  console.log(data.links)

  const userLinks = data?.links || ''
  const userName = data?.username || ''
  const userEmail = data?.email || ''
  const userImage = data?.profileImage || ''
  const name = data?.firstname + ' ' + data?.lastname

  return (
    <div className='flex flex-col bg-background items-center h-screen'>
      <div className='w-full h-1/3 bg-primary.blue absolute rounded-b-3xl top-0 left-0 z-0' />
      <div className='flex flex-col items-center justify-center mt-10 rounded-xl shadow-2xl px-6 pb-4 w-auto bg-white z-10'>
        <div className='border-4 border-primary.blue rounded-full h-32 w-32 mt-16'>
          {userImage && (
            <Image
              src={userImage}
              alt='Profile Image'
              width={128}
              height={128}
              className='w-auto rounded-full'
            />
          )}
        </div>
        <h1 className='text-4xl mt-4 text-black'>
          <span className='text-primary.blue font-semibold'>{'{'}</span>
          {name || userName || 'Your username here'}
          <span className='text-primary.blue font-semibold'>{'}'}</span>
        </h1>
        <h3 className='text-xl mt-2 text-black'>
          <span className='text-primary.blue font-semibold'>{'{'}</span>
          {userEmail || 'Your email here'}
          <span className='text-primary.blue font-semibold'>{'}'}</span>
        </h3>
        <section className='flex flex-col w-72 mt-10 justify-center items-center'>
          {userLinks?.map((link, index) => (
            <CustomLinkBlock
              key={link?.id}
              index={index}
              link={link}
              platform={link.platform}
              shape='w-72 h-[4.55rem]'
              isOverlay={false}
            />
          ))}
        </section>
      </div>
    </div>
  )
}

export default DevLinks
