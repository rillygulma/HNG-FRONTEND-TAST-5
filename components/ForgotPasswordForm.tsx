'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleForgotPw = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleForgotPw} className='space-y-6 text-primary.gray'>
      <p>
        Enter your account email. If valid, a reset link will be sent to the
        address.
      </p>
      <input
        className='w-full px-4 py-2 border rounded-md text-gray-700 bg-white shadow-sm'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email.'
        required
      />
      <button
        type='submit'
        className='w-full py-[0.82rem] px-4 bg-primary.blue text-white font-bold rounded-md hover:bg-secondary.blue'
      >
        Reset Password
      </button>
    </form>
  )
}
export default ForgotPasswordForm
