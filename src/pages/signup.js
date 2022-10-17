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

const SignUp = () => {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()
  const {
    authError,
    handleSignIn,
    signUpEmail,
    setSignUpEmail,
    signUpPassword,
    setSignUpPassword,
    handleSignUp,
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
          Sign up
        </Text>
        <Text mb="36px">Create a new account to get started</Text>
        <form className="SignUpForm" onSubmit={e => handleSignUp('email', e)}>
          <FormControl isRequired>
            <FormLabel ms="4px">Email</FormLabel>
            <Input
              id="email"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="email"
              value={signUpEmail}
              placeholder="Your email adress"
              size="lg"
              onChange={e => setSignUpEmail(e.target.value)}
            />
            <FormLabel ms="4px">Password</FormLabel>
            <Input
              id="password"
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              type="password"
              value={signUpPassword}
              placeholder="Your password"
              size="lg"
              onChange={e => setSignUpPassword(e.target.value)}
            />
            {authError && <AuthError />}
            <Button fontSize="10px" type="submit" w="100%" mb="20px" mt="20px">
              <Text>SIGN UP</Text>
            </Button>
          </FormControl>
        </form>
        <Flex flexDirection="column" alignItems="center" mt="0px">
          <Text fontWeight="medium">
            Already signed up?
            <NextLink href="/signin" passHref>
              <Link color="brand.purpleText" ms="5px" fontWeight="bold">
                Sign In
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

SignUp.layout = AuthLayout

export default SignUp
