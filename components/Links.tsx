import React from 'react'
import LinkBlock from './LinkBlock'

const Links = () => {
  const testArr = new Array(3)
  console.log(testArr.length)
  return (
    <section className='flex flex-col justify-start z-20 bg-white text-black px-4 pt-2 mt-10 phone:w-72 phone:h-80 rounded-md'>
      <h1 className='py-4'>Customize your links</h1>
      <p className='text-sm text-gray-500'>
        Add, edit, or remove links below, then share your collated links.
      </p>
      <button className='bg-transparent hover:bg-tertiary.blue text-primary.blue font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4'>
        <span className='text-lg'>+</span> Add Link
      </button>
      {testArr &&
        testArr.map((link, index) => {
          return <LinkBlock key={link} index={index} />
        })}
    </section>
  )
}

export default Links
