import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function seed() {
  const linksData = getLinks()

  for (const linkData of linksData) {
    // Check if the user already exists in the database
    let user = await db.user.findUnique({
      where: { email: linkData.email },
    })

    if (!user) {
      user = await db.user.create({
        data: {
          name: linkData.name,
          email: linkData.email,
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
      name: 'Matt',
      email: 'matt.omalley.west@gmail.com',
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
    // You can add more users and links here
  ]
}
