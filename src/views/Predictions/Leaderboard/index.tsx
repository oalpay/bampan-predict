import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { useGetLeaderboardFilters, useGetLeaderboardLoadingState } from 'state/predictions/hooks'
import { LeaderboardLoadingState } from 'state/types'
import { fetchPredictionLeaderboard } from 'state/predictions'
import { PageSpinner } from 'components/Loader/Spinner'
import { PageMeta } from 'components/Layout/Page'
import Results from './components/Results'
import ConnectedWalletResult from './components/Results/ConnectedWalletResult'
import Filters from './components/Filters'

const Leaderboard = () => {
  const leaderboardLoadingState = useGetLeaderboardLoadingState()
  const filters = useGetLeaderboardFilters()
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPredictionLeaderboard())
  }, [account, filters, dispatch])

  if (leaderboardLoadingState === LeaderboardLoadingState.INITIAL) {
    return <PageSpinner />
  }

  return (
    <>
      <PageMeta />
      <Filters />
      <ConnectedWalletResult />
      <Results />
    </>
  )
}

export default Leaderboard
