import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { options } from '../auth/[...nextauth]/options'
import { s3Client } from '../../../libs/awsClient'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Request, Response } from 'express'

import { db } from '../../../prisma/db.server'

export async function POST(req: NextRequest, res: Response) {
  const session = await getServerSession(options)
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ error: 'No image provided.' }, { status: 400 })
  }

  console.log('File: ' + file.name)
  //console.log('Request body: ' + req)

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  console.log(typeof buffer)
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

  if (!buffer) {
    return NextResponse.json({ error: 'No image provided.' }, { status: 400 })
  }

  if (buffer) {
    const putObjectParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: file.name,
      Body: buffer,
    }
    const putObjectCommand = new PutObjectCommand(putObjectParams)
    const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 3600,
    })

    // signed url error
    if (!signedUrl) {
      return NextResponse.json(
        { error: 'Could not upload image', errorType: 'TOAST_ERROR' },
        { status: 500 }
      )
    }

    // signed url that gets saved to db
    if (signedUrl) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          profileImage: signedUrl,
        },
      })
      return signedUrl
    }
  }
}
