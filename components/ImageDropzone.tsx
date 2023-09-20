import React, { useState, useCallback } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone'

const ImageDropzone = ({ setImage, image }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0] // or whatever logic you use to select a file
        setImage(file)
      }
    },
    [image]
  )

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        'image/png': ['.png'],
        'text/html': ['.html', '.htm'],
      },
      onDrop: async (acceptedFiles) => {
        setImage(acceptedFiles[0]) // replace this with handler function, use image to deliver the file to the server in parent component post action
        handleImageDrop(acceptedFiles[0])
      },
    })

  const handleImageDrop = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post('/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center align-middle h-40 w-50 bg-tertiary.blue rounded-md m-2 mr-8 pt-6 pb-8 ${
        isDragActive && 'border-secondary.blue border-2'
      }`}
    >
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
      {isDragActive ? <p>Drop your file here</p> : null}
    </div>
  )
}

export default ImageDropzone
