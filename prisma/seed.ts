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
          description: 'Fullstack tutorial for GraphQL',
          url: 'www.howtographql.com',
          platform: 'LinkedIn',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'Prisma turns your database into a GraphQL API',
          url: 'www.prismagraphql.com',
          platform: 'Youtube',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'The best GraphQL client',
          url: 'www.apollographql.com/docs/react/',
          platform: 'Frontend Mentor',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    // You can add more users and links here
  ]
}
