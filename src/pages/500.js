import NextLink from 'next/link'
import {
  Box,
  Heading,
  Flex,
  Text,
  Container,
  Divider,
  Button
} from '@chakra-ui/react'
import AuthLayout from '../layouts/AuthLayout'

const ServerError = () => {
  return (
    <Container h="100vh" align="center">
      <Flex h="inherit" flexDir="column" justify="center">
        <Heading>Server error</Heading>
        <Text>This page isn&apos;t working.</Text>
        <Divider my={6} />
        <Box my={6} align="center">
          <NextLink href="/" passHref>
            <Button>Return to home</Button>
          </NextLink>
        </Box>
      </Flex>
    </Container>
  )
}

ServerError.layout = AuthLayout

export default ServerError
