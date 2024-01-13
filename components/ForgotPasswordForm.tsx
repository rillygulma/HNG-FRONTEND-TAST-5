'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface ForgotPasswordProps {}

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()
  if (router?.query) {
    const { token } = router.query
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/resetPassword', { token, password })
      router.push('/editor')
    } catch (error) {
      // Handle errors
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 text-primary.gray'>
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
