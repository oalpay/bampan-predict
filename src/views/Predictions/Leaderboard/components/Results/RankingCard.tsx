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
import { PredictionPlayer, PredictionUser } from 'state/types'
import styled from 'styled-components'
import { getBscScanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import WalletStatsModal from '../WalletStatsModal'
import { NetWinningsRow, Row } from './styles'
import TextEllipsis from '../../../Vote/components/TextEllipsis'

interface RankingCardProps {
  rank: 1 | 2 | 3
  user: PredictionPlayer
}

const RotatedLaurelLeftIcon = styled(LaurelLeftIcon)`
  transform: rotate(30deg);
`

const RotatedLaurelRightIcon = styled(LaurelRightIcon)`
  transform: rotate(-30deg);
`

const getRankingColor = (rank: number) => {
  if (rank === 3) {
    return 'bronze'
  }

  if (rank === 2) {
    return 'silver'
  }

  return 'gold'
}

const RankingCard: React.FC<RankingCardProps> = ({ rank, user }) => {
  const { t } = useTranslation()
  const rankColor = getRankingColor(rank)

  return (
    <Card ribbon={<CardRibbon variantColor={rankColor} text={`#${rank}`} ribbonPosition="left" />}>
      <CardBody p="24px">
        <Flex alignItems="center" justifyContent="center" flexDirection="column" mb="8px">
          <SubMenu
            component={
              <>
                <Flex>
                  <Box mb="46px" width={['40px', null, null, '64px']} height={['40px', null, null, '64px']}>
                    <TextEllipsis width="220px" title={user.objectId}>
                      ${user.objectId}
                    </TextEllipsis>
                  </Box>
                  <RotatedLaurelLeftIcon color={rankColor} width="32px" />
                  <RotatedLaurelRightIcon color={rankColor} width="32px" />
                </Flex>
              </>
            }
            options={{ placement: 'bottom' }}
          >
            <SubMenuItem as={Link} bold={false} color="text" external>
              {t('View on BscScan')}
            </SubMenuItem>
          </SubMenu>
        </Flex>
        <Row mb="4px">
          <Text fontSize="12px" color="textSubtle">
            {t('Win Rate')}
          </Text>
          <Text fontWeight="bold">
            {`${((100 * user.won) / user.roundsPlayed).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}%`}
          </Text>
        </Row>
        <NetWinningsRow amount={Number(user.totalAmountWon)} />
        <Row>
          <Text fontSize="12px" color="textSubtle">
            {t('Rounds Won')}
          </Text>
          <Text fontWeight="bold">{`${user.won}`}</Text>
        </Row>
      </CardBody>
    </Card>
  )
}

export default RankingCard
