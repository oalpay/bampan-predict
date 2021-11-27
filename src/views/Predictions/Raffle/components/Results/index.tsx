import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Box, Grid } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Container from 'components/Layout/Container'
import { useGetCurrentRaffle, useGetPreviousRaffle, useGetTicketCount, useRaffleCanDrawRound } from 'state/raffle/hooks'
import RaffleCard from './RaffleCard'
import RaffleCardWinner from './RaffleCardWinner'
import UserRaffleRound from './UserRaffleRound'
import ExecuteRaffleRoundModal from '../ExecuteRaffleRoundModal'
import PlayersCard from './PlayersCard'

const Results = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const currentRaffleRound = useGetCurrentRaffle()
  const accountTicketCount = useGetTicketCount(account, currentRaffleRound.round)
  const previousRaffleRound = useGetPreviousRaffle()
  const readyForCalculate = useRaffleCanDrawRound()

  return (
    <Box>
      <Container mb="16px">
        <Grid
          gridGap={['16px', null, null, null, null, '24px']}
          gridTemplateColumns={['1fr', null, null, null, null, 'repeat(3, 1fr)']}
        >
          {currentRaffleRound && <RaffleCard round={currentRaffleRound} />}
          {accountTicketCount > 0 && (
            <UserRaffleRound round={currentRaffleRound.round} ticketCount={accountTicketCount} />
          )}
          {previousRaffleRound && <RaffleCardWinner round={previousRaffleRound} />}
          {account && readyForCalculate && <ExecuteRaffleRoundModal />}
        </Grid>
      </Container>
      <Container mb="24px">{currentRaffleRound && <PlayersCard round={currentRaffleRound} />}</Container>
    </Box>
  )
}

export default Results
