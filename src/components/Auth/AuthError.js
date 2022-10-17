import { RiErrorWarningFill } from 'react-icons/ri'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth'

const AuthError = () => {
  const { authError } = useAuth()

  return (
    <Flex align="center">
      <RiErrorWarningFill />
      <Text ml="5px">{authError}</Text>
    </Flex>
  )
}

export default AuthError
