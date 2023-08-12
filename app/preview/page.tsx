import React from 'react'
import Button from '../../components/Button'
import CustomLinkBlock from '../../components/CustomLinkBlock'
import Link from 'next/link'

const Preview = () => {
  const testArr = Array.from({ length: 3 }) as Array<string>

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
        <span className='text-primary.blue font-semibold'>{'{'}</span>Name
        <span className='text-primary.blue font-semibold'>{'}'}</span>
      </h1>
      <h3 className='text-xl mt-2 text-black'>
        <span className='text-primary.blue font-semibold'>{'{'}</span>Email
        <span className='text-primary.blue font-semibold'>{'}'}</span>
      </h3>
      <section className='flex flex-col w-72 mt-10 justify-center items-center'>
        {testArr &&
          testArr.map((link, index) => {
            return <CustomLinkBlock key={index} index={index} link={link} />
          })}
      </section>
    </main>
  )
}

export default Preview
