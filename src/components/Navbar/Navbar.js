import {
  Flex,
  Text,
  Avatar,
  Icon,
  Image,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { FiChevronDown, FiLogOut } from 'react-icons/fi'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const { user } = useContext(UserContext)
  const { signout } = useAuth()

  return (
    <Flex
      minHeight="68px"
      px="20px"
      bg="white"
      backdropFilter="blur(8px)"
      align="center"
      boxShadow="0 8px 6px -7px hsl(0deg 0% 54% / 50%)"
      justifyContent="space-between">
      <Image
        h="48px"
        pl={[50, 100]}
        src="logo.svg"
        alt="Capital One Logo"></Image>
      <Flex align="center">
        <Menu>
          <MenuButton
            as={Button}
            bg="transparent"
            _active={{
              bg: 'transparent'
            }}
            _hover={{
              bg: 'transparent'
            }}
            rightIcon={<FiChevronDown />}>
            {user ? (
              <Avatar
                name={user?.email || 'Guest'}
                size="md"
                border="10px"
                borderColor="black"
              />
            ) : null}
          </MenuButton>

          <MenuList>
            <MenuItem onClick={() => signout()} px="20px" py="10px">
              <Flex align="center">
                <Icon mr="4" as={FiLogOut} />
                <Text>Signout</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Navbar
