import React from 'react'
import { LeaderboardLoadingState } from 'state/types'
import PageLoader from 'components/Loader/PageLoader'
import { PageMeta } from 'components/Layout/Page'
import Hero from './components/Hero'
import Results from './components/Results'

const Raffle = () => {
  return (
    <>
      <PageMeta />
      <Hero />
      <Results />
    </>
  )
}

export default Raffle
