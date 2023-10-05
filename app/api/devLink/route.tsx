import { NextResponse, NextRequest } from 'next/server'

import { db } from '@/prisma/db.server'

export async function POST(req: Request) {
  const body = await req.json()
  console.log(body.user)
  const user = await db.user.findUnique({
    where: { username: body.user },
    include: {
      links: true,
    },
  })

  return NextResponse.json(user)
}
