import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext)
  const router = useRouter()

  // If user is not signed in, show nothing
  if (!user) return null

  // If user is not signed in, redirect to signin page
  useEffect(() => {
    if (!user) router.push('/signin')
  }, [user])

  // Finally, if user is signed in, show the page
  return <>{children}</>
}

export default ProtectedRoute
