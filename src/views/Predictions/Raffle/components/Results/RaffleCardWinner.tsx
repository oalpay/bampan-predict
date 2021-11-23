import React from 'react'
import { Card, CardBody, CardRibbon, Flex, LaurelLeftIcon, LaurelRightIcon, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { RaffleRoundData } from 'state/raffle/types'
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

  return (
    <Card ribbon={<CardRibbon variantColor="gold" text={`Round ${round}`} ribbonPosition="left" />}>
      <CardBody p="24px">
        <Flex alignItems="center" justifyContent="center" flexDirection="column" mb="24px">
          <Flex mb="4px">
            <RotatedLaurelLeftIcon color="gold" width="32px" />
            <RotatedLaurelRightIcon color="gold" width="32px" />
          </Flex>
          <Text color="primary" fontWeight="bold" textAlign="center">
            Winner:
          </Text>
          <Text color="primary" fontSize="12px" fontWeight="bold" textAlign="center">
            {`${round.winner}`}
          </Text>
        </Flex>
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
