import React from 'react'
import { Flex, FlexProps, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { BigNumber, utils } from 'ethers'
import { formatUnits } from '@ethersproject/units/src.ts/index'

export const Row: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" {...props}>
      {children}
    </Flex>
  )
}

interface NetWinningsProps extends FlexProps {
  amount: number
  textPrefix?: string
  textColor?: string
}

export const NetWinnings: React.FC<NetWinningsProps> = ({ amount, textPrefix = '', textColor = 'text', ...props }) => {
  const value = 1

  if (!amount) {
    return null
  }

  return (
    <Flex flexDirection="column" alignItems="flex-end" {...props}>
      <Text fontWeight="bold" color={textColor}>
        {`${textPrefix}${utils.formatUnits(amount / 100, 16)}`}
      </Text>
      <Text fontSize="12px" color="textSubtle" lineHeight={1}>
        {`~$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      </Text>
    </Flex>
  )
}

export const NetWinningsRow: React.FC<{ amount: number }> = ({ amount }) => {
  const { t } = useTranslation()

  return (
    <Row mb="4px">
      <Text fontSize="12px" color="textSubtle">
        {t('Net Winnings (MATIC)')}
      </Text>
      <NetWinnings amount={amount} textPrefix={amount > 0 ? '+' : ''} textColor={amount > 0 ? 'success' : 'failure'} />
    </Row>
  )
}
