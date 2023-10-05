import React from 'react'
import axios from 'axios'
import { getLinks } from '../../../api/getLinks'
import { getUser } from '../../../api/getLinks'
import Image from 'next/image'
import CustomLinkBlock from '@/components/CustomLinkBlock'
import { db } from '../../../../prisma/db.server'

interface Params {
  userLinks: any
  userImage: string
  userName: string
  userEmail: string
}

export async function generateStaticParams() {
  const user = await axios.get('/api/profile')
  const userLinks = user.data.links
  const userImage = user.data.profileImage
  const userName = user.data.username
  const userEmail = user.data.email

  return { userLinks, userImage, userName, userEmail }
}

const DevLinks = async (params: Params) => {
  const { userLinks, userImage, userName, userEmail } =
    await generateStaticParams()

  return (
    <>
      <div className='flex justify-center items-center border-4 border-primary.blue rounded-full h-32 w-32 mt-16'>
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
        {userName || 'Your username here'}
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
          />
        ))}
      </section>
    </>
  )
}

export default DevLinks
