import { mode } from '@chakra-ui/theme-tools'

export const globalStyles = {
  colors: {
    brand: {
      darkBg: '#0C0B14',
      lightBg: '#F9F9FD',
      purpleHighlight: '#DBADFF',
      purpleText: '#CB8EFC'
    }
  },
  styles: {
    global: props => ({
      body: {
        bg: mode('brand.lightBg', 'brand.darkBg')(props)
      }
    })
  }
}
