import { BigNumber } from 'ethers'

export interface RaffleRoundData {
  round: number
  amount: BigNumber
  ticketCount: number
  startTimestamp: number
  endTimestamp: number
}

export interface RaffleRoundMap {
  [key: string]: RaffleRoundData
}
export interface RaffleData {
  currentRound?: number
  raffleDuration?: number
}
export interface RafflesState {
  rounds?: RaffleRoundMap
  raffleData?: RaffleData
}
