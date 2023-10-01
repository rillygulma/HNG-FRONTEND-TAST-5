import { PrismaClient } from '@prisma/client'
import CustomLinkBlock from '@/components/CustomLinkBlock'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

export const getLinks = async (db: PrismaClient) => {
  const session = await getServerSession(options)

  const links = await db.link.findMany({
    include: {
      user: true,
    },
  })

  const user = await getUser(db)

  if (user) {
    return links.map((link, index) => {
      return (
        <CustomLinkBlock
          key={link.id + '-' + index}
          index={index}
          link={link.url}
          platform={link.platform}
        />
      )
    })
  }
}

export const getUser = async (db: PrismaClient) => {
  const session = await getServerSession(options)
  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
    include: {
      links: true,
    },
  })

  return user
}
