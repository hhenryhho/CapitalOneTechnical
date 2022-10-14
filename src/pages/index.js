import { Container, Flex, Grid } from '@chakra-ui/react'
import UserLayout from '../layouts/UserLayout'

export default function Home() {
  return (
    <Container maxWidth="container.xl" h="100%">
      <Grid
        templateColumns={{ md: '1fr', lg: '1.8fr 1fr' }}
        templateRows={{ md: '1fr auto', lg: '1fr' }}
        gap="36px"
        h="inherit">
        {/* Left Column */}
        <Flex flexDir="column" h="inherit" justify="space-between">
          <Flex h="150px" pt="1.5rem">
            Hello
          </Flex>
          <Flex h="150px" pt="1.5rem">
            Hello
          </Flex>
        </Flex>
        {/* Right Column */}
        <Flex flexDir="column" h="inherit" justify="space-between">
          <Flex h="150px" pt="1.5rem">
            Hello
          </Flex>
          <Flex h="150px" pt="1.5rem">
            Hello
          </Flex>
        </Flex>
      </Grid>
    </Container>
  )
}

Home.layout = UserLayout
