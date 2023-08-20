'use client'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'

export default function SignIn() {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const loginUser = async (e) => {
    e.preventDefault()
    console.log('login function runs')
    signIn('credentials', {
      ...data,
      callbackUrl: '/editor',
    }).then(() => alert('login successful'))
  }

  const test = () => {
    console.log('test submission')
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-background'>
      <div className='w-full max-w-md desktop:mb-0 phone:mb-16'>
        <div className='flex items-center justify-center mb-6 phone:aboslute phone:top-10'>
          <Image
            src='./images/logo-devlinks-large.svg'
            alt='Devlinks Logo'
            width={200}
            height={200}
            className='mb-1'
          />
        </div>

        <div className='p-6 pb-8 mx-6 phone:mx-2'>
          <h1 className='text-2xl font-bold text-black mb-6'>Login</h1>
          <form action='' onSubmit={loginUser}>
            <div className='mb-4'>
              <label
                className='block text-sm font-medium text-black mb-2'
                htmlFor='username'
              >
                Email
              </label>
              <input
                className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
                id='username'
                type='text'
                placeholder='Enter your username'
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div className='mb-4'>
              <label
                className='block text-sm font-medium text-black mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
                id='password'
                type='password'
                placeholder='Enter your password'
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>

            <button
              type='submit'
              className='w-full py-2 px-4 bg-primary.blue text-white font-bold rounded-md hover:bg-secondary.blue'
            >
              Login
            </button>
          </form>
          <div className='flex mt-4 justify-center flex-wrap'>
            <span className='text-black'>Don&apos;t have an account?</span>
            <Link
              href='/register'
              className='desktop:block phone:flex phone:flex-nowrap justify-center ml-2 text-primary.blue hover:text-secondary.blue'
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
