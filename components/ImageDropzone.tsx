import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import { useSWRConfig } from 'swr'
import useMobileDetect from '../hooks/useMobileDetect'

interface Link {
  id: string
  url: string
  platform: string
}
interface ImageDropzoneProps {
  setImage: React.Dispatch<React.SetStateAction<File | null>>
  image: File | null
  setPreview: React.Dispatch<
    React.SetStateAction<{
      preview: string
    } | null>
  >
  preview: {
    preview: string
  } | null
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
}

const ImageDropzone = ({
  setImage,
  image,
  setPreview,
  preview,
  setProfile,
  profile,
}: ImageDropzoneProps) => {
  const isMobile = useMobileDetect()
  const { mutate } = useSWRConfig()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]

        // Immediately update the preview state with the local file URL
        const previewUrl = URL.createObjectURL(file)
        setPreview({ preview: previewUrl })

        const formData = new FormData()
        formData.append('file', file)

        try {
          const response = await axios.post('/api/imageUpload', formData)
          // If the image is uploaded successfully, update the profile image
          setProfile((prevProfile) => ({
            ...prevProfile,
            profileImage: `${
              response.data.profileImage
            }?${new Date().getTime()}`,
          }))
          await mutate(
            '/api/profile',
            { ...profile, profileImage: response.data.profileImage },
            false
          )

          toast.success('Image uploaded successfully.')
          URL.revokeObjectURL(previewUrl)
        } catch (error) {
          toast.error('Image upload failed.')
          URL.revokeObjectURL(previewUrl)
        }
      }
    },
  })

  const dropZoneStyle = `${
    preview
      ? 'flex flex-col items-center'
      : 'flex flex-col items-center align-middle h-40  rounded-md m-2 mr-8 py-8 bg-tertiary.blue hover:border-2 hover:border-secondary.blue'
  } ${isDragActive && 'border-secondary.blue border-2'} ${
    !isMobile && 'min-w-full w-48'
  }`

  return (
    <div {...getRootProps()} className={dropZoneStyle} data-testid='dropzone'>
      {/*Change this conditional below so that when the user toggles back and forth between the Links and Profile, the preview?.preview object is retained. Do we need a ref?*/}
      {preview && (
        <Image
          src={preview?.preview}
          alt='profile picture'
          width={140}
          height={140}
          className={`border-blue border-2 w-auto ${
            isDragActive &&
            'border-secondary.blue border-2 blur hover:blur-sm hover:opacity-80'
          }`}
        />
      )}
      {!preview && (
        <>
          <input {...getInputProps()} />
          <Image
            src='./images/icon-upload-image.svg'
            alt='profile picture'
            width={36}
            height={36}
            className='rounded-full mt-4 mb-2'
          />
          <p className='font-bold text-primary.blue'>
            <span>+</span> Upload Image
          </p>
        </>
      )}

      {isDragActive && (
        <p className={`absolute text-md ${preview && 'text-lg'} mt-20`}>
          Drop your file here
        </p>
      )}
    </div>
  )
}

export default ImageDropzone
