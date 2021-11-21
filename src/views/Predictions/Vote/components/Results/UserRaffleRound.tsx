import React from 'react'
import {
  Box,
  Card,
  CardBody,
  CardRibbon,
  Flex,
  LaurelLeftIcon,
  LaurelRightIcon,
  Link,
  Text,
  SubMenu,
  SubMenuItem,
  useModal,
} from '@pancakeswap/uikit'
import { PredictionUser } from 'state/types'
import styled from 'styled-components'
import { getBscScanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import WalletStatsModal from '../WalletStatsModal'
import { NetWinningsRow, Row } from './styles'

interface RaffleCardProps {
  round: number
  ticketCount: number
}

const RotatedLaurelLeftIcon = styled(LaurelLeftIcon)`
  transform: rotate(30deg);
`

const RotatedLaurelRightIcon = styled(LaurelRightIcon)`
  transform: rotate(-30deg);
`

const RaffleCard: React.FC<RaffleCardProps> = ({ round, ticketCount }) => {
  const { t } = useTranslation()

  return (
    <Card ribbon={<CardRibbon variantColor="silver" text={`Round ${round}`} ribbonPosition="left" />}>
      <CardBody p="24px">
        <Flex alignItems="center" justifyContent="center" flexDirection="column" mb="24px">
          <Flex mb="4px">
            <RotatedLaurelLeftIcon color="silver" width="32px" />
            <RotatedLaurelRightIcon color="silver" width="32px" />
          </Flex>
          <Text color="primary" fontWeight="bold" textAlign="center">
            My Tickets:
          </Text>
          <Text color="primary" fontWeight="bold" textAlign="center">
            {`${ticketCount}`}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default RaffleCard
