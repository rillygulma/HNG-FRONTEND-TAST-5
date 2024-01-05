// useProfileData.js
import useSWR from 'swr'
import axios from 'axios'

export const useUser = (url) => {
  const fetcher = async (url) => {
    const response = await axios.get(url)
    return response.data
  }

  const { data, error, isValidating } = useSWR(url, fetcher, {
    revalidateOnMount: true,
  })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
  }
}
