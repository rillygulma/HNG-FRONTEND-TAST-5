import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

import { db } from '../../../../prisma/db.server'

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'mwest' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        //Retrieve user data here.
        //Refer to https://next-auth.js.org/configuration/providers/credentials
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })
        if (
          credentials?.username === user?.username &&
          credentials?.password === user?.password
        ) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
}
