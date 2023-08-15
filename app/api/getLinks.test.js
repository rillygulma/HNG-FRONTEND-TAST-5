import { test } from 'vitest'
import { getUser } from './getLinks'
import { PrismaClient } from '@prisma/client'

test('fetches a user by email and password', async () => {
  const email = 'test@example.com'
  const password = 'password'

  // Mock return value from the database
  const mockUser = {
    id: 1,
    email,
    password,
    links: [{ url: 'https://example.com', platform: 'LinkedIn' }],
  }

  // You may need to handle database mocking differently here, depending on your setup
  const prisma = new PrismaClient()

  // Mock the database function
  prisma.user.findUnique.mockResolvedValue(mockUser)

  // Check the return value
  assert.equal(user, mockUser, 'User was not retrieved correctly')
})
