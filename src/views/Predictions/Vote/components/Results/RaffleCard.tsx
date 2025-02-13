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
import styled from 'styled-components'
import { getBscScanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import WalletStatsModal from '../WalletStatsModal'
import { NetWinningsRow, Row } from './styles'

interface RaffleCardProps {
  round: number
  data: any
  time: string
}

const RotatedLaurelLeftIcon = styled(LaurelLeftIcon)`
  transform: rotate(30deg);
`

const RotatedLaurelRightIcon = styled(LaurelRightIcon)`
  transform: rotate(-30deg);
`

const RaffleCard: React.FC<RaffleCardProps> = ({ round, data, time }) => {
  const { t } = useTranslation()

  return (
    <Card ribbon={<CardRibbon variantColor="bronze" text={`Round ${round}`} ribbonPosition="left" />}>
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
            {`${time}`}
          </Text>
        </Flex>
        <Row mb="4px">
          <Text fontSize="12px" color="textSubtle">
            {t('Total Tickets')}
          </Text>
          <Text fontWeight="bold">{`${data.ticketCount}`}</Text>
        </Row>
        <Row mb="4px">
          <Text fontSize="12px" color="textSubtle">
            {t('Total Amount')}
          </Text>
          <Text fontWeight="bold">{`${data.amount}`}</Text>
        </Row>
      </CardBody>
    </Card>
  )
}

export default RaffleCard
