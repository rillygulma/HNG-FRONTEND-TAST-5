'use client'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function Register() {
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: '',
    passwordMatch: '',
    username: '',
  })
  const [error, setError] = useState('Something went wrong')
  const [errorType, setErrorType] = useState('TOAST_ERROR')

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if (data.password !== data.passwordMatch) {
      setError('Passwords do not match.')
      setErrorType('PASSWORD')
      return
    }

    axios
      .post('/api/auth/register', data)
      .then(() => {
        toast.success('User registered successfully')
        router.push('/signin') // Only redirect if successful
      })
      .catch((err) => {
        const localErrorType = err.response.data.errorType
        const localError = err.response.data.error
        console.error(localErrorType, localError)

        if (
          localErrorType === 'EMAIL' ||
          localErrorType === 'PASSWORD' ||
          localErrorType === 'USERNAME'
        ) {
          setErrorType(localErrorType)
          setError(localError)
          setData({
            ...data,
            email: '',
            password: '',
          })
        }

        if (localErrorType === 'REDIRECT') {
          router.push('/signin')
        } else if (localErrorType === 'TOAST_ERROR') {
          toast.error(localError)
        }
      })
  }

  return (
    <>
      <h1 className='text-2xl font-bold text-black mb-6'>Register</h1>
      <form action='' onSubmit={registerUser}>
        <div className='mb-4'>
          <div className='mb-4'>
            <label
              className='block text-sm font-medium text-black mb-2'
              htmlFor='password'
            >
              Username
            </label>
            <input
              className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
              id='username'
              type='username'
              placeholder='Enter your username'
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
            {errorType === 'USERNAME' && (
              <p className='form-validation-error'>{error}</p>
            )}
          </div>
          <div className='mb-4 relative'>
            <label
              className='block text-sm font-medium text-black mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Image
                  src='./images/icon-email.svg'
                  alt='Email'
                  width={20}
                  height={20}
                />
              </div>
              <input
                className={`pl-11 w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray ${
                  errorType === 'EMAIL' ? 'error-container' : ''
                }`}
                id='email'
                type='email' // Changed type to 'email' for proper validation
                placeholder='Enter your email'
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                required
              />
            </div>
            {errorType === 'EMAIL' && (
              <p className='form-validation-error'>{error}</p>
            )}
          </div>
        </div>
        <div className='mb-4 relative'>
          <label
            className='block text-sm font-medium text-black mb-2'
            htmlFor='password'
          >
            Create password
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Image
                src='./images/icon-password.svg' // Make sure this path is correct
                alt='Password'
                width={20}
                height={20}
              />
            </div>
            <input
              className={`w-full pl-11 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray ${
                errorType === 'PASSWORD' ? 'error-container' : ''
              }`}
              id='password'
              type='password'
              placeholder='At least 8 characters'
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          {errorType === 'PASSWORD' && (
            <p className='form-validation-error'>{error}</p>
          )}
        </div>
        <div className='mb-6 relative'>
          <label
            className='block text-sm font-medium text-black mb-2'
            htmlFor='password'
          >
            Confirm password
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Image
                src='./images/icon-password.svg' // Make sure this path is correct
                alt='Password'
                width={20}
                height={20}
              />
            </div>
            <input
              className={`w-full pl-11 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray ${
                errorType === 'PASSWORD' ? 'error-container' : ''
              }`}
              id='passwordMatch'
              type='password'
              placeholder='At least 8 characters'
              onChange={(e) =>
                setData({ ...data, passwordMatch: e.target.value })
              }
              required
            />
          </div>
          {errorType === 'PASSWORD' && (
            <p className='form-validation-error'>{error}</p>
          )}
        </div>

        <button
          type='submit'
          className='w-full py-2 px-4 bg-primary.blue text-white font-bold rounded-md hover:bg-secondary.blue'
        >
          Register
        </button>
      </form>
      <div className='flex mt-4 justify-center flex-wrap'>
        <span className='text-black'>Already have an account?</span>
        <Link
          href='/signin'
          className='desktop:block phone:flex phone:flex-nowrap justify-center ml-2 text-primary.blue hover:text-secondary.blue'
        >
          Login.
        </Link>
      </div>
    </>
  )
}
