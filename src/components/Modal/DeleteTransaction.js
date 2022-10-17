import { Button } from '@chakra-ui/react'
import { useState } from 'react'
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
        colorScheme="blue"
        mr={3}
        isLoading={isLoading}
        onClick={onSubmitDeleteTransaction}>
        Delete
      </Button>
    </>
  )
}

export default DeleteTransaction
