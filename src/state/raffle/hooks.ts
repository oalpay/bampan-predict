import { orderBy } from 'lodash'
import { useSelector } from 'react-redux'
import { State } from 'state/types'

export const useGetCurrentRaffle = () => {
  const raffle = useSelector((state: State) => state.raffles.rounds[state.raffles.raffleData.currentRound])
  return raffle
}

export const useGetRaffle = (round) => {
  const raffle = useSelector((state: State) => state.raffles.rounds[round])
  return raffle
}

export const useGetRaffles = () => {
  return useSelector((state: State) => state.raffles.rounds)
}

export const useGetSortedRaffles = () => {
  const raffles = useGetRaffles()
  return orderBy(Object.values(raffles), ['round'], ['asc'])
}

export const useGetRaffleData = () => {
  return useSelector((state: State) => state.raffles.raffleData)
}
