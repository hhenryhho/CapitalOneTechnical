import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      console.log('signed in!')
    } else if (!user) {
      router.push('/signin')
    }
  }, [user])

  if (!user) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
