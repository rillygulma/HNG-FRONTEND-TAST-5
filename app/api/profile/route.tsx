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

  const firstName = body.firstname
  const lastName = body.lastname
  const email = body.email

  if (!firstName || !lastName) {
    errors.push({
      error: 'First and last name are required',
      errorType: 'NAME',
    })
  }

  if (firstName.length > 50 || lastName.length > 50) {
    errors.push({
      error: 'First and last name must be less than 50 characters',
      errorType: 'NAME',
    })
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(email)) {
    return errors.push({
      errorType: 'EMAIL',
      error: 'Please enter a valid email.',
    })
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  return NextResponse.json(user)
}
