import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { db } from '@/prisma/db.server'

interface Body {
  email: string
  password: string
  username: string
}

export async function POST(
  req: Request,
  res: NextResponse
): Promise<NextResponse> {
  const body = await req.json()
  const { email, password, username } = body

  // Email Validation
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

  // Password Validation
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (!passwordPattern.test(password)) {
    return NextResponse.json(
      {
        errorType: 'PASSWORD',
        error:
          'You need a minimum of eight characters, one number and one special character.',
      },
      { status: 400 }
    )
  }

  // Username Validation
  // Minimum three characters
  const usernamePattern = /^[a-zA-Z0-9_]{3,}$/
  if (!usernamePattern.test(username)) {
    return NextResponse.json(
      {
        errorType: 'USERNAME',
        error: 'Username must have minimum three characters, no spaces.',
      },
      { status: 400 }
    )
  }

  const userEmailExists = await db.user.findUnique({
    where: {
      email: email,
    },
  })

  const usernameExists = await db.user.findUnique({
    where: {
      username: username,
    },
  })

  if (userEmailExists) {
    return NextResponse.json(
      {
        errorType: 'TOAST_ERROR',
        error: `Email ${userEmailExists.email} already exists.`,
      },
      { status: 409 }
    )
  }

  if (usernameExists) {
    return NextResponse.json(
      {
        errorType: 'TOAST_ERROR',
        error: `Username ${usernameExists.username} already exists.`,
      },
      { status: 409 }
    )
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const userUrl = `https://dev-links-black.vercel.app/${username}` // use devlinks.vercel.app for production
  const user = await db.user.create({
    data: {
      email,
      password: hash,
      username,
      userUrl,
    },
  })

  return NextResponse.json(user, { status: 201 })
}
