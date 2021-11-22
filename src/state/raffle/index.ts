import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAddress } from 'utils/addressHelpers'
import addresses from 'config/constants/contracts'
import RaffleAbi from 'config/abi/raffle.json'
import { getContract } from 'utils/contractHelpers'
import { BigNumber, ethers } from 'ethers'
import { RaffleData, RafflePlayersMap, RaffleRoundData, RafflesPlayer, RafflesState } from './types'

const getRaffleAddress = () => {
  return getAddress(addresses.raffle)
}

const getRaffleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(RaffleAbi, getRaffleAddress(), signer)
}

const getRafflesRoundData = async (roundNo: number): Promise<RaffleRoundData> => {
  const contract = getRaffleContract()
  const currentRound = await contract.rounds(roundNo)
  return {
    amount: currentRound.amount.toNumber(),
    round: roundNo,
    ticketCount: currentRound.ticketCount.toNumber(),
    startTimestamp: currentRound.startTimestamp.toNumber(),
    endTimestamp: currentRound.endTimestamp.toNumber(),
    winner: currentRound.winner.toString(),
  }
}

const getRaffleData = async (): Promise<RaffleData> => {
  const contract = getRaffleContract()
  const currentRound: BigNumber = await contract.currentRound()
  const raffleDuration: BigNumber = await contract.minRoundDuration()
  return {
    currentRound: currentRound.toNumber(),
    raffleDuration: raffleDuration.toNumber(),
  }
}

const getRafflePlayers = async (round: number): Promise<RafflePlayersMap> => {
  const api = await fetch(
    `https://eiwr4ydh0o1u.usemoralis.com:2053/server/functions/roundTickets?_ApplicationId=kER2QPwy25iYZJVH3AIFiBOsuJl5UNPFSjPc8hKp&round=${round}`,
  )
  const data = await api.json()
  const response: RafflePlayersMap = data.result.reduce(
    (players, player) => ({
      ...players,
      [player.objectId]: { totalTicket: player.totalTicket, address: player.objectId },
    }),
    {},
  )
  return response
}

export const fetchCurrentRaffleRound = createAsyncThunk<{ raffle: RaffleData; round: RaffleRoundData }>(
  'raffles/fetchCurrentRaffleRound',
  async () => {
    // Static values
    const raffle = await getRaffleData()
    const round = await getRafflesRoundData(raffle.currentRound)
    return { raffle, round }
  },
)

export const fetchRaffleRound = createAsyncThunk<RaffleRoundData, number>(
  'raffles/fetchRaffleRound',
  async (roundNo) => {
    // Static values
    const round = await getRafflesRoundData(roundNo)
    return round
  },
)

export const fetchPlayers = createAsyncThunk<{ round: number; players: RafflePlayersMap }, number>(
  'raffles/fetchPlayers',
  async (round) => {
    const players = await getRafflePlayers(round)
    return { round, players }
  },
)

const initialState: RafflesState = {
  rounds: {},
}

export const rafflesSlice = createSlice({
  name: 'raffles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Leaderboard filter
    builder.addCase(fetchCurrentRaffleRound.fulfilled, (state, { payload: { raffle, round } }) => {
      state.raffleData = raffle
      if (state.rounds[raffle.currentRound] === undefined) {
        state.rounds[raffle.currentRound] = {}
      }
      state.rounds[raffle.currentRound].data = round
    })
    builder.addCase(fetchPlayers.fulfilled, (state, { payload: { players, round } }) => {
      state.rounds[round].players = players
    })
  },
})

export default rafflesSlice.reducer
