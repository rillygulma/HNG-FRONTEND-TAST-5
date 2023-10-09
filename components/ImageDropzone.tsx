import React, { useState, useCallback } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import useMobileDetect from '@/hooks/useMobileDetect'

const ImageDropzone = ({ setImage, image }) => {
  const isMobile = useMobileDetect()
  const [preview, setPreview] = useState<Object | null>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles: File[]) => {
      // Do something with the files
      console.log(acceptedFiles.length) // is 0
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0] // or whatever logic you use to select a file
        console.log(file)
        const formData = new FormData()
        formData.append('file', file)
        const response = await axios
          .post('/api/imageUpload', formData)
          .then((response) => {
            toast.success('Image uploaded successfully.')
            console.log(response.data)
            setPreview(
              Object.assign(file, { preview: URL.createObjectURL(file) })
            )
          })
          .catch((error) => {
            console.log(error)
          })
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
    <div {...getRootProps()} className={dropZoneStyle}>
      {preview && (
        <Image
          src={preview.preview}
          alt='profile picture'
          width={160}
          height={160}
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
