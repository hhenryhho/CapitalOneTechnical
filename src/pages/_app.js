import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '../contexts/UserContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/Auth/ProtectedRoute'

// Enable theme and fonts
import { theme } from '../theme/theme'
import Fonts from '../util/activateFonts'

const noAuthRequired = ['/signin', '/signup', '/404']

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const Layout = Component.layout || (children => <>{children}</>)

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <UserProvider>
        <Layout>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </Layout>
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp
