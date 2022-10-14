import {
  Flex,
  Text,
  Avatar,
  Icon,
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
    <Flex h="100px" py="20px" px="20px" align="center" justifyContent="end">
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
              name={user?.name}
              src={user?.image}
              size="sm"
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
  )
}

export default Navbar
