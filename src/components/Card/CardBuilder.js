import { Box, useStyleConfig } from '@chakra-ui/react'
function CardBuilder(props) {
  const { variant, children, ...rest } = props
  const styles = useStyleConfig('CardBuilder', { variant })
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}

export default CardBuilder
