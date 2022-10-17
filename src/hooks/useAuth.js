import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { useContext, useState } from 'react'

import { UserContext } from '../contexts/UserContext'
import { auth } from '../firebase-config'

const useAuth = () => {
  const { setUser, authError, setAuthError } = useContext(UserContext)
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (signInMethod, e = {}) => {
    try {
      setLoading(true)
      switch (signInMethod) {
        case 'email':
          e.preventDefault()
          await signInWithEmailAndPassword(auth, signInEmail, signInPassword)
          setAuthError('')
          break

        case 'guest':
          await signInAnonymously(auth)
          setAuthError('')
          break

        default:
          return
      }
    } catch (error) {
      setAuthError(error?.code)
      console.error(error?.code)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (signUpMethod, event = {}) => {
    const auth = getAuth()

    try {
      setLoading(true)
      switch (signUpMethod) {
        case 'email':
          event.preventDefault()
          await createUserWithEmailAndPassword(
            auth,
            signUpEmail,
            signUpPassword
          )
          setAuthError('')
          break

        case 'guest':
          await signInAnonymously(auth)
          setAuthError('')
          break

        default:
          return
      }
    } catch (error) {
      setAuthError(error?.code)
      console.error(error?.code)
    } finally {
      setLoading(false)
    }
  }

  const signout = () => signOut(auth)

  onAuthStateChanged(auth, currentUser => setUser(currentUser))

  return {
    signInEmail,
    setSignInEmail,
    signInPassword,
    setSignInPassword,
    signUpEmail,
    setSignUpEmail,
    signUpPassword,
    setSignUpPassword,
    authError,
    setAuthError,
    handleSignIn,
    handleSignUp,
    signout,
    loading
  }
}

export default useAuth
