import React from 'react'
import { Card, CardBody, CardRibbon, Flex, LaurelLeftIcon, LaurelRightIcon, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { RaffleRoundData } from 'state/raffle/types'
import { formatRaffleTime } from 'views/Predictions/helpers'
import { useRaffleCountdown } from 'state/raffle/hooks'
import { Row } from './styles'

interface RaffleCardProps {
  round: RaffleRoundData
}

const RotatedLaurelLeftIcon = styled(LaurelLeftIcon)`
  transform: rotate(30deg);
`

const RotatedLaurelRightIcon = styled(LaurelRightIcon)`
  transform: rotate(-30deg);
`

const RaffleCard: React.FC<RaffleCardProps> = ({ round }) => {
  const { t } = useTranslation()
  const { secondsRemaining } = useRaffleCountdown()
  const countdown = formatRaffleTime(secondsRemaining)

  return (
    <Card ribbon={<CardRibbon variantColor="bronze" text={`Round ${round.round}`} ribbonPosition="left" />}>
      <CardBody p="24px">
        <Flex alignItems="center" justifyContent="center" flexDirection="column" mb="24px">
          <Flex mb="4px">
            <RotatedLaurelLeftIcon color="bronze" width="32px" />
            <RotatedLaurelRightIcon color="bronze" width="32px" />
          </Flex>
          <Text color="primary" fontWeight="bold" textAlign="center">
            Time Left:
          </Text>
          <Text color="primary" fontWeight="bold" textAlign="center">
            {`${countdown}`}
          </Text>
        </Flex>
        <Row mb="4px">
          <Text fontSize="12px" color="textSubtle">
            {t('Total Tickets')}
          </Text>
          <Text fontWeight="bold">{`${round.ticketCount}`}</Text>
        </Row>
        <Row mb="4px">
          <Text fontSize="12px" color="textSubtle">
            {t('Total Amount')}
          </Text>
          <Text fontWeight="bold">{`${round.amount}`}</Text>
        </Row>
      </CardBody>
    </Card>
  )
}

export default RaffleCard
