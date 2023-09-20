import React from 'react'
import Image from 'next/image'
import Dropzone from 'react-dropzone'

const ImageDropzone = () => {
  return (
    <Dropzone>
      {(state) => (
        <div className='flex flex-col items-center align-middle h-40 w-50 bg-tertiary.blue rounded-md m-2 mr-8 pt-6 pb-8'>
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
          {state.isDragActive ? <p>Drop your file here</p> : null}
        </div>
      )}
    </Dropzone>
  )
}

export default ImageDropzone
