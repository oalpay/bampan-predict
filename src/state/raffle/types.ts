import { BigNumber } from 'ethers'

export interface RaffleRoundData {
  round: BigNumber
  amount: BigNumber
  ticketCount: number
  startTimestamp: number
  endTimestamp: number
}

export interface RaffleRoundMap {
  [key: string]: RaffleRoundData
}

export interface RafflesData {
  currentRound: number
}

export interface RafflesState {
  isLoading: boolean
  rafflesData?: RafflesData
  rounds?: RaffleRoundMap
}
