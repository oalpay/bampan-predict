import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  Box,
  Button,
  Grid,
  Flex,
  useMatchBreakpoints,
  AutoRenewIcon,
  Card,
  Table,
  Th,
  Td,
  Text,
} from '@pancakeswap/uikit'
import { useAppDispatch } from 'state'
import { getRaffleContract } from 'utils/contractHelpers'
import { LeaderboardLoadingState } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import Container from 'components/Layout/Container'
import BigNumber from 'bignumber.js'
import { result } from 'lodash'
import RaffleCard from './RaffleCard'
import RaffleCardWinner from './RaffleCardWinner'
import UserRaffleRound from './UserRaffleRound'
import ExecuteRaffleRoundModal from '../ExecuteRaffleRoundModal'
import DesktopResults from './DesktopResults'
import MobileResults from './MobileResults'

const Results = () => {
  const { isDesktop } = useMatchBreakpoints()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const [roundNo, setRoundNo] = useState(null)
  const [timeLeft, setTimeLeft] = useState(null)
  const [currentRound, setCurrentRound] = useState(null)
  const [users, setUsers] = useState([])
  const [userTicketCount, setUserTicketCount] = useState(0)
  const [winnerData, setWinnerData] = useState(null)
  const [readyForCalculate, setReadyForCalculate] = useState(false)
  const [roundCalculated, setRoundCalculated] = useState(0)

  const handleRaffleRoundCalculated = () => {
    setRoundCalculated(roundCalculated + 1)
  }

  useEffect(() => {
    const contract = getRaffleContract()

    async function fetchData() {
      try {
        console.log('cem fetchin')
        const no = await contract.currentRound()
        const round = await contract.rounds(no)
        setRoundNo(no)
        setCurrentRound(round)

        const roundDuration = await contract.minRoundDuration()
        const time = Number(round.startTimestamp) + Number(roundDuration) - Math.round(Date.now() / 1000)
        if (time < 0) setTimeLeft('Waiting to calculate')
        else setTimeLeft(time.toString())

        if (time < -1800) setReadyForCalculate(true)

        try {
          const api = await fetch(
            `https://eiwr4ydh0o1u.usemoralis.com:2053/server/functions/roundTickets?_ApplicationId=kER2QPwy25iYZJVH3AIFiBOsuJl5UNPFSjPc8hKp&round=${no}`,
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
  }, [roundCalculated])

  useEffect(() => {
    async function fetchData() {
      try {
        const api = await fetch(
          `https://eiwr4ydh0o1u.usemoralis.com:2053/server/functions/userRoundTickets?_ApplicationId=kER2QPwy25iYZJVH3AIFiBOsuJl5UNPFSjPc8hKp&round=${roundNo}&user=${account}`,
        )
        const data = await api.json()
        if (data.result[0] && data.result[0].totalTicket) setUserTicketCount(data.result[0].totalTicket)
        return true
      } catch (err) {
        return false
      }
    }

    if (account && roundNo > 0) fetchData()
  }, [account, roundNo, roundCalculated])

  useEffect(() => {
    const contract = getRaffleContract()

    async function fetchData() {
      try {
        const round = await contract.rounds(roundNo - 1)
        setWinnerData({ amount: round.amount, address: round.winner })

        return true
      } catch {
        return null
      }
    }
    fetchData()
  }, [roundNo])

  return (
    <Box>
      <Container mb="16px">
        <Grid
          gridGap={['16px', null, null, null, null, '24px']}
          gridTemplateColumns={['1fr', null, null, null, null, 'repeat(3, 1fr)']}
        >
          {currentRound && <RaffleCard round={roundNo} time={timeLeft} data={currentRound} />}
          {userTicketCount > 0 && <UserRaffleRound round={roundNo} ticketCount={userTicketCount} />}
          {winnerData && <RaffleCardWinner round={roundNo - 1} data={winnerData} />}
          {account && readyForCalculate && <ExecuteRaffleRoundModal handle={handleRaffleRoundCalculated} />}
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
