import { extendTheme } from '@chakra-ui/react'
import { globalStyles } from './styles'

// Foundation styles
import { fonts } from './foundations/fonts'
import { breakpoints } from './foundations/breakpoints'
import { config } from './foundations/config'

// Component styles
import { tabStyles } from './components/TabStyles'
import { linkStyles } from './components/LinkStyles'
import { textStyles } from './components/TextStyles'

export const theme = extendTheme(
  { breakpoints },
  globalStyles,
  { fonts },
  { config },
  tabStyles,
  linkStyles,
  textStyles
)
