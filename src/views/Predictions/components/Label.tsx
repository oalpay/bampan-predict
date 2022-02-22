import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import styled from 'styled-components'
import { BnbUsdtPairTokenIcon, Box, Flex, PocketWatchIcon, Text } from '@pancakeswap/uikit'
import { ROUND_BUFFER } from 'state/predictions/config'
import { formatBigNumberToFixed } from 'utils/formatBalance'
import { useGetCurrentRoundLockTimestamp, useGetLastOraclePrice } from 'state/predictions/hooks'
import { useTranslation } from 'contexts/Localization'
import { useGetCurrentRaffle, useRaffleCountdown } from 'state/raffle/hooks'
import { ImTicket } from 'react-icons/im'
import { formatRaffleTime, formatRoundTime } from '../helpers'
import useCountdown from '../hooks/useCountdown'
import { formatWei } from './History/helpers'

const Token = styled(Box)`
  // margin-top: -24px;
  // position: absolute;
  // top: 50%;
  // z-index: 30;
  dis
  & > svg {
    height: 48px;
    width: 48px;
  }
  display: inline-block;
  ${({ theme }) => theme.mediaQueries.lg} {
    display: inline-block;

    & > svg {
      height: 64px;
      width: 64px;
    }
  }
`

const Title = styled(Text)`
  font-size: 16px;
  line-height: 21px;
  color: #fff;
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */
  display: inline-block;
  // display: flex;
  // align-items: center;
  letter-spacing: -0.015em;
  
  color: #FFFFFF;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
    line-height: 22px;
  }
`

const ClosingTitle = styled(Text)`
  font-size: 9px;
  line-height: 21px;
  color: #fff;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
    line-height: 22px;
  }
`

const Price = styled(Text)`
  display: inline-block;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.015em;
  text-align: left !important;
  color: #fff;
  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: center;
  }
`
const SmallTitle = styled(Text)`
  font-size: 12px;
  height: 18px;
  color: #fff;
`

const Interval = styled(Text)`
  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: center;
    width: 32px;
  }
`

const Label = styled(Flex) <{ dir: 'left' | 'right' }>`
  background-color: rgb(25 43 75 / 70%);
  align-items: ${({ dir }) => (dir === 'right' ? 'flex-end' : 'flex-start')};
  border-radius: ${({ dir }) => (dir === 'right' ? '10px' : '10px')};
  // flex-direction: column;
  overflow: initial;
  padding: 16px 10px;
  color: #fff;
  height: 80px;
  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: center;
    flex-direction: row;
    padding: 10px;
  }
`
const RaffleAd = styled(Flex)`
  flex-direction: column;
`
const Source = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;

  color: #FFFFFF;
`

export const PricePairLabel: React.FC = () => {
  const price = useGetLastOraclePrice()
  const priceAsNumber = parseFloat(formatBigNumberToFixed(price, 3, 8))
  const { countUp, update } = useCountUp({
    start: 0,
    end: priceAsNumber,
    duration: 1,
    decimals: 3,
  })

  const updateRef = useRef(update)

  useEffect(() => {
    updateRef.current(priceAsNumber)
  }, [priceAsNumber, updateRef])

  return (
    <Box width={290} position="relative" display="inline-block">

      <Label dir="left">
        <Token left={0}>
          <img src="/coin.png" alt="logo" width="50px" height="50px" />
          {/* <BnbUsdtPairTokenIcon /> */}
        </Token>
        <Title bold textTransform="uppercase">
          Name <Price fontSize="12px">{`$${countUp}`}</Price>
          <Source>Source: Binance</Source>
        </Title>

      </Label>
    </Box>
  )
}

const RaffleIcon = styled(ImTicket)`
  color: #e7974d;
`
export const RaffleLabel: React.FC = () => {
  const currentRound = useGetCurrentRaffle()
  const { secondsRemaining } = useRaffleCountdown()
  const countdown = formatRaffleTime(secondsRemaining)
  return (
    <Box pl="20px" pr="20px" position="relative" display="inline-block">
      <Label dir="left">
        <Token left={0}>
          <img src="/prize.png" alt="prize" />
          {/* <RaffleIcon /> */}
        </Token>
        <RaffleAd>
          <Price fontSize="12px">{currentRound && `${formatWei(currentRound.amount)} MATIC`}</Price>
          <SmallTitle>Raffle starts in {countdown}</SmallTitle>
        </RaffleAd>
      </Label>
    </Box>
  )
}

interface TimerLabelProps {
  interval: string
  unit: 'm' | 'h' | 'd'
}

const TextTimer = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;

  color: #FFFFFF;
`

export const TimerLabel: React.FC<TimerLabelProps> = ({ interval, unit }) => {
  const currentRoundLockTimestamp = useGetCurrentRoundLockTimestamp()
  const { secondsRemaining } = useCountdown(currentRoundLockTimestamp + ROUND_BUFFER)
  const countdown = formatRoundTime(secondsRemaining)
  const { t } = useTranslation()

  return (
    <Box position="relative">
      <Label dir="right">
        <Token right={0}>
          <img src="/watch.png" alt="watch" />
          {/* <PocketWatchIcon /> */}
        </Token>
        {secondsRemaining !== 0 ? (
          <Title bold color="secondary">
            <TextTimer>Bet your guess in last..</TextTimer>
            {countdown}
          </Title>
        ) : (
          <ClosingTitle bold color="secondary">
            {t('Closing')}
          </ClosingTitle>
        )}
        <Interval fontSize="12px">{`${interval}${t(unit)}`}</Interval>
      </Label>

    </Box>
  )
}
