'use client' // Error components must be Client Components

import { useEffect } from 'react'
import AlertCard from '@/components/AlertCard'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <AlertCard type='error'>
      <h1 className='text-2xl font-bold text-black mb-6'>Error</h1>
      <p className='text-black mb-6'>
        An error occurred while trying to access this page.
      </p>
      <p className='text-black mb-6'>Please try again later.</p>
      <button onClick={reset} className='btn btn-primary'>
        Try again
      </button>
    </AlertCard>
  )
}
