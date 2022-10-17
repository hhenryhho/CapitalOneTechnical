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
  MenuItem,
  useColorMode
} from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { WiMoonAltFirstQuarter } from 'react-icons/wi'
import { FiChevronDown, FiLogOut } from 'react-icons/fi'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user } = useContext(UserContext)
  const { signout } = useAuth()

  return (
    <Flex
      h="100px"
      px="20px"
      backdropFilter="blur(8px)"
      align="center"
      justifyContent="space-between">
      <Image
        h="100px"
        pl={[50, 100]}
        src="large-logo.png"
        alt="Capital One Logo"></Image>
      <Flex align="center">
        <IconButton
          onClick={toggleColorMode}
          bg="transparent"
          _active={{
            bg: 'transparent'
          }}
          _hover={{
            bg: 'transparent'
          }}
          icon={<WiMoonAltFirstQuarter />}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </IconButton>

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
