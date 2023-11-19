import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PreviewSkeleton = ({ isOverlay = false }) => {
  const imageSize = isOverlay
    ? { width: 96, height: 96 }
    : { width: 128, height: 128 }
  const containerSize = isOverlay ? 'w-24 h-24' : 'w-32 h-32'

  return (
    <div
      className={`${
        isOverlay ? 'w-64' : 'w-72'
      } h-full pb-2 mt-10 mx-1 flex flex-col items-center justify-center bg-white rounded-lg`}
    >
      <div className={`rounded-full mt-16 mb-2 relative ${containerSize}`}>
        <div className='flex justify-center items-center absolute inset-0'>
          <Skeleton circle={true} {...imageSize} />
        </div>
      </div>
      <Skeleton width={150} height={30} className='mt-4' />
      <Skeleton width={200} height={24} className='mt-2' />
      <section
        className={`flex flex-col w-full mt-10 pb-10 justify-center items-center`}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={`mb-6 ${isOverlay ? 'w-60' : 'w-72'}`}>
            <Skeleton height={50} />
          </div>
        ))}
      </section>
    </div>
  )
}

export default PreviewSkeleton
