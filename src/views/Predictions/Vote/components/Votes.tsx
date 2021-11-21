import React, { useState } from 'react'
import {
  AutoRenewIcon,
  Card,
  CardHeader,
  ChevronDownIcon,
  Flex,
  Heading,
  Button,
  ChevronUpIcon,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import orderBy from 'lodash/orderBy'
import { useTranslation } from 'contexts/Localization'
import VotesLoading from './VotesLoading'
import VoteRow from './VoteRow'

const VOTES_PER_VIEW = 20

interface Vote {
  id: string
  voter: string
  proposal: string
  tx: string
}

interface VotesProps {
  votes: Vote[]
}

const Votes: React.FC<VotesProps> = ({ votes }) => {
  const [showAll, setShowAll] = useState(false)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const orderedVotes = orderBy(votes, ['desc', 'desc'])
  const displayVotes = showAll ? orderedVotes : orderedVotes.slice(0, VOTES_PER_VIEW)

  const handleClick = () => {
    setShowAll(!showAll)
  }

  return (
    <Card style={{ width: '40%' }} mr="10px">
      <CardHeader>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading as="h3" scale="md">
            {t('Votes (%count%)', { count: votes.length.toLocaleString() })}
          </Heading>
        </Flex>
      </CardHeader>
      {displayVotes.length > 0 && (
        <>
          {displayVotes.map((vote) => {
            const isVoter = account && vote.voter.toLowerCase() === account.toLowerCase()
            return <VoteRow key={vote.id} vote={vote} isVoter={isVoter} />
          })}
          <Flex alignItems="center" justifyContent="center" py="8px" px="24px">
            <Button
              width="100%"
              onClick={handleClick}
              variant="text"
              endIcon={
                showAll ? (
                  <ChevronUpIcon color="primary" width="21px" />
                ) : (
                  <ChevronDownIcon color="primary" width="21px" />
                )
              }
            >
              {showAll ? t('Hide') : t('See All')}
            </Button>
          </Flex>
        </>
      )}

      {displayVotes.length === 0 && (
        <Flex alignItems="center" justifyContent="center" py="32px">
          <Heading as="h5">{t('No votes found')}</Heading>
        </Flex>
      )}
    </Card>
  )
}

export default Votes
