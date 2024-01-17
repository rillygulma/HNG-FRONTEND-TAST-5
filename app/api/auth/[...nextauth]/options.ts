import type { Awaitable, NextAuthOptions } from 'next-auth'
import { NextResponse } from 'next/server'
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

interface CredentialError {
  message: string
  type: string
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
        let errors = []
        if (!credentials?.email || !credentials?.password) {
          errors.push({
            message: 'Enter your credentials.',
            type: 'error',
          })
          throw new Error('Enter your credentials.')
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })

        if (!user || !user?.password) {
          errors.push({
            message: `${credentials?.email} is not registered.`,
            type: 'error',
          })
          throw new Error("User doesn't exist.")
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) {
          errors.push({
            message: `Incorrect password.`,
            type: 'error',
          })
          throw new Error('Incorrect password.')
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
    async signIn({ user, account, profile, email }) {
      let isSuccessful = false

      if (account?.provider === 'credentials') {
        isSuccessful = true
      }

      if (account?.provider === 'github') {
        const githubProfile = profile as GithubProfile
        const existingUser = await db.user.findUnique({
          where: {
            email: profile?.email,
          },
          include: {
            links: true,
          },
        })

        if (existingUser) {
          await db.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            create: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
            },
            update: {
              // Update any fields if necessary
            },
          })

          if (
            existingUser.links.find((link) => link.platform === 'github') ===
            undefined
          ) {
            await db.user.update({
              where: {
                id: existingUser.id,
              },
              data: {
                links: {
                  create: {
                    platform: 'github',
                    url: githubProfile.html_url,
                  },
                },
              },
            })
          }

          isSuccessful = true
        } else {
          await db.user.create({
            data: {
              email: profile?.email as string,
              username: githubProfile.login,
              profileImage: githubProfile.avatar_url,
              links: {
                create: {
                  platform: 'github',
                  url: githubProfile.html_url,
                },
              },
              accounts: {
                create: {
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                },
              },
            },
          })
          isSuccessful = true
        }
      }

      return isSuccessful
    },
  },
}
