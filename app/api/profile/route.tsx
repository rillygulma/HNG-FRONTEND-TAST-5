import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { options } from '../../api/auth/[...nextauth]/options'

import { db } from '@/prisma/db.server'

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(options)
  const body = await req.json()
  const profile = body.profile
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

  const firstName = profile.firstname
  const lastName = profile.lastname
  const email = profile.email

  if (!firstName || !lastName) {
    errors.push({
      error: 'First and last name are required.',
      errorType: 'NAME',
    })
  }

  if (firstName.length > 20 || lastName.length > 20) {
    errors.push({
      error: 'First and last name must be less than 20 characters.',
      errorType: 'NAME',
    })
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (email && !emailPattern.test(email)) {
    errors.push({
      errorType: 'EMAIL',
      error: 'Please enter a valid email.',
    })
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  if (!email) {
    await db.user.update({
      where: { email: session?.user?.email as string },
      data: {
        firstname: firstName,
        lastname: lastName,
        email: user.email,
      },
    })
  } else {
    await db.user.update({
      where: { email: session?.user?.email as string },
      data: {
        firstname: firstName,
        lastname: lastName,
        email: email,
      },
    })
  }

  return NextResponse.json(user)
}

export async function GET(): Promise<NextResponse> {
  const session = await getServerSession(options)
  console.log('Session:', session)

  // Check if the session and session user email exists
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Session not found.' }, { status: 401 })
  }

  const userEmail = session.user.email
  const user = await db.user.findUnique({
    where: { email: userEmail },
    include: {
      links: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 })
  }

  // Construct user URL
  const userUrl = `https://dev-links-nreya5hcf-matt-o-west-portfolio.vercel.app/${user.username}`

  // Update user URL if it doesn't exist
  if (!user.userUrl) {
    await db.user.update({
      where: { email: userEmail },
      data: {
        userUrl: userUrl,
      },
    })
  }

  return NextResponse.json(user)
}
