import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { db } from '../../../../prisma/db.server'

export async function POST(req: Request, res: NextResponse) {
  const body = req.json()
  const { email, password, name } = body

  const userExists = await db.user.findUnique({
    where: {
      email: email,
    },
  })

  if (userExists) {
    throw new Error(`User ${userExists.email} already exists`)
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await db.user.create({
    data: {
      email: email,
      password: hash,
      username: name,
    },
  })

  return NextResponse.json(user)
}
