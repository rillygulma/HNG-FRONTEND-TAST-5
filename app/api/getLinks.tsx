import { PrismaClient } from '@prisma/client'
import CustomLinkBlock from '@/components/CustomLinkBlock'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

export const getLinks = async (db: PrismaClient) => {
  const session = await getServerSession(options)
  const user = await getUser(db)
  console.log(user)

  const links = await db.link.findMany({
    where: {
      userId: user?.id, // Only find links where the userId matches
    },
    include: {
      user: true,
    },
  })

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
