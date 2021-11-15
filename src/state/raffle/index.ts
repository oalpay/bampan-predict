import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAddress } from 'utils/addressHelpers'
import addresses from 'config/constants/contracts'
import RaffleAbi from 'config/abi/raffle.json'
import { getContract } from 'utils/contractHelpers'
import { ethers } from 'ethers'
import { RaffleData, RaffleRoundData, RafflesState } from './types'

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
    amount: currentRound.amount,
    round: roundNo,
    ticketCount: currentRound.ticketCount,
    startTimestamp: currentRound.startTimestamp,
    endTimestamp: currentRound.endTimestamp,
  }
}

const getRaffleData = async (): Promise<RaffleData> => {
  const contract = getRaffleContract()
  const currentRound = await contract.currentRound()
  const raffleDuration = await contract.minRoundDuration()
  return {
    currentRound,
    raffleDuration,
  }
}
/*
const getUserTickets = async (): Promise<RaffleData> => {
    
}
*/
export const initializeRaffle = createAsyncThunk<RafflesState, string>('raffles/initialize', async () => {
  // Static values
  const raffleData = await getRaffleData()
  const rounds = { [raffleData.currentRound]: await getRafflesRoundData(raffleData.currentRound) }

  return {
    raffleData,
    rounds,
  }
})

const initialState: RafflesState = {
  raffleData: {},
  rounds: {},
}

export const rafflesSlice = createSlice({
  name: 'raffles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Leaderboard filter
    builder.addCase(initializeRaffle.fulfilled, (state, action) => {
      state.rounds = action.payload.rounds
      state.raffleData = action.payload.raffleData
    })
  },
})

export default rafflesSlice.reducer
