import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'

import { db } from '../../../../prisma/db.server'

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        //Retrieve user data here.
        //Refer to https://next-auth.js.org/configuration/providers/credentials

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Enter your credentials')
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })

        if (!user || !user?.password) {
          throw new Error('No user')
        }

        const passwordMatch = await bcrypt.compare(
          credentials?.password,
          user?.password
        )

        if (!passwordMatch) {
          throw new Error('Incorrect password')
        }

        if (
          credentials?.email === user?.email &&
          credentials?.password === user?.password
        ) {
          return user
        } else {
          if (!credentials) {
            throw new Error('No credentials')
          }
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
}
