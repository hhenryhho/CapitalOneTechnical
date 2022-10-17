import { Box, Container, Text, Flex, Grid, GridItem } from '@chakra-ui/react'

import UserLayout from '../layouts/UserLayout'
import { calculateMaxPoints } from '../util/calculateMaxPoints'
import { rules } from '../constants/rules'
import CreateTransaction from '../components/Modal/CreateTransaction'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import { formatTransactions } from '../util/formatTransactions'
import DeleteTransaction from '../components/Modal/DeleteTransaction'

export default function Home() {
  const [transactions, setTransactions] = useState({})
  const [activeRules, setActiveRules] = useState([])
  const [maxPoints, setMaxPoints] = useState(0)

  useEffect(() => {
    const uid = auth.currentUser.uid
    const transactionQuery = query(
      collection(db, 'transactions'),
      where('UID', '==', uid)
    )

    setActiveRules(rules)

    const unsub = onSnapshot(transactionQuery, snapshot => {
      let transactionsArray = []
      snapshot.docs.forEach(doc => {
        transactionsArray.push({ ...doc.data(), id: doc.id })
      })
      const newTransactions = formatTransactions(transactionsArray)
      setTransactions(newTransactions)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    setMaxPoints(calculateMaxPoints(transactions, rules))
  }, [transactions])

  return (
    <Container maxWidth="container.xl" pt="60px">
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
            border="1px"
            borderRadius="15px"
            mb="50px">
            <Flex
              align="center"
              flexDir={['column', 'column', 'column', 'row']}>
              <Text variant="title">You can redeem </Text>
              <Text variant="title" color="blue" px="5px">
                {maxPoints}
              </Text>
              <Text variant="title">
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
                <Flex
                  key={index}
                  borderRadius="15px"
                  p="15px"
                  border="1px"
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
              ))}
            </Flex>
          </Flex>
        </Flex>
        {/* Right Column */}
        <Flex flexDir="column" h="800px" border="1px">
          <Text alignSelf="center" variant="title" p="10px">
            Active Rules
          </Text>
          <Flex flexDir="column" overflowY="auto">
            {activeRules.map((rule, index) => (
              <Flex key={index} flexDir="column" p="10px" order="1px">
                <Text variant="title">Rule {index + 1}</Text>
                <Text>{rule.pointsAwarded} points for every: </Text>
                <Flex flexDir={['column', 'column', 'column', 'row']} pl="10px">
                  <Text variant="sub-text">
                    ${rule.minSpend.sportcheck} spend at Sport Check
                  </Text>
                  <Text variant="sub-text">
                    ${rule.minSpend.tim_hortons} spend at Tim Hortons
                  </Text>
                  <Text variant="sub-text">
                    ${rule.minSpend.subway} spend at Subway
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Grid>
    </Container>
  )
}

Home.layout = UserLayout
