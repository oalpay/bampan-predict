import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Flex, useMatchBreakpoints, AutoRenewIcon } from '@pancakeswap/uikit'
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
import DesktopResults from './DesktopResults'
import MobileResults from './MobileResults'
import RaffleCard from './RaffleCard'

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
  const [currentRound, setCurrentRound] = useState(null)

  useEffect(() => {
    const contract = getRaffleContract()

    async function fetchData() {
      try {
        const no = await contract.currentRound()
        const round = await contract.rounds(no)
        setRoundNo(no)
        setCurrentRound(round)
        return round
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
          {currentRound && <RaffleCard round={roundNo} data={currentRound} user={first} />}
        </Grid>
      </Container>
      {isDesktop ? <DesktopResults results={rest} /> : <MobileResults results={rest} />}
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
