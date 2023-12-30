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
        console.log('Github Profile: ', profile)
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Add user data to the token right after signing in
      if (account && user) {
        token.accessToken = account.access_token
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user
      }
      return session
    },
    async signIn({ user, account, profile }): Promise<boolean> {
      if (account?.provider === 'github') {
        console.log('Profile in signIn callback:', profile) // Log the profile
        const email = profile?.email || user?.email
        const avatar = profile?.avatar_url // Assuming 'avatar_url' is the correct field
        const username = profile?.login // Assuming 'login' is the GitHub username

        try {
          await db.user.upsert({
            where: { email },
            create: { email, profileImage: avatar, username },
            update: { profileImage: avatar, username },
          })
        } catch (error) {
          console.error('Error in signIn callback:', error)
          return false
        }
      }
      return true
    },
  },
}
