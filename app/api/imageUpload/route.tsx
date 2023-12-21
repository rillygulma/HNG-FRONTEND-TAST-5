import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { options } from '../auth/[...nextauth]/options'
import { s3Client } from '../../../libs/awsClient'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { Response } from 'express'

import { db } from '../../../prisma/db.server'

export async function POST(req: NextRequest, res: Response) {
  const session = await getServerSession(options)
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ error: 'No image provided.' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
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

  if (buffer && user) {
    const uniqueS3Key = user.id // unique identifier for each user
    const putObjectParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: uniqueS3Key,
      Body: buffer,
    }

    const putObjectCommand = new PutObjectCommand(putObjectParams)

    try {
      const data = await s3Client.send(putObjectCommand)
      console.log(data)
      const s3FileUrl = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${uniqueS3Key}?${putObjectParams.Body.byteLength}`
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          profileImage: s3FileUrl,
        },
      })

      return NextResponse.json({ profileImage: s3FileUrl }, { status: 200 })
    } catch {
      return NextResponse.json(
        { error: 'Could not upload image.', errorType: 'TOAST_ERROR' },
        { status: 500 }
      )
    }
  }
}
