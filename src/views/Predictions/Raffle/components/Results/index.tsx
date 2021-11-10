import React, { useEffect, useState } from 'react'
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
import {
  useGetLeaderboardHasMoreResults,
  useGetLeaderboardLoadingState,
  useGetLeaderboardResults,
  useGetLeaderboardSkip,
} from 'state/predictions/hooks'
import { LeaderboardLoadingState } from 'state/types'
import { filterNextPageLeaderboard } from 'state/predictions'
import { LEADERBOARD_RESULTS_PER_PAGE } from 'state/predictions/helpers'
import { useTranslation } from 'contexts/Localization'
import Container from 'components/Layout/Container'
import { result } from 'lodash'
import RaffleCard from './RaffleCard'
import DesktopResults from './DesktopResults'
import MobileResults from './MobileResults'

const Results = () => {
  const { isDesktop } = useMatchBreakpoints()
  const { t } = useTranslation()
  const [first, second, third, ...rest] = useGetLeaderboardResults()
  const leaderboardLoadingState = useGetLeaderboardLoadingState()
  const isLoading = leaderboardLoadingState === LeaderboardLoadingState.LOADING
  const currentSkip = useGetLeaderboardSkip()
  const hasMoreResults = useGetLeaderboardHasMoreResults()
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(filterNextPageLeaderboard(currentSkip + LEADERBOARD_RESULTS_PER_PAGE))
  }

  const [roundNo, setRoundNo] = useState(null)
  const [timeLeft, setTimeLeft] = useState(null)
  const [currentRound, setCurrentRound] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const contract = getRaffleContract()

    async function fetchData() {
      try {
        const no = await contract.currentRound()
        const round = await contract.rounds(no)
        setRoundNo(no)
        setCurrentRound(round)

        const roundDuration = await contract.minRoundDuration()
        setTimeLeft(Date.now() / 1000 - roundDuration)

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
  }, [])

  return (
    <Box>
      <Container mb="16px">
        <Grid
          gridGap={['16px', null, null, null, null, '24px']}
          gridTemplateColumns={['1fr', null, null, null, null, 'repeat(3, 1fr)']}
        >
          {currentRound && <RaffleCard round={roundNo} time={timeLeft} data={currentRound} user={first} />}
        </Grid>
      </Container>
      <Container mb="24px">
        <Card>
          <Table>
            <thead>
              <tr>
                <Th width="60px">&nbsp;</Th>
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
      <Flex mb="40px" justifyContent="center">
        {hasMoreResults && (
          <Button
            variant="secondary"
            isLoading={isLoading}
            endIcon={isLoading ? <AutoRenewIcon spin color="currentColor" /> : undefined}
            onClick={handleClick}
          >
            {isLoading ? t('Loading...') : t('View More')}
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default Results
