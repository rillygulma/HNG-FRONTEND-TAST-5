import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const ForgotPasswordForm = () => {
  const [password, setPassword] = useState('')
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
    <form onSubmit={handleSubmit}>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter your new password'
        required
      />
      <button type='submit'>Reset Password</button>
    </form>
  )
}
export default ForgotPasswordForm
