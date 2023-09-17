import React, { useEffect, useState } from 'react'
import EditLinkBlock from './EditLinkBlock'
import SaveButton from './SaveButton'
import AddLinkButton from './AddLinkButton'
import Image from 'next/image'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'
interface Link {
  id: string
  url: string
  platform: string
}

interface User {
  username: string
  email: string
  password: string // Please note storing password like this is not secure in a real application
  links: Link[]
}

const Links = () => {
  //const testArr = Array.from({ length: 3 }) as Array<string>
  const [links, setLinks] = useState<Link[]>([])
  const [error, setError] = useState('Something went wrong')
  const [errorType, setErrorType] = useState('TOAST_ERROR')

  useEffect(() => {
    console.log(links)
  }, [links])

  const addLink = () => {
    const newLink = {
      id: uuidv4(),
      url: '',
      platform: '',
    }
    const arr = new Array(...(links || [])).concat(newLink)
    setLinks(arr)
  }

  const updateLink = (index: number, updatedLink: Link) => {
    const newLinks = [...links]
    newLinks[index] = updatedLink
    setLinks(newLinks)
  }

  const removeLink = (index: number) => {
    console.log('remove link at index ' + index)
    const newLinks = [...links].filter((link) => link.id !== links[index].id)
    setLinks(newLinks)
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
        console.log('links sent to server')
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrorType('URL')
          toast.error("Couldn't save links, check your URLs.")
          const errorArray = err.response.data.errors // Assuming this is an array of error objects
          const updatedLinks = links.map((link, index) => {
            const errorForThisLink = errorArray.find(
              (err) => err.url === link.url
            )
            return {
              ...link,
              error: errorForThisLink ? errorForThisLink.error : null,
            }
          })

          setLinks(updatedLinks) // Update the state with the new error messages
        }
      })
  }

  useEffect(() => {
    const getLinks = async () => {
      axios
        .get('/api/links')
        .then((response) => response.data)
        .then((data) => {
          console.log(data)
          setLinks(data.links)
        })
        .catch((error) => {
          console.log(error) // create error boundary if links are corrupted, or display graphic if user has no links
        })
    }

    getLinks()
  }, [])

  return (
    <section className='flex flex-col justify-start mb-10 z-20 bg-white text-black px-4 pt-2 mt-8 phone:w-80 phone:h-full rounded-md'>
      <h1 className='py-4'>Customize your links</h1>

      <p className='text-sm text-gray-500'>
        Add, edit, or remove links below, then share your collated links.
      </p>
      <AddLinkButton addLink={addLink} />
      <form action='' className='w-full mb-4' onSubmit={handleUpdateLinks}>
        <div className='space-y-6'>
          {links.length === 0 && (
            <article className='flex flex-col justify-center items-center py-6 text-primary.gray text-sm z-50 bg-background rounded-md phone:min-h-72 w-full my-4'>
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
          {/*testArr.map((link, index) => {
            return <EditLinkBlock index={index} key={index} />
          })*/}
          {links.length > 0 &&
            links.map((link, index) => {
              return (
                <EditLinkBlock
                  link={link}
                  index={index}
                  key={link.id}
                  updateLink={updateLink}
                  removeLink={removeLink}
                  error={error}
                  errorType={errorType}
                />
              )
            })}
        </div>
        {links.length > 0 && <SaveButton />}
      </form>
    </section>
  )
}

export default Links
