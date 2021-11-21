import React from 'react'
import { Flex, LinkExternal, Text, Tag, CheckmarkCircleIcon } from '@pancakeswap/uikit'
import truncateHash from 'utils/truncateHash'
import { getBscScanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import TextEllipsis from './TextEllipsis'
import Row, { AddressColumn, ChoiceColumn } from './Row'

interface Vote {
  id: string
  voter: string
  proposal: string
}

interface VoteRowProps {
  vote: Vote
  isVoter: boolean
}

const VoteRow: React.FC<VoteRowProps> = ({ vote, isVoter }) => {
  const { t } = useTranslation()

  return (
    <Row>
      <AddressColumn>
        <Flex alignItems="center">
          <LinkExternal href={getBscScanLink(vote.voter, 'address')}>{truncateHash(vote.voter)}</LinkExternal>
          {isVoter && (
            <Tag variant="success" outline ml="8px">
              <CheckmarkCircleIcon mr="4px" /> {t('Voted')}
            </Tag>
          )}
        </Flex>
      </AddressColumn>
      <ChoiceColumn>
        <TextEllipsis title={vote.proposal}>{vote.proposal}</TextEllipsis>
      </ChoiceColumn>
    </Row>
  )
}

export default VoteRow
