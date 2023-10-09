import { useEffect, useState } from 'react'

const useTabletDetect = () => {
  const [isTablet, setTablet] = useState(false)

  useEffect(() => {
    const checkTablet = () => {
      // Ensure window is defined (this code is running on the client)
      if (typeof window !== 'undefined') {
        setTablet(window.innerWidth <= 840)
      }
    }

    // Initial check
    checkTablet()

    // Listen for window resize
    window.addEventListener('resize', checkTablet)

    // Cleanup
    return () => window.removeEventListener('resize', checkTablet)
  }, [])

  return isTablet
}

export default useTabletDetect
