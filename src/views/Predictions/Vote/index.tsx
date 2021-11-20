import React from 'react'
import { Flex } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import Hero from './components/Hero'
import VoteResults from './components/VoteResults'
import Votes from './components/Votes'

interface IVote {
  id: string
  voter: string
  proposal: string
}

const Vote = () => {
  const votes = [
    { id: '0', voter: 'aaa', proposal: 'deneme 1' },
    { id: '1', voter: 'ccc', proposal: 'deneme 2' },
    { id: '2', voter: '0x8bc4652d9f3cE1791FfE4A2D1FeA673c258A250a', proposal: 'deneme 3' },
  ]

  return (
    <>
      <PageMeta />
      <Hero />
      <Flex alignItems="stretch">
        <VoteResults votes={votes} />
        <Votes votes={votes} />
      </Flex>
      <br />
    </>
  )
}

export default Vote
