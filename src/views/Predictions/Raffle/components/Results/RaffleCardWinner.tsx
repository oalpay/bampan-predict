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
  data: any
}

const RotatedLaurelLeftIcon = styled(LaurelLeftIcon)`
  transform: rotate(30deg);
`

const RotatedLaurelRightIcon = styled(LaurelRightIcon)`
  transform: rotate(-30deg);
`

const RaffleCard: React.FC<RaffleCardProps> = ({ round, data }) => {
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
            {`${data.address}`}
          </Text>
        </Flex>
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
