import { Button, Text } from '@chakra-ui/react'

// React hooks
import { useState } from 'react'

// Custom logic
import { deleteTransaction } from '../../util/deleteTransaction'

const DeleteTransaction = id => {
  const [isLoading, setLoading] = useState(false)

  const onSubmitDeleteTransaction = () => {
    setLoading(true)
    try {
      deleteTransaction(id)
    } catch (err) {
      console.log(err)
    } finally {
      console.log('Deleted!')
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        bg="#128029"
        _hover={{ bg: '#0E6621' }}
        mr={3}
        isLoading={isLoading}
        onClick={onSubmitDeleteTransaction}>
        <Text color="white" fontSize="1.25rem">
          Delete
        </Text>
      </Button>
    </>
  )
}

export default DeleteTransaction
