import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Box, Grid, Card, Table, Th, Td, Text } from '@pancakeswap/uikit'
import { getRaffleContract } from 'utils/contractHelpers'
import { useTranslation } from 'contexts/Localization'
import Container from 'components/Layout/Container'
import { useGetCurrentRaffle, useGetRaffleData } from 'state/raffle/hooks'
import RaffleCard from './RaffleCard'
import RaffleCardWinner from './RaffleCardWinner'
import UserRaffleRound from './UserRaffleRound'
import ExecuteRaffleRoundModal from '../ExecuteRaffleRoundModal'

const Results = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [users, setUsers] = useState([])
  const [userTicketCount, setUserTicketCount] = useState(0)
  const [winnerData, setWinnerData] = useState(null)
  const [readyForCalculate, setReadyForCalculate] = useState(false)
  const [roundCalculated, setRoundCalculated] = useState(0)

  const handleRaffleRoundCalculated = () => {
    setRoundCalculated(roundCalculated + 1)
  }
  const currentRound = useGetCurrentRaffle()
  const raffleData = useGetRaffleData()

  useEffect(() => {
    async function fetchData() {
      try {
        const time =
          Number(currentRound.startTimestamp) + Number(raffleData.raffleDuration) - Math.round(Date.now() / 1000)
        if (time < -1800) setReadyForCalculate(true)

        try {
          const api = await fetch(
            `https://eiwr4ydh0o1u.usemoralis.com:2053/server/functions/roundTickets?_ApplicationId=kER2QPwy25iYZJVH3AIFiBOsuJl5UNPFSjPc8hKp&round=${currentRound.round}`,
          )
          const data = await api.json()
          setUsers(data.result)
        } catch (err) {
          return false
        }

        return true
      } catch {
        return null
      }
    }
    fetchData()
  }, [raffleData, currentRound, roundCalculated])

  useEffect(() => {
    async function fetchData() {
      try {
        const api = await fetch(
          `https://eiwr4ydh0o1u.usemoralis.com:2053/server/functions/userRoundTickets?_ApplicationId=kER2QPwy25iYZJVH3AIFiBOsuJl5UNPFSjPc8hKp&round=${currentRound.round}&user=${account}`,
        )
        const data = await api.json()
        if (data.result[0] && data.result[0].totalTicket) setUserTicketCount(data.result[0].totalTicket)
        return true
      } catch (err) {
        return false
      }
    }

    if (account && currentRound) fetchData()
  }, [account, currentRound, roundCalculated])

  useEffect(() => {
    const contract = getRaffleContract()

    async function fetchData() {
      try {
        const round = await contract.rounds(currentRound.round - 1)
        setWinnerData({ amount: round.amount, address: round.winner })

        return true
      } catch {
        return null
      }
    }
    fetchData()
  }, [currentRound])

  return (
    <Box>
      {account && readyForCalculate && (
        <Container mb="16px">
          <ExecuteRaffleRoundModal handle={handleRaffleRoundCalculated} />
        </Container>
      )}
      <Container mb="16px">
        <Grid
          gridGap={['16px', null, null, null, null, '24px']}
          gridTemplateColumns={['1fr', null, null, null, null, 'repeat(3, 1fr)']}
        >
          {currentRound && <RaffleCard round={currentRound} />}
          {userTicketCount > 0 && <UserRaffleRound round={currentRound.round} ticketCount={userTicketCount} />}
          {winnerData && <RaffleCardWinner round={currentRound.round - 1} data={winnerData} />}
        </Grid>
      </Container>
      <Container mb="24px">
        <Card>
          <Table>
            <thead>
              <tr>
                <Th width="60px">{t('Top 10')}</Th>
                <Th textAlign="center">{t('User')}</Th>
                <Th textAlign="center">{t('Ticket Count')}</Th>
              </tr>
            </thead>
            <tbody>
              {users.map(function (user, i) {
                return (
                  <tr key={user.objectId}>
                    <Td>
                      <Text textAlign="center" fontWeight="bold" color="secondary">{`#${i + 1}`}</Text>
                    </Td>
                    <Td textAlign="center">{user.objectId}</Td>
                    <Td textAlign="center">{user.totalTicket}</Td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Card>
      </Container>
    </Box>
  )
}

export default Results
