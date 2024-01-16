'use client'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import AlertCard from '@/components/AlertCard'
interface CredentialsError {
  message: string
  active: boolean
}

export default function Root() {
  const [data, setData] = useState({
    email: '',
    password: '',
    redirect: false,
  })
  const searchParams = useSearchParams()
  const loginError = searchParams.get('error') || null
  const [error, setError] = useState<CredentialsError>({
    message: loginError || '',
    active: false,
  })
  const [demo, setDemo] = useState(true)

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/editor')
    }
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [session, status, router])

  return null
}
