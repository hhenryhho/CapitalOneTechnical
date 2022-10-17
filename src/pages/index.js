import {
  Container,
  Flex,
  Grid,
  GridItem,
  ScaleFade,
  Text
} from '@chakra-ui/react'

// React hooks
import { useEffect, useState } from 'react'

// Custom components
import UserLayout from '../layouts/UserLayout'
import DeleteTransaction from '../components/Modal/DeleteTransaction'
import CreateTransaction from '../components/Modal/CreateTransaction'

// Firebase setup
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../firebase-config'

// Custom logic
import { calculateMaxPoints } from '../util/calculateMaxPoints'
import { formatTransactions } from '../util/formatTransactions'
import { rules } from '../constants/rules'

export default function Home() {
  const [transactions, setTransactions] = useState({})
  const [activeRules, setActiveRules] = useState([])
  const [maxPoints, setMaxPoints] = useState(0)

  // Set up listener for new transactions, and sets up rules
  useEffect(() => {
    const uid = auth.currentUser.uid
    const transactionQuery = query(
      collection(db, 'transactions'),
      where('UID', '==', uid)
    )

    // Set up rules
    setActiveRules(rules)

    const unsub = onSnapshot(transactionQuery, snapshot => {
      let transactionsArray = []
      snapshot.docs.forEach(doc => {
        transactionsArray.push({ ...doc.data(), id: doc.id })
      })
      const newTransactions = formatTransactions(transactionsArray)
      setTransactions(newTransactions)
    })
    // Unsubscribe from listener on unmount
    return () => unsub()
  }, [])

  // Calculates max points whenever transactions change
  useEffect(() => {
    setMaxPoints(calculateMaxPoints(transactions, rules))
  }, [transactions])

  return (
    <Container maxWidth="container.xl" pt="50px">
      <Grid
        templateColumns={{ md: '1fr', lg: '1.8fr 1fr' }}
        templateRows={{ md: '1fr auto', lg: '1fr' }}
        gap="36px"
        h="inherit">
        {/* Left Column */}
        <Flex flexDir="column" h="inherit" w="100%">
          <Flex
            id="summary"
            justify="center"
            p="30px"
            bg="white"
            boxShadow="0 8px 6px -7px hsl(0deg 0% 54% / 50%)"
            mb="50px">
            <Flex
              align="center"
              flexDir={['column', 'column', 'column', 'row']}>
              <Text variant="title" textAlign="center">
                You can redeem{' '}
              </Text>
              <Text
                variant="title"
                textAlign="center"
                color="brand.blueHighlight"
                px="5px">
                {maxPoints}
              </Text>
              <Text variant="title" textAlign="center">
                points from this month&apos;s transactions!
              </Text>
            </Flex>
          </Flex>
          <Flex align="center">
            <Text variant="title">New Transaction:</Text>
            <CreateTransaction />
          </Flex>

          <Flex id="transactions" h="540px" w="inherit">
            <Flex flexDir="column" overflowY="auto" w="inherit">
              {Object.values(transactions).map((transaction, index) => (
                <ScaleFade key={index} initialScale={0.9} in="true">
                  <Flex
                    bg="white"
                    boxShadow="0 8px 6px -7px hsl(0deg 0% 54% / 50%)"
                    p="15px"
                    mb="15px">
                    <Grid templateColumns="repeat(4, 1fr)" w="100%" gap={5}>
                      <GridItem colSpan={1}>
                        <Flex flexDir="column">
                          <Text>Date: {transaction.date}</Text>
                          <Text>Amount: ${transaction.amount_cents / 100}</Text>
                          <Text>Merchant: {transaction.merchant_code}</Text>
                        </Flex>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Flex h="100%" align="center" justify="center">
                          <Text>
                            Points for this transaction:{' '}
                            {calculateMaxPoints([transaction], rules)}
                          </Text>
                        </Flex>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Flex h="100%" align="center" justify="end">
                          <DeleteTransaction id={transaction.id} />
                        </Flex>
                      </GridItem>
                    </Grid>
                  </Flex>
                </ScaleFade>
              ))}
            </Flex>
          </Flex>
        </Flex>
        {/* Right Column */}
        <Flex flexDir="column" h="800px">
          <Text
            w="100%"
            alignSelf="center"
            align="center"
            variant="title"
            p="10px">
            Active Rules
          </Text>
          <Flex flexDir="column" overflowY="auto">
            {activeRules.map((rule, index) => (
              <ScaleFade key={index} initialScale={0.9} in="true">
                <Flex
                  flexDir="column"
                  mb="15px"
                  p="10px"
                  boxShadow="0 8px 6px -7px hsl(0deg 0% 54% / 50%)"
                  bg="white"
                  order="1px">
                  <Text variant="title">Rule {index + 1}</Text>
                  <Text>{rule.pointsAwarded} points for every: </Text>
                  <Flex
                    flexDir={['column', 'column', 'column', 'row']}
                    pl="10px">
                    <Text>
                      ${rule.minSpend.sportcheck} spend at Sport Check
                    </Text>
                    <Text>
                      ${rule.minSpend.tim_hortons} spend at Tim Hortons
                    </Text>
                    <Text>${rule.minSpend.subway} spend at Subway</Text>
                  </Flex>
                </Flex>
              </ScaleFade>
            ))}
          </Flex>
        </Flex>
      </Grid>
    </Container>
  )
}

Home.layout = UserLayout
