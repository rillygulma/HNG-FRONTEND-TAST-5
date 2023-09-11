import React, { useEffect, useState } from 'react'
import EditLinkBlock from './EditLinkBlock'
import SaveButton from './SaveButton'
import AddLinkButton from './AddLinkButton'
import Image from 'next/image'
import axios from 'axios'

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
  const testArr = Array.from({ length: 3 }) as Array<string>
  console.log(testArr.length)
  const [links, setLinks] = useState<Link[]>([])

  const addLink = () => {
    const newLink = {
      id: '',
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
    const newLinks = [...links]
    newLinks.splice(index, 1)
    setLinks(newLinks)
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
      <form action='' className='w-full mb-4'>
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
                  key={index}
                  updateLink={updateLink}
                  removeLink={removeLink}
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
