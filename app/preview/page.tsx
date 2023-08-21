import React from 'react'
import Button from '../../components/Button'
import Link from 'next/link'
import { getLinks } from '../api/getLinks'
import { getUser } from '../api/getLinks'

import { db } from '../../prisma/db.server'

const Preview = () => {
  const links = getLinks(db, 'matt.omalley.west@gmail.com', 'testpassword')
  const user = getUser(db, 'matt.omalley.west@gmail.com', 'testpassword')

  console.log(user)

  return (
    <main className='flex flex-col justify-start align-middle items-center bg-background w-screen h-screen'>
      <nav className='flex desktop:w-80 phone:w-80 phone:px-2 desktop:text-md phone:text-sm h-16 items-start space-x-4'>
        <Link
          href='/editor'
          className='bg-transparent text-center hover:bg-tertiary.blue text-primary.blue font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4 w-full'
        >
          Back to Editor
        </Link>
        <Button text='Share Link' style='filled' />
      </nav>

      <div className='flex justify-center items-center border-4 border-primary.blue rounded-full h-32 w-32 mt-16' />
      <h1 className='text-4xl mt-4 text-black'>
        <span className='text-primary.blue font-semibold'>{'{'}</span>
        Name
        <span className='text-primary.blue font-semibold'>{'}'}</span>
      </h1>
      <h3 className='text-xl mt-2 text-black'>
        <span className='text-primary.blue font-semibold'>{'{'}</span>Email
        <span className='text-primary.blue font-semibold'>{'}'}</span>
      </h3>
      <section className='flex flex-col w-72 mt-10 justify-center items-center'>
        {links}
      </section>
    </main>
  )
}

export default Preview
