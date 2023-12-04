// __tests__/Profile.test.js
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Profile from '../../components/Profile'
import axios from 'axios'
import { waitFor } from '@testing-library/dom'

jest.mock('axios', () => ({
  post: jest.fn(),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    // Return a dummy image or div for the mock
    return <div>Mocked Image</div>
  },
}))

describe('Profile Component', () => {
  // Initialize the props with dummy data or empty functions as needed
  const initialProps = {
    profile: {},
    setProfile: jest.fn(),
    preview: {},
    setPreview: jest.fn(),
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('renders and can type into input fields', () => {
    render(<Profile {...initialProps} />)

    // Check if the form fields are rendered
    expect(screen.getByLabelText(/first name*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()

    // Simulate user typing into the first name field
    fireEvent.change(screen.getByLabelText(/first name*/i), {
      target: { value: 'John' },
    })

    // Assert that the first name field has the new value
    expect(screen.getByLabelText(/first name*/i).value).toBe('John')
  })

  test('submits form and sends correct data', async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          user: {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john@example.com',
          },
        },
      })
    )

    render(<Profile {...initialProps} />)
    fireEvent.change(screen.getByLabelText(/first name*/i), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByLabelText(/last name*/i), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    })
    fireEvent.click(screen.getByText(/save/i))

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('/api/profile', {
        profile: expect.objectContaining({
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@example.com',
        }),
      })
    )
  })

  test('displays error message on failed submission', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          errors: [{ errorType: 'EMAIL', error: 'Invalid email.' }],
        },
      },
    })

    render(<Profile {...initialProps} />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    })
    fireEvent.click(screen.getByText(/save/i))

    await waitFor(() => {
      const errorMessage = screen.getByText(/invalid email/i)
      expect(errorMessage).toBeInTheDocument()
    })
  })
})
