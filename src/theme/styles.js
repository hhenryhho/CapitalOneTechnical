import { mode } from '@chakra-ui/theme-tools'

export const globalStyles = {
  colors: {
    brand: {
      darkBg: '#0C0B14',
      lightBg: '#F8F8F8',
      blueHighlight: '#0D74Af'
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
