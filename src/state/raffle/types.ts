import { BigNumber } from 'ethers'

export interface RafflesPlayer {
  totalTicket: number
  address: string
}

export interface RafflePlayersMap {
  [key: string]: RafflesPlayer
}

export interface RaffleRound {
  data?: RaffleRoundData
  players?: RafflePlayersMap
}

export interface RaffleRoundData {
  round: number
  amount: number
  ticketCount: number
  startTimestamp: number
  endTimestamp: number
  winner: string
}

export interface RaffleRoundMap {
  [key: number]: RaffleRound
}

export interface RaffleData {
  currentRound: number
  raffleDuration: number
}

export interface RafflesState {
  rounds: RaffleRoundMap
  raffleData?: RaffleData
}
