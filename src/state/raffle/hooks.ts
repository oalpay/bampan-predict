import { orderBy } from 'lodash'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import useCountdown from 'views/Predictions/hooks/useCountdown'

export const useGetCurrentRaffleRound = () => {
  const raffle = useSelector((state: State) => state.raffles.raffleData && state.raffles.raffleData.currentRound)
  return raffle
}

export const useGetCurrentRaffle = () => {
  const raffle = useSelector(
    (state: State) =>
      state.raffles.raffleData &&
      state.raffles.rounds[state.raffles.raffleData.currentRound] &&
      state.raffles.rounds[state.raffles.raffleData.currentRound].data,
  )
  return raffle
}
export const useGetPreviousRaffle = () => {
  const raffle = useSelector(
    (state: State) =>
      state.raffles.raffleData &&
      state.raffles.rounds[state.raffles.raffleData.currentRound - 1] &&
      state.raffles.rounds[state.raffles.raffleData.currentRound - 1].data,
  )
  return raffle
}

export const useGetTicketCount = (account: string, round: number) => {
  const raffle = useSelector(
    (state: State) =>
      state.raffles.rounds[round] &&
      state.raffles.rounds[round].players &&
      state.raffles.rounds[round].players[account] &&
      state.raffles.rounds[round].players[account].totalTicket,
  )
  return raffle
}

export const useGetRaffle = (round) => {
  const raffle = useSelector((state: State) => state.raffles.rounds[round])
  return raffle
}

export const useGetRaffles = () => {
  return useSelector((state: State) => state.raffles.rounds)
}

export const useGetRafflePlayers = (round: number) => {
  return useSelector((state: State) => (state.raffles.rounds[round] && state.raffles.rounds[round].players) || {})
}

export const useGetRafflePlayer = (round: number, account: string) => {
  return useSelector(
    (state: State) => (state.raffles.rounds[round] && state.raffles.rounds[round].players[account]) || {},
  )
}

export const useGetSortedRaffles = () => {
  const raffles = useGetRaffles()
  return orderBy(Object.values(raffles), ['round'], ['asc'])
}

export const useGetRaffleData = () => {
  return useSelector((state: State) => state.raffles.raffleData)
}

export const useRaffleCountdown = () => {
  const raffleData = useGetRaffleData()
  const currentRound = useGetCurrentRaffle()
  return useCountdown(currentRound.startTimestamp + raffleData.raffleDuration)
}

const getNow = () => Math.floor(Date.now() / 1000)

export const useRaffleCanDrawRound = () => {
  const raffleData = useGetRaffleData()
  const currentRound = useGetCurrentRaffle()
  return currentRound.startTimestamp + raffleData.raffleDuration - getNow() < 0
}
