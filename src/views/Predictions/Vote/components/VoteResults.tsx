import React from 'react'
import {
  Box,
  Text,
  Flex,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Progress,
  Skeleton,
  Tag,
  CheckmarkCircleIcon,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import times from 'lodash/times'
import { formatNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import TextEllipsis from './TextEllipsis'

interface Vote {
  id: string
  voter: string
  proposal: string
}

interface VotesProps {
  votes: Vote[]
}

const Results: React.FC<VotesProps> = ({ votes }) => {
  const { t } = useTranslation()
  // const results = calculateVoteResults(votes)

  const { account } = useWeb3React()
  // const totalVotes = getTotalFromVotes(votes)
  const totalVotes = 3

  const choices = [{ title: 'deneme 1' }, { title: 'deneme 2' }, { title: 'deneme 3' }]
  const results = [1, 1, 1]

  return (
    <Card>
      <CardHeader>
        <Heading as="h3" scale="md">
          {t('Current Results')}
        </Heading>
      </CardHeader>
      <CardBody>
        {choices.map((choice, index) => {
          const totalChoiceVote = results[index]
          const progress = (totalChoiceVote / totalVotes) * 100
          const hasVoted = votes.some((vote) => {
            return account && vote.voter.toLowerCase() === account.toLowerCase() && choice.title === vote.proposal
          })

          return (
            <Box key={choices[index].title} mt={index > 0 ? '24px' : '0px'}>
              <Flex alignItems="center" mb="8px">
                <TextEllipsis mb="4px" title={choices[index].title}>
                  {choices[index].title}
                </TextEllipsis>
                {hasVoted && (
                  <Tag variant="success" outline ml="8px">
                    <CheckmarkCircleIcon mr="4px" /> {t('Voted')}
                  </Tag>
                )}
              </Flex>
              <Box mb="4px">
                <Progress primaryStep={progress} scale="sm" />
              </Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Text color="textSubtle">{t('%total% Votes', { total: formatNumber(totalChoiceVote, 0, 2) })}</Text>
                <Text>
                  {progress.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                </Text>
              </Flex>
            </Box>
          )
        })}
      </CardBody>
    </Card>
  )
}

export default Results
