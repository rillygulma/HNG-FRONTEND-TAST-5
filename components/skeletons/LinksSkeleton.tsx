import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LinksSkeleton = () => {
  return (
    <article className='text-primary.gray text-sm z-50 bg-background rounded-md h-60 w-full my-4'>
      <div className='flex justify-between py-4 pb-3 px-3'>
        <div className='flex w-full'>
          <Skeleton height={22} width={22} className='my-2 mx-2' />
          <Skeleton width={100} className='ml-3 mt-1' />
        </div>
        <Skeleton width={50} className='mr-2 pt-0.5' />
      </div>
      <div className='pt-1 px-4 space-y-4'>
        <div>
          <Skeleton width={100} height={20} />
          <Skeleton width={`100%`} height={40} className='mt-2' />
        </div>
        <div>
          <Skeleton width={100} height={20} />
          <Skeleton width={`100%`} height={40} className='mt-2' />
        </div>
      </div>
    </article>
  )
}

export default LinksSkeleton
