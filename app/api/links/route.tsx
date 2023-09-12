import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { options } from '../../api/auth/[...nextauth]/options'

import { db } from '@/prisma/db.server'
import { NextApiRequest } from 'next'

export async function POST(req: NextApiRequest): Promise<NextResponse> {
  const session = await getServerSession(options)
  console.log(req.body)

  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
    include: {
      links: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const updatedLinks = req.body.links
  console.log(updatedLinks)

  if (!Array.isArray(updatedLinks) || updatedLinks.length === 0) {
    return NextResponse.json(
      { error: 'No valid links provided' },
      { status: 400 }
    )
  }

  for (let updatedLink of updatedLinks) {
    if (!updatedLink.id) {
      await db.link.create({
        data: {
          url: updatedLink.url,
          platform: updatedLink.platform,
          userId: user.id,
        },
      })
    } else {
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
    }
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
