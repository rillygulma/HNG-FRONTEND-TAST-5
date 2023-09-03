import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { db } from '../../../../prisma/db.server'

interface Body {
  email: string
  password: string
  username: string
}

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json()
  const { email, password, username } = body

  // Email Validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(email)) {
    return NextResponse.json({
      errorType: 'EMAIL',
      error: 'Invalid email format.',
    })
  }

  // Password Validation
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  if (!passwordPattern.test(password)) {
    return NextResponse.json({
      errorType: 'PASSWORD',
      error:
        'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
    })
  }

  const userExists = await db.user.findUnique({
    where: {
      email: email,
    },
  })

  if (userExists) {
    return NextResponse.json({
      errorType: 'TOAST_ERROR',
      error: `User ${userExists.email} already exists`,
    })
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await db.user.create({
    data: {
      email,
      password: hash,
      username,
    },
  })

  return NextResponse.json(user)
}
