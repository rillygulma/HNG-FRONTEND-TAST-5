import type { Awaitable, NextAuthOptions } from 'next-auth'
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'

import { db } from '../../../../prisma/db.server'
import { User } from '@prisma/client'

interface Profile {
  profile: GithubProfile
  tokens: Awaitable<User>
}

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        console.log('Github Profile: ' + profile)
        return profile
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Enter your credentials')
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })

        if (!user || !user?.password) {
          throw new Error("User doesn't exist")
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) {
          throw new Error('Incorrect password')
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async signIn({ user, account, profile }): Promise<boolean> {
      if (account?.provider === 'github') {
        const email = profile?.email?.[0]?.valueOf()
          ? profile.email[0].valueOf()
          : user?.email
        const avatar = profile?.photos?.[0]?.value
        const username = profile?.username

        await db.user.upsert({
          where: {
            email,
          },
          create: {
            email,
            profileImage: avatar,
            username,
          },
          update: {
            email,
            profileImage: avatar,
            username,
          },
        })
      }
      return true
    },
  },
}
