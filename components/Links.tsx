import React from 'react'
import EditLinkBlock from './EditLinkBlock'
import SaveButton from './SaveButton'
import AddLinkButton from './AddLinkButton'

const Links = () => {
  const testArr = Array.from({ length: 3 }) as Array<string>
  console.log(testArr.length)

  return (
    <section className='flex flex-col justify-start mb-10 z-20 bg-white text-black px-4 pt-2 mt-8 phone:w-80 phone:h-full rounded-md'>
      <h1 className='py-4'>Customize your links</h1>

      <p className='text-sm text-gray-500'>
        Add, edit, or remove links below, then share your collated links.
      </p>
      <AddLinkButton />
      <form action='' className='w-full mb-4'>
        <div className='space-y-6'>
          {testArr.map((link, index) => {
            return <EditLinkBlock index={index} key={index} />
          })}
        </div>
        <SaveButton />
      </form>
    </section>
  )
}

export default Links
