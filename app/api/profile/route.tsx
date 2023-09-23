import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { options } from '../../api/auth/[...nextauth]/options'

import { db } from '@/prisma/db.server'
import { NextApiRequest } from 'next'
import multer from 'multer'
import { s3Client } from '@/libs/awsClient.js'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { S3RequestPresigner, getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

import nextConnect from 'next-connect'

const upload = multer({ storage: multer.memoryStorage() })

const uploadFile = async (file: Express.Multer.File) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: file.originalname,
    Body: file.buffer,
  }

  try {
    await s3Client.send(new PutObjectCommand(params))
    return { success: true }
  } catch (err) {
    return { success: false, error: err }
  }
}

const handler = nextConnect()
  .use(upload.single('file'))
  .post(async (req, res) => {
    const file = req.file
    const key = Date.now().toString() + '-' + file.originalname

    const putParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }

    try {
      await s3Client.send(new PutObjectCommand(putParams))

      const signedUrl = await createRequestPresigner(s3Client)
      const url = signedUrl(putParams, { expiresIn: 60 * 60 * 1000 }) // 1 hour

      res.status(200).json({ url })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error uploading file to S3' })
    }
  })

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(options)
  const body = await req.json()
  const profile = body.profile
  console.log(profile.email)
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
  if (!emailPattern.test(email)) {
    errors.push({
      errorType: 'EMAIL',
      error: 'Please enter a valid email.',
    })
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  return NextResponse.json(user)
}
