import { PrismaClient } from '@prisma/client'
import CustomLinkBlock from '@/components/CustomLinkBlock'

export const getLinks = async (db: PrismaClient, email: string) => {
  const links = await db.link.findMany({
    include: {
      user: true,
    },
  })

  const user = await getUser(db, email)

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

export const getUser = async (db: PrismaClient, email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    include: {
      links: true,
    },
  })

  return user
}
