import useSWR from 'swr'
import axios from 'axios'

export const useForgotPw = (email: string) => {
  const fetcher = async () => {
    const response = await axios.post('/api/auth/resetPassword', { email })
    return response.data
  }

  const { data, error, isLoading, mutate } = useSWR(
    '/api/resetPassword',
    fetcher
  )

  return {
    data,
    error,
    isLoading,
    resetPassword: mutate,
  }
}
