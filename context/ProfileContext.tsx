import React, { createContext, useContext, useState, useCallback } from 'react'
import axios from 'axios'

const ProfileContext = createContext({
  profile: {},
  fetchProfile: () => {},
})

export const useProfile = () => {
  return useContext(ProfileContext)
}

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    links: [],
    id: '',
    platform: '',
    url: '',
    createdAt: new Date(),
    userId: '',
    username: '',
    email: '',
    profileImage: '',
    updatedAt: new Date(),
  })

  const fetchProfile = useCallback(async () => {
    const fetchedData = await axios.get('/api/profile')
    setProfile(fetchedData.data)
  }, [])

  return (
    <ProfileContext.Provider value={{ profile, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider
