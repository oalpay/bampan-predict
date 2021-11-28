import React, { useEffect } from 'react'
import { PageMeta } from 'components/Layout/Page'
import { fetchCurrentRaffleRound } from 'state/raffle'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { useGetCurrentRaffleRound } from 'state/raffle/hooks'
import { PageSpinner } from 'components/Loader/Spinner'
import Hero from './components/Hero'
import Results from './components/Results'
import usePollRaffle from '../hooks/usePollRaffle'

const Raffle = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const currentRaffleRound = useGetCurrentRaffleRound()
  useEffect(() => {
    dispatch(fetchCurrentRaffleRound())
  }, [account, dispatch])
  usePollRaffle()

  if (!currentRaffleRound) {
    return <PageSpinner />
  }
  return (
    <>
      <PageMeta />
      <Hero />
      <Results />
    </>
  )
}

export default Raffle
