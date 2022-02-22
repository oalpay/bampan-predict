import React from 'react'
import styled from 'styled-components'
import { Link, Route } from 'react-router-dom'
import { Flex, HelpIcon, Button, PrizeIcon } from '@pancakeswap/uikit'
import FlexRow from './FlexRow'
import { PricePairLabel, TimerLabel, RaffleLabel } from './Label'
import PrevNextNav from './PrevNextNav'
import HistoryButton from './HistoryButton'

const SetCol = styled.div`
  flex: none;
  width: auto;
  margin: 0px auto 10px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: initial;
    // width: 270px;
  }
`

const HelpButtonWrapper = styled.div`
  order: 1;
  margin: 0 2px 0 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    order: 2;
    margin: 0 0 0 8px;
  }
`

const TimerLabelWrapper = styled.div`
  order: 3;
  width: 100px;

  ${({ theme }) => theme.mediaQueries.sm} {
    order: 1;
    width: auto;
  }
`

const LeaderboardButtonWrapper = styled.div`
  display: block;

  order: 2;
  margin: 0 8px 0 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    order: 3;
    margin: 0 0 0 8px;
  }
`

const ButtonWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
    margin-left: 8px;
  }
`
const Box = styled.a`
  background: rgb(25 43 75 / 70%);
  display: block;
  margin-left: 8px;
  box-shadow: 0px 8px 2px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  width: 80px;
  height: 80px;
  text-align: center;
  padding-top: 27px;
`
const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const Menu = () => {
  return (
    <FlexDiv>
      <SetCol>
        <PricePairLabel />
      </SetCol>
      <SetCol>
        <RaffleLabel />
      </SetCol>
      {/* <FlexRow justifyContent="center">
        <PrevNextNav />
      </FlexRow> */}
      <SetCol>
        <Flex alignItems="center" justifyContent="flex-end">
          <TimerLabelWrapper>
            <TimerLabel interval="5" unit="m" />
          </TimerLabelWrapper>
          <ButtonWrapper style={{ order: 3}}>
            <HistoryButton />
          </ButtonWrapper>
          <LeaderboardButtonWrapper>
            <Link to="/prediction/leaderboard"><Box><img src="/prize.svg" alt="prize icon"/></Box></Link>
          </LeaderboardButtonWrapper>
          <LeaderboardButtonWrapper>
            <Link to="/prediction/leaderboard"><Box><img src="/chart.svg" alt="chart icon"/></Box></Link>
          </LeaderboardButtonWrapper>
          
        </Flex>
      </SetCol>
    </FlexDiv>
  )
}

export default Menu
