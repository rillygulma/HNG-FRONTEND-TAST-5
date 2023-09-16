import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { options } from '../../api/auth/[...nextauth]/options'

import { db } from '@/prisma/db.server'
import { NextApiRequest } from 'next'

export async function POST(req: Request) {
  const session = await getServerSession(options)
  const body = await req.json()
  let errors = []

  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
    include: {
      links: true,
    },
  })

  if (!user) {
    return NextResponse.json(
      { error: 'User not found', errorType: 'TOAST_ERROR' },
      { status: 404 }
    )
  }

  const updatedLinks = body.links

  if (!Array.isArray(updatedLinks) || updatedLinks.length === 0) {
    return NextResponse.json(
      { error: 'No valid links provided', errorType: 'TOAST_ERROR' },
      { status: 400 }
    )
  }

  // Fetch all the links associated with this user from the database
  const existingLinks = await db.link.findMany({
    where: {
      userId: user.id,
    },
  })

  const existingLinkIds = new Set(existingLinks.map((link) => link.id))

  const updatedLinkIds = new Set(updatedLinks.map((link) => link.id))

  const idsToDelete = Array.from(existingLinkIds).filter(
    (id) => !updatedLinkIds.has(id)
  )

  for (const id of idsToDelete) {
    await db.link.delete({
      where: { id },
    })
  }

  for (let updatedLink of updatedLinks) {
    const linkExists = await db.link.findUnique({
      where: {
        id: updatedLink.id,
      },
    })

    if (!linkExists) {
      const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?' + // port
          '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
          '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ) // fragment locator

      if (!urlPattern.test(updatedLink.url)) {
        console.log('Invalid URL triggered: ' + updatedLink.url)
        // Instead of returning, just push an error message
        errors.push({ url: updatedLink.url, error: 'Not a valid URL.' })
        continue // skip the rest of the loop and go to the next iteration
      }

      await db.link.create({
        data: {
          url: updatedLink.url,
          platform: updatedLink.platform,
          userId: user.id,
        },
      })
    } else if (linkExists) {
      await db.link.update({
        where: {
          id: updatedLink.id,
        },
        data: {
          url: updatedLink.url,
          platform: updatedLink.platform,
          updatedAt: new Date(),
        },
      })
    } else {
      return NextResponse.json(
        { error: 'No valid links provided' },
        { status: 400 }
      )
    }
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  return NextResponse.json(updatedLinks)
}

export async function GET(): Promise<NextResponse> {
  const session = await getServerSession(options)

  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
    include: {
      links: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  if (!user.links) {
    return NextResponse.json({ error: 'No links found' }, { status: 404 })
  }

  return NextResponse.json(user)
}
