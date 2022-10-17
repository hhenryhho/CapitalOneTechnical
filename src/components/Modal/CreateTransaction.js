import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  IconButton,
  Button,
  useColorModeValue,
  Select
} from '@chakra-ui/react'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { addTransaction } from '../../util/addTransaction'

const CreateTransaction = () => {
  const { user } = useContext(UserContext)
  const { onClose, onOpen, isOpen } = useDisclosure({
    onClose: () => {
      setDate('')
      setAmount('')
      setMerchant('')
      setErrorMessage('')
    }
  })
  const [date, setDate] = useState('')
  const [merchant, setMerchant] = useState('')
  const [amount, setAmount] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setLoading] = useState(false)

  const onSubmitCreateTransaction = () => {
    setLoading(true)
    try {
      addTransaction(user.uid, date, merchant, amount)
      onClose()
    } catch (err) {
      setErrorMessage(err)
    } finally {
      console.log('Added!')
      setLoading(false)
    }
  }

  return (
    <>
      <IconButton
        onClick={onOpen}
        m="10px"
        bg="#128029"
        color="white"
        _hover={{ bg: '#0E6621' }}
        icon={<FiPlus />}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Enter a transaction</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={errorMessage} isRequired>
              <FormLabel>Date</FormLabel>
              <Input
                id="date"
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="date"
                size="lg"
                value={date}
                placeholder="Enter the date of the transaction"
                onChange={e => setDate(e.target.value)}
              />
              <FormLabel>Merchant</FormLabel>
              <Select
                id="merchant"
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                size="lg"
                placeholder="Select a merchant"
                onChange={e => setMerchant(e.target.value)}>
                <option value="sportcheck">Sport Check</option>
                <option value="tim_hortons">Tim Hortons</option>
                <option value="subway">Subway</option>
              </Select>
              <FormLabel>Amount Spent ($)</FormLabel>
              <Input
                id="amount"
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="number"
                min="0.01"
                max="10000"
                step="0.01"
                size="lg"
                value={amount}
                placeholder="Amount in dollars (Ex: 10.24)"
                onChange={e => setAmount(e.target.value)}
              />
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={!date || !merchant || !amount}
              bg="#128029"
              color="white"
              _hover={{ bg: '#0E6621' }}
              mr={3}
              isLoading={isLoading}
              onClick={onSubmitCreateTransaction}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateTransaction
