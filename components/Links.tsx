import React, { useEffect, useState } from 'react'
import EditLinkBlock from './EditLinkBlock' // sortable item
import SaveButton from './SaveButton'
import AddLinkButton from './AddLinkButton'
import LinksSkeleton from './skeletons/LinksSkeleton'
import Image from 'next/image'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'

// dnd-kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
interface Link {
  id: string
  url: string
  platform: string
  error?: string
}

interface LinksProps {
  profile: {
    links: Link[]
  }
  setProfile: React.Dispatch<
    React.SetStateAction<{
      links: Link[]
      id: string
      userUrl: string
      createdAt: Date
      userId: string
      username: string
      firstname: string
      lastname: string
      email: string
      profileImage: string
      updatedAt: Date
    }>
  >
  isLoading: boolean
}

interface Errors {
  id: string
  error: string
  url?: string
}

const Links = ({ profile, setProfile, isLoading }: LinksProps) => {
  //const testArr = Array.from({ length: 3 }) as Array<string>
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const [links, setLinks] = useState(profile?.links)
  const [userHasModifiedLinks, setUserHasModifiedLinks] = useState(false)
  const [errors, setErrors] = useState<Errors[]>([])
  const [errorType, setErrorType] = useState('TOAST_ERROR')

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over) {
      const activeLink = links.find((item: Link) => item.id === active.id)
      const overLink = links.find((item: Link) => item.id === over.id)

      if (activeLink && overLink) {
        setLinks((prevLinks: Link[]) => {
          const oldIndex = prevLinks.indexOf(activeLink)
          const newIndex = prevLinks.indexOf(overLink)
          return arrayMove(prevLinks, oldIndex, newIndex)
        })
      }
    }
  }

  const addLink = () => {
    const newLink = {
      id: uuidv4(),
      url: '',
      platform: '',
    }
    const arr = new Array(...(links || [])).concat(newLink)
    setLinks(arr)
    setUserHasModifiedLinks(true)
  }

  const updateLink = (index: number, updatedLink: Link) => {
    const newLinks = [...links]
    newLinks[index] = updatedLink
    setLinks(newLinks)
    setUserHasModifiedLinks(true)
  }

  const removeLink = (index: number) => {
    const newLinks = [...links].filter((link) => link.id !== links[index].id)
    setLinks(newLinks)
    setUserHasModifiedLinks(true)
  }

  const handleUpdateLinks = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sending the following links to server:', links)
    axios
      .post('/api/links', {
        links: links,
      })
      .then(() => {
        toast.success('Links saved.')
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          const errorArray = err.response.data.errors // Assuming this is an array of error objects
          // Update the links with error messages based on their IDs
          const updatedLinksWithErrors = links.map((link) => {
            const errorForThisLink = errorArray.find(
              (error: Errors) => error.id === link.id
            )
            return {
              ...link,
              error: errorForThisLink ? errorForThisLink.error : null,
            }
          })

          setLinks(updatedLinksWithErrors) // Store the updated links with their errors
        } else {
          // Handle other types of errors
          toast.error('An error occurred while saving your links.')
        }
      })
  }

  useEffect(() => {
    const updateLinksOnServer = async () => {
      try {
        const response = await axios.post('/api/links', { links: [] })
        toast.success('All links removed.')
      } catch (error) {
        toast.error('An error occurred while removing your links.')
      }
    }

    if (links.length === 0 && userHasModifiedLinks) {
      updateLinksOnServer()
    }
  }, [links, userHasModifiedLinks])

  useEffect(() => {
    setProfile((prevProfile) => {
      return {
        ...prevProfile,
        links: links,
      }
    })
  }, [links, setProfile])

  useEffect(() => {
    if (profile?.links) {
      setLinks(profile.links)
    }
  }, [profile, setProfile])

  return (
    <section className='flex flex-col col-span-1 col-start-2 row-span-1 row-start-1 self-start justify-start z-20 bg-white text-black px-4 pt-2 desktop:w-full tablet:w-full phone:w-80 rounded-md phone:mt-4 m-auto'>
      <h1 className='py-4'>Customize your links</h1>

      <p className='text-sm text-gray-500'>
        Add, edit, or remove links below, then share your collated links.
        Reorder your links by clicking and dragging the handle in the top left
        corner of each link block.
      </p>
      <AddLinkButton addLink={addLink} />
      <form action='' className='w-full mb-4' onSubmit={handleUpdateLinks}>
        <div className='space-y-6'>
          {!isLoading && links.length === 0 && (
            <article className='flex flex-col justify-center items-center py-8 pb-20 text-primary.gray text-sm z-50 bg-background rounded-md desktop:h-full phone:min-h-72 w-full my-4'>
              <Image
                src='./images/illustration-empty.svg'
                alt='No links'
                width='110'
                height='110'
              />
              <h2 className='mt-4'>Let&apos;s get you started!</h2>
              <p className='text-center text-gray-400 mx-3'>
                Use the &quot;Add Link&quot; button to get started. Once you
                have more than one link, you can reorder and edit them. Then,
                share your profiles with the world!
              </p>
            </article>
          )}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={links}
              strategy={verticalListSortingStrategy}
            >
              {isLoading && <LinksSkeleton />}
              {links?.length > 0 &&
                links?.map((link, index) => {
                  return (
                    <EditLinkBlock
                      link={link}
                      index={index}
                      key={link.id}
                      id={link.id}
                      updateLink={updateLink}
                      removeLink={removeLink}
                      error={link?.error}
                      errorType={errorType}
                    />
                  )
                })}
            </SortableContext>
          </DndContext>
        </div>
        <div className='flex justify-end items-center'>
          {links?.length > 0 && <SaveButton />}
        </div>
      </form>
    </section>
  )
}

export default Links
