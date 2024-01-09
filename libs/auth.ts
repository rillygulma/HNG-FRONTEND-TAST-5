import { db } from '../prisma/db.server'
import { SendEmailCommand } from '@aws-sdk/client-ses' // ES Modules import
import { sesClient } from './aws'
import crypto from 'crypto'

export async function generateResetToken(email: string) {
  const user = await db.user.findUnique({ where: { email } })

  if (!user) return null

  const resetToken = crypto.randomBytes(32).toString('hex')
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Set token in database with expiry (e.g., 1 hour)
  await db.user.update({
    where: { email },
    data: {
      resetToken: hashedToken,
      resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000),
    },
  })

  return resetToken
}

export async function sendResetEmail(email: string, resetToken: string) {
  const msg = {
    // SendEmailRequest
    Source: 'pw@devlinks.app', // required
    Destination: {
      // Destination
      ToAddresses: [
        // AddressList
        email,
      ],
    },
    Message: {
      // Message
      Subject: {
        // Content
        Data: 'Password Reset', // required
      },
      Body: {
        // Body
        Text: {
          Data: 'You requested a password reset?', // required
        },
        Html: {
          Data: `<a href="https://localhost:3000/reset?token=${resetToken}">Click here to reset your password</a>`, // required
        },
      },
    },
    Tags: [
      // MessageTagList
      {
        // MessageTag
        Name: 'forgot-password', // required
        Value: 'reset', // required
      },
    ],
  }

  // send email
  const command = new SendEmailCommand(msg)
  const response = await sesClient.send(command)

  return { msg, response }
}
