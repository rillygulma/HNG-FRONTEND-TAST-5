import { db } from '../prisma/db.server'
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
    to: email,
    from: 'DevLinks',
    subject: 'Password Reset',
    html: `<a href="https://yourapp.com/reset?token=${resetToken}">Click here to reset your password</a>`,
  }
}
