import React, { useState, useCallback } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

const ImageDropzone = ({ setImage, image }) => {
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

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center align-middle h-40 w-50 bg-tertiary.blue rounded-md m-2 mr-8 pt-6 pb-8 ${
        isDragActive && 'border-secondary.blue border-2'
      }`}
    >
      {preview && (
        <div className='flex flex-col items-center align-middle'>
          <Image
            src={preview.preview}
            alt='profile picture'
            width={100}
            height={100}
          />
          <p className='font-bold text-primary.blue'>
            <span>+</span> Upload Image
          </p>
        </div>
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

      {isDragActive ? <p>Drop your file here</p> : null}
    </div>
  )
}

export default ImageDropzone
