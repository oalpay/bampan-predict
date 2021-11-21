import React, { useEffect, useState } from 'react'
import { usePredictionsContract } from 'hooks/useContract'
import { Flex } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import Hero from './components/Hero'
import VoteResults from './components/VoteResults'
import Votes from './components/Votes'

interface IVote {
  id: string
  voter: string
  proposal: string
  tx: string
}

const Vote = () => {
  const predictionsContract = usePredictionsContract()
  const [votes, setVotes] = useState([])

  useEffect(() => {
    async function fetchData() {
      if (predictionsContract) {
        try {
          const no = await predictionsContract.currentOracleVoteRound()
          try {
            const api = await fetch(
              `https://eiwr4ydh0o1u.usemoralis.com:2053/server/functions/oracleUserVotes?_ApplicationId=kER2QPwy25iYZJVH3AIFiBOsuJl5UNPFSjPc8hKp&round=${no}`,
            )
            const data = await api.json()
            const results = data.result.reduce((acc, cur) => {
              const obj = acc
              obj.push({
                id: cur.objectId,
                voter: cur.sender,
                proposal: cur.oracle,
                tx: cur.transaction_hash,
              })
              return obj
            }, [])
            setVotes(results)
          } catch (err) {
            console.log(err)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [predictionsContract])

  // const votes = [
  //   { id: '0', voter: 'aaa', proposal: 'deneme 1' },
  //   { id: '1', voter: 'ccc', proposal: 'deneme 2' },
  //   { id: '2', voter: '0x8bc4652d9f3cE1791FfE4A2D1FeA673c258A250a', proposal: 'deneme 3' },
  // ]

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
