import { useSelector } from 'react-redux'
import { State } from 'state/types'

export const useGetRaffle = () => {
  const raffle = useSelector((state: State) => state.raffles.rafflesData)
  return raffle
}
