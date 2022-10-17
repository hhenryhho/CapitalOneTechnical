import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext)
  const router = useRouter()

  // If user is signed in, redirect to signin page
  useEffect(() => {
    if (!user) router.push('/signin')
  }, [user])

  // If user is not signed in, show nothing
  if (!user) return null

  return <>{children}</>
}

export default ProtectedRoute
