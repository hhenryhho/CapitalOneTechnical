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

const NotFound = () => {
  return (
    <Container h="100vh" align="center">
      <Flex h="inherit" flexDir="column" justify="center">
        <Heading>Not found</Heading>
        <Text>The page you&apos;re looking for was not found.</Text>
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

NotFound.layout = AuthLayout

export default NotFound
