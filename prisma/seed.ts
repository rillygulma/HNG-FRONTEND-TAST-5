import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const db = new PrismaClient()

async function seed() {
  const linksData = getLinks()

  for (const linkData of linksData) {
    // Check if the user already exists in the database
    let user = await db.user.findUnique({
      where: { email: linkData.email },
    })

    if (!user) {
      const hashedPassword = await bcrypt.hash(linkData.password, 10)

      user = await db.user.create({
        data: {
          username: linkData.username,
          email: linkData.email,
          password: hashedPassword,
          links: {
            create: linkData.links, // Use the create operator to insert related records
          },
        },
      })
    }
  }
}

seed()

function getLinks() {
  return [
    {
      username: 'Matt',
      email: 'matt.omalley.west@gmail.com',
      password: 'TestPassword04*',
      links: [
        {
          url: 'https://www.linkedin.com/in/matthew-west-342b0965/',
          platform: 'LinkedIn',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'https://github.com/matt-o-west',
          platform: 'Github',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'https://www.frontendmentor.io/profile/matt-o-west',
          platform: 'Frontend Mentor',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  ]
}
