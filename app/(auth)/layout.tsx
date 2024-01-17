import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='w-full max-w-md mx-6 desktop:mb-0 phone:mb-16'>
        <div className='flex items-center justify-center mb-6 '>
          <Image
            src='./images/logo-devlinks-large.svg'
            alt='Devlinks Logo'
            width={200}
            height={200}
            className='mb-1'
          />
        </div>

        <div className='p-6 pb-8 w-full phone:mx-2 bg-white rounded-lg'>
          {children}
        </div>
      </div>
    </div>
  )
}
