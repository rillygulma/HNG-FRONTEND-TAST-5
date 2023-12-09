// Assuming you have set up Jest and React Testing Library
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Register from '../(site)/register/page'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Register Route', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    })
  })

  it('should render the register form', () => {
    const { getByPlaceholderText, getByText } = render(<Register />)

    expect(
      screen.getByPlaceholderText('Enter your username')
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  // Assuming you have set up a way to mock the network requests
  it('should submit the register form', async () => {
    const mockSubmit = jest.fn() // Mock the function that handles form submission
    // Replace the actual submit function with mockSubmit in your component

    const { getByText, getByPlaceholderText } = render(<Register />)
    fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
      target: { value: 'newuser' },
    })
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'newuser@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'Password123!' },
    })
    fireEvent.click(screen.getByText('Register'))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'Password123!',
      })
    })
  })
})
