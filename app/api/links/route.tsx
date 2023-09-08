import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { options } from '../../api/auth/[...nextauth]/options'

import { db } from '@/prisma/db.server'

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
