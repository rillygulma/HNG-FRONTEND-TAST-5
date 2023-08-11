import React from 'react'
import SaveButton from './SaveButton'
import Image from 'next/image'

const Profile = () => {
  return (
    <section className='flex flex-col justify-start mb-10 z-20 bg-white text-black px-4 pt-2 mt-10 phone:w-80 phone:h-full rounded-md'>
      <h1 className='py-4'>Profile Details</h1>

      <p className='text-sm text-gray-500'>
        Add your details to create a personal touch to your profile.
      </p>
      <article className='flex flex-col justify-center align-middle text-primary.gray text-sm z-50 bg-background rounded-md h-auto w-full my-4 p-4'>
        <h2 className='ml-2'>Profile Picture</h2>
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
        </div>
        <p className='text-xs text-gray-500 ml-2'>
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </article>
      <form action='' className='w-full mb-4'>
        <article className='text-primary.gray text-sm z-50 bg-background rounded-md h-auto w-full my-4 p-6'>
          <div className='mb-4'>
            <label
              className='block text-xs font-medium text-black mb-2'
              htmlFor='firstname'
            >
              First name*
            </label>
            <input
              className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
              id='firstname'
              type='text'
              placeholder='Enter your first name'
            />
          </div>

          <div className='mb-4'>
            <label
              className='block text-xs font-medium text-black mb-2'
              htmlFor='lastname'
            >
              Last name*
            </label>
            <input
              className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
              id='lastname'
              type='text'
              placeholder='Enter your last name'
            />
          </div>

          <div className='mb-4'>
            <label
              className='block text-xs font-medium text-black mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='w-full px-4 py-2 border rounded-md text-black placeholder-primary.gray bg-tertiary.gray'
              id='email'
              type='text'
              placeholder='Enter your email'
            />
          </div>
        </article>
        <SaveButton />
      </form>
    </section>
  )
}

export default Profile
