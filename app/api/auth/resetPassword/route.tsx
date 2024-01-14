import { NextResponse } from 'next/server'
import { sendResetEmail, generateResetToken } from '@/libs/auth'

import { db } from '@/prisma/db.server'

export async function POST(
  req: Request,
  res: NextResponse
): Promise<NextResponse> {
  const body = await req.json()
  const { email } = body

  if (!email) {
    return NextResponse.json(
      {
        errorType: 'EMAIL',
        error: 'Email is required.',
      },
      { status: 400 }
    )
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      {
        errorType: 'EMAIL',
        error: 'Invalid email format.',
      },
      { status: 400 }
    )
  }

  const userEmailExists = await db.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!userEmailExists) {
    return NextResponse.json(
      {
        errorType: 'EMAIL',
        error: 'Account does not exist.',
      },
      { status: 400 }
    )
  }

  const token = generateResetToken(email)
  const resetLink = `${process.env.NEXTAUTH_URL}/auth/resetPassword?token=${token}`
  await sendResetEmail(email, resetLink)

  return NextResponse.json(email, {
    status: 200,
  })
}
