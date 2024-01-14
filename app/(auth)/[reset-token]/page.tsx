import { useState } from 'react'
import { useRouter } from 'next/router'

const ResetPassword = () => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const resetToken = router.query.resetToken as string

  const handleResetPassword = () => {
    // Perform password reset logic here using the resetToken and password state values
    // ...

    // Redirect the user to a success page
    router.push('/signin')
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <input
        type='password'
        placeholder='New Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type='password'
        placeholder='Confirm New Password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  )
}

export default ResetPassword
