'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface User {
  links: React.JSX.Element[] | undefined
  user:
    | ({
        links: {
          id: string
          platform: string
          url: string
          createdAt: Date
          updatedAt: Date
          userId: string
        }[]
      } & {
        id: string
        email: string
        profileImage: string
        username: string | null
        updatedAt: Date
      })
    | null
}

const ShareModal = () => {
  const [profile, setProfile] = useState<User>({ links: undefined, user: null })
  const [uniqueUrl, setUniqueUrl] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    // Fetch data when component mounts
    const getProfile = async () => {
      const fetchedData = await axios.get('/api/profile')
      const { links, user } = fetchedData.data
      setProfile(fetchedData.data)
    }
    const getUniqueUrl = () => {
      const url = `${window.location.origin}/${profile.user?.username}`
      setUniqueUrl(url)
    }

    getUniqueUrl()
    getProfile()
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueUrl)
  }

  return (
    isOpen && (
      <div className='modal'>
        <button onClick={onClose}>Close</button>
        <p>Share this link:</p>
        <input type='text' value={uniqueUrl} readOnly />
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>
    )
  )
}

export default ShareModal
