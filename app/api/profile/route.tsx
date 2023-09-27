import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { options } from '../../api/auth/[...nextauth]/options'

import { db } from '@/prisma/db.server'
import multer from 'multer'
import { s3Client } from '../../../libs/awsClient'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const upload = multer({ storage: multer.memoryStorage() })

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

  // upload profile image to aws
  const processFileUpload = (req, res) => {
    return new Promise((resolve, reject) => {
      const multerSingle = upload.single('file')
      multerSingle(req, res, async (err) => {
        if (err) {
          return reject(err)
        }
        if (req.file) {
          const putObjectParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: req.file.originalname,
            Body: req.file.buffer,
          }
          const putObjectCommand = new PutObjectCommand(putObjectParams)
          const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
            expiresIn: 3600,
          })

          // signed url that gets saved to db
          return resolve(signedUrl)
        } else {
          return resolve(null)
        }
      })
    })
  }

  try {
    const signedUrl = await processFileUpload(req, res)
    console.log(signedUrl)

    if (signedUrl) {
      const image = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          profileImage: signedUrl,
        },
      })
      console.log(image)
    } else {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }
  } catch {
    return NextResponse.json(
      { error: "Can't upload image, try again later." },
      { status: 500 }
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
