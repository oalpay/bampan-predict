import { useEffect, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { fetchCurrentRaffleRound } from 'state/raffle'

const POLL_TIME_IN_SECONDS = 30

const usePollRaffle = () => {
  const timer = useRef<NodeJS.Timeout>(null)
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  useEffect(() => {
    // Clear old timer
    if (timer.current) {
      clearInterval(timer.current)
    }
    timer.current = setInterval(async () => {
      dispatch(fetchCurrentRaffleRound())
    }, POLL_TIME_IN_SECONDS * 1000)

    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [timer, account, dispatch])
}
export default usePollRaffle
