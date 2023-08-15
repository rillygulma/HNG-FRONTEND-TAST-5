import React from 'react'

export const login = async (req, res) => {
  const { email, password } = await req.body

  if (email === '' && password === '') {
    res.status(200).json({ message: 'Logged in successfully' })
  } else {
    res.status(401).json({ message: 'Incorrect email or password' })
  }
}
