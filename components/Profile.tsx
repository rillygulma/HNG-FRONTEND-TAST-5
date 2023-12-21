import React, { useState, useEffect } from 'react'
import SaveButton from './SaveButton'
import ImageDropzone from './ImageDropzone'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import useMobileDetect from '../hooks/useMobileDetect'

interface ValidError extends Error {
  error: string
  errorType: string
}

interface Link {
  id: string
  url: string
  platform: string
}

interface ProfileProps {
  profile: {
    links: Link[]
    id: string
    userUrl: string
    createdAt: Date
    userId: string
    username: string
    firstname: string
    lastname: string
    email: string
    profileImage: string
    updatedAt: Date
  }
  setProfile: React.Dispatch<
    React.SetStateAction<{
      links: Link[]
      id: string
      userUrl: string
      createdAt: Date
      userId: string
      username: string
      firstname: string
      lastname: string
      email: string
      profileImage: string
      updatedAt: Date
    }>
  >
  preview: {
    preview: string
  } | null
  setPreview: React.Dispatch<React.SetStateAction<{ preview: string } | null>>
}

const Profile = ({
  profile,
  setProfile,
  preview,
  setPreview,
}: ProfileProps) => {
  const isMobile = useMobileDetect()
  const [image, setImage] = useState<File | null>(null)
  const [errors, setErrors] = useState<ValidError[]>([])
  const [details, setDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
  })

  const nameError = errors.find((item) => item.errorType === 'NAME')
  const emailError = errors.find((item) => item.errorType === 'EMAIL')

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    axios
      .post('/api/profile', {
        profile: {
          ...profile,
          firstname: details.firstname,
          lastname: details.lastname,
          email: details.email,
        },
      })
      .then(() => {
        toast.success('Profile saved.')
        setProfile({
          ...profile,
          firstname: details.firstname,
          lastname: details.lastname,
          email: details.email === '' ? profile.email : details.email,
        })

        setDetails({
          firstname: '',
          lastname: '',
          email: '',
        })
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors)
          toast.error("Couldn't save profile, check your info.")
          setTimeout(() => {
            setErrors([])
          }, 6000)
        }
      })
  }

  const gridStyle = isMobile
    ? 'flex flex-col justify-start'
    : 'grid grid-cols-3 justify-center place-items-center'

  return (
    <section className='flex flex-col justify-start z-20 bg-white text-black px-4 pt-2 desktop:w-full desktop:mr-20 tablet:w-full tablet:mr-6 phone:w-80 phone:mt-4 rounded-md'>
      <h1 className='py-4'>Profile Details</h1>

      <p className='text-sm text-gray-500'>
        Add your details to create a personal touch to your profile.
      </p>
      <article
        className={`${gridStyle} align-middle text-primary.gray text-sm z-50 bg-background rounded-md h-auto w-full my-4 p-4`}
      >
        <h2 className='desktop:ml-2 tablet:justify-self-start tablet:mr-2'>
          Profile Picture
        </h2>
        <ImageDropzone
          setImage={setImage}
          image={image}
          setPreview={setPreview}
          preview={preview}
          setProfile={setProfile}
          profile={profile}
        />
        <p className='text-xs text-gray-500 desktop:ml-2 tablet:ml-6'>
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </article>
      <form action='' className='w-full mb-4' onSubmit={handleUpdateProfile}>
        <article className='text-primary.gray text-sm z-50 bg-background rounded-md h-auto w-full p-6'>
          <div className='mb-4'>
            <label
              className='block text-xs font-medium text-black mb-2'
              htmlFor='firstname'
            >
              First name*
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray ${
                nameError ? 'error-container' : null
              }`}
              id='firstname'
              type='text'
              placeholder='Enter your first name'
              onChange={(e) =>
                setDetails({ ...details, firstname: e.target.value })
              }
              value={details.firstname}
            />
            {nameError && (
              <p className='form-validation-error'>{nameError.error}</p>
            )}
          </div>

          <div className='mb-4'>
            <label
              className='block text-xs font-medium text-black mb-2'
              htmlFor='lastname'
            >
              Last name*
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray ${
                nameError ? 'error-container' : null
              }`}
              id='lastname'
              type='text'
              placeholder='Enter your last name'
              onChange={(e) =>
                setDetails({ ...details, lastname: e.target.value })
              }
              value={details.lastname}
            />
            {nameError && (
              <p className='form-validation-error'>{nameError.error}</p>
            )}
          </div>

          <div className='mb-4'>
            <label
              className='block text-xs font-medium text-black mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray ${
                emailError ? 'error-container' : null
              }`}
              id='email'
              type='text'
              placeholder='Enter your email'
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
            {emailError && (
              <p className='form-validation-error'>{emailError.error}</p>
            )}
          </div>
        </article>
        <div className='flex justify-end items-center'>
          <SaveButton />
        </div>
      </form>
    </section>
  )
}

export default Profile
