import React from 'react'

interface ButtonProps {
  handler: Function
  text: string
  style: 'clear' | 'filled' // Define style as a union type of 'clear' or 'filled'
}
const Button = ({ text, style, handler }: ButtonProps) => {
  if (style) {
    if (style === 'clear') {
      return (
        <button
          className='bg-transparent justify-center align-middle hover:bg-tertiary.blue text-primary.blue font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4 w-full'
          onClick={handler}
        >
          {text}
        </button>
      )
    }
    if (style === 'filled') {
      return (
        <button
          className='flex justify-center align-middle bg-primary.blue hover:bg-secondary.blue text-white font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4 w-full'
          onClick={handler}
        >
          {text}
        </button>
      )
    }
  }
  return (
    <button
      className='flex justify-center align-middle bg-primary.blue hover:bg-secondary.blue text-white font-bold border-primary.blue border-2 rounded-md px-4 py-2 mt-4 w-full'
      onClick={handler}
    >
      {text}
    </button>
  )
}

export default Button
