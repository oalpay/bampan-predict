import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAddress } from 'utils/addressHelpers'
import addresses from 'config/constants/contracts'
import RaffleAbi from 'config/abi/raffle.json'
import { BigNumber, ethers } from 'ethers'
import { getContract } from 'utils/contractHelpers'
import { multicallv2 } from 'utils/multicall'
import { RaffleRoundData, RafflesData, RafflesState } from './types'

const getRaffleAddress = () => {
  return getAddress(addresses.raffle)
}

const getRaffleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(RaffleAbi, getRaffleAddress(), signer)
}

const getRafflesRoundData = async (epochs: number[]): Promise<RaffleRoundData[]> => {
  const address = getRaffleAddress()
  const rounds = epochs.map((epoch) => ({
    address,
    name: 'rounds',
    params: [epoch],
  }))
  const response = await multicallv2(RaffleAbi, rounds)
  const roundsResponse: RaffleRoundData[] = epochs.map((value, index) => ({
    round: BigNumber.from(value),
    amount: response[index].amount,
    ticketCount: response[index].ticketCount,
    startTimestamp: response[index].startTimestamp,
    endTimestamp: response[index].endTimestamp,
  }))
  return roundsResponse
}

const getRafflesData = async (): Promise<RafflesData> => {
  const contract = getRaffleContract()
  const currentRound = await contract.currentRound()
  return {
    currentRound,
  }
}

export const fetchRaffles = createAsyncThunk<RafflesData>('raffles/fetch', async () => {
  // Static values
  const rafflesData = await getRafflesData()
  return rafflesData
})

const initialState: RafflesState = {
  isLoading: false,
}

export const rafflesSlice = createSlice({
  name: 'raffles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Leaderboard filter
    builder.addCase(fetchRaffles.fulfilled, (state, action) => {
      state.rafflesData = action.payload
    })
  },
})

export default rafflesSlice.reducer
