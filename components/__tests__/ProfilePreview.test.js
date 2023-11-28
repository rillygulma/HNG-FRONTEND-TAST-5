import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ProfilePreview from '../ProfilePreview'
import '@testing-library/jest-dom'

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    // Return a dummy image or div for the mock
    return <div>Mocked Image</div>
  },
}))

describe('ProfilePreview Component', () => {
  const mockProfile = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@example.com',
    profileImage: 'http://example.jpg',
    links: [
      { id: 'link1', url: 'http://link1.com', platform: 'Platform1' },
      { id: 'link2', url: 'http://link2.com', platform: 'Platform2' },
    ],
  }

  test('displays profile information and links correctly', async () => {
    render(
      <ProfilePreview
        profile={mockProfile}
        isLoading={false}
        isOverlay={false}
        preview={null}
      />
    )

    // Check for profile information
    expect(screen.getByText(/John Doe/)).toBeInTheDocument()
    expect(screen.getByText(/johndoe@example.com/)).toBeInTheDocument()

    // Check for links
    mockProfile.links.forEach((_, index) => {
      expect(
        screen.getByTestId(`custom-link-block-#${index}`)
      ).toBeInTheDocument()
    })
  })
})
