import React from 'react'
import { Card, CardBody, Text, Flex, BlockIcon, LinkExternal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { NodeRound, BetPosition } from 'state/types'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'

import ReclaimPositionButton from '../ReclaimPositionButton'
import useIsRefundable from '../../hooks/useIsRefundable'
import { RoundResultBox } from '../RoundResult'
import MultiplierArrow from './MultiplierArrow'
import CardHeader, { getBorderBackground } from './CardHeader'

interface CanceledRoundCardProps {
  round: NodeRound
}
const CardParent = styled.div`
  &::after {
    content: '';
    background: url(/hippo-orange.svg) no-repeat top center;
    width: 98px;
    height: 90px;
    position: absolute;
    left: 50%;
    top: -60px;
    transform: translateX(-50%);
  }
`
const CanceledRoundCard: React.FC<CanceledRoundCardProps> = ({ round }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { isRefundable, setIsRefundable } = useIsRefundable(round.epoch)
  const { epoch } = round

  const handleSuccess = async () => {
    setIsRefundable(false)
  }

  return (
    <CardParent>
      <Card borderBackground={getBorderBackground(theme, 'canceled')}>
        <CardHeader
          status="canceled"
          icon={<BlockIcon mr="4px" width="21px" />}
          title={t('Canceled')}
          epoch={round.epoch}
        />
        <CardBody p="16px">
          <MultiplierArrow isDisabled />
          <RoundResultBox>
            <Flex flexDirection="column" alignItems="center">
              <Text bold color={isRefundable ? 'text' : 'textDisabled'}>
                {t('Round Canceled')}
              </Text>
              {isRefundable && <ReclaimPositionButton epoch={epoch} onSuccess={handleSuccess} width="100%" my="8px" />}
              <LinkExternal href="https://docs.pancakeswap.finance/products/prediction" external>
                {t('Learn More')}
              </LinkExternal>
            </Flex>
          </RoundResultBox>
          <MultiplierArrow betPosition={BetPosition.BEAR} isDisabled />
        </CardBody>
      </Card>
    </CardParent>
  )
}

export default CanceledRoundCard
