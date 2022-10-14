import { mode } from '@chakra-ui/theme-tools'

export const tabStyles = {
  components: {
    Tabs: {
      baseStyle: props => ({
        fontSize: 'sm',
        tab: {
          _selected: {
            color: mode('black', 'white')(props),
            borderBottom: '1px',
            borderColor: 'brand.purpleText',
            pb: '1rem'
          },
          color: 'gray.400'
        }
      })
    }
  }
}
