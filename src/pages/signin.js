import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text
} from '@chakra-ui/react'

// React hooks
import { useContext } from 'react'

// Next functionality
import NextLink from 'next/link'
import { useRouter } from 'next/router'

// Custom logic
import AuthError from '../components/Auth/AuthError'
import { UserContext } from '../contexts/UserContext'
import AuthLayout from '../layouts/AuthLayout'
import useAuth from '../hooks/useAuth'

// Firebase auth setup
import { auth } from '../firebase-config'
import { onAuthStateChanged } from 'firebase/auth'

const SignIn = () => {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()

  const {
    authError,
    handleSignIn,
    signInEmail,
    setSignInEmail,
    signInPassword,
    setSignInPassword,
    loading
  } = useAuth()

  if (loading) return <p>Loading...</p>

  // If user is already signed in, redirect to home page
  if (user) router.push('/')

  // Sets UserContext user to newly created user
  onAuthStateChanged(auth, currentUser => setUser(currentUser))

  return (
    <Flex align="center" justify="center" w="100%">
      <Flex
        border="1px"
        direction="column"
        w="500px"
        p="48px"
        mt={{ md: '150px', lg: '80px' }}>
        <Text variant="title" mb="10px">
          Welcome Back
        </Text>
        <Text mb="36px">Enter your email and password to sign in</Text>
        <form onSubmit={e => handleSignIn('email', e)}>
          <FormControl isRequired>
            <FormLabel ms="4px">Email</FormLabel>
            <Input
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="email"
              value={signInEmail}
              placeholder="Your email adress"
              size="lg"
              onChange={e => setSignInEmail(e.target.value)}
            />
            <FormLabel ms="4px">Password</FormLabel>
            <Input
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="password"
              value={signInPassword}
              placeholder="Your password"
              size="lg"
              onChange={e => setSignInPassword(e.target.value)}
            />
            {authError && <AuthError />}
            <Button fontSize="10px" type="submit" w="100%" mb="20px" mt="20px">
              <Text>SIGN IN</Text>
            </Button>
          </FormControl>
        </form>
        <Flex flexDirection="column" alignItems="center" mt="0px">
          <Text fontWeight="medium">
            Don&apos;t have an account?
            <NextLink href="/signup" passHref>
              <Link color="brand.purpleText" ms="5px" fontWeight="bold">
                Sign Up
              </Link>
            </NextLink>
          </Text>
          <Text fontWeight="medium">OR</Text>
          <Text fontWeight="medium">
            Continue as{' '}
            <Link
              color="brand.purpleText"
              fontWeight="bold"
              onClick={() => handleSignIn('guest')}>
              guest
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

SignIn.layout = AuthLayout

export default SignIn
