import Head from 'next/head'
import { Flex, Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar/Navbar'

/**
 * This component wraps the main _app.js file with components that should be applied
 * to every page, such as the navbar and footer
 */
const UserLayout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Credit Card Rewards Calculator" />
        <meta name="author" content="Credit Card Rewards Calculator" />
        <link rel="icon" href="small-logo.png" />
        <meta name="author" content="Capital One" />
        <title>C1 Rewards</title>
      </Head>
      <Flex h="100vh" w="100vw">
        <Flex flexDir="column" w="100%">
          <Box h="5%">
            <Navbar />
          </Box>
          <Box h="95%" overflowX="hidden" overflowY="auto">
            {children}
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default UserLayout
