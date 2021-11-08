import { createReducer } from '@reduxjs/toolkit'
import { DEFAULT_DEADLINE_FROM_NOW } from '../../config/constants'
import { updateVersion } from '../global/actions'
import {
  muteAudio,
  toggleTheme,
  unmuteAudio,
  updateGasPrice,
  updateUserDeadline,
  updateUserPredictionAcceptedRisk,
  updateUserPredictionChartDisclaimerShow,
} from './actions'
import { GAS_PRICE_GWEI } from './hooks/helpers'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number
  // deadline set by user in minutes, used in all txns
  userDeadline: number
  timestamp: number
  audioPlay: boolean
  isDark: boolean
  userPredictionAcceptedRisk: boolean
  userPredictionChartDisclaimerShow: boolean
  gasPrice: string
}

export const initialState: UserState = {
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  timestamp: currentTimestamp(),
  audioPlay: true,
  isDark: false,
  userPredictionAcceptedRisk: false,
  userPredictionChartDisclaimerShow: true,
  gasPrice: GAS_PRICE_GWEI.default,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateVersion, (state) => {
      // deadline isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (typeof state.userDeadline !== 'number') {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW
      }

      state.lastUpdateVersionTimestamp = currentTimestamp()
    })
    .addCase(updateUserDeadline, (state, action) => {
      state.userDeadline = action.payload.userDeadline
      state.timestamp = currentTimestamp()
    })
    .addCase(muteAudio, (state) => {
      state.audioPlay = false
    })
    .addCase(unmuteAudio, (state) => {
      state.audioPlay = true
    })
    .addCase(toggleTheme, (state) => {
      state.isDark = !state.isDark
    })
    .addCase(updateUserPredictionAcceptedRisk, (state, { payload: { userAcceptedRisk } }) => {
      state.userPredictionAcceptedRisk = userAcceptedRisk
    })
    .addCase(updateUserPredictionChartDisclaimerShow, (state, { payload: { userShowDisclaimer } }) => {
      state.userPredictionChartDisclaimerShow = userShowDisclaimer
    })
    .addCase(updateGasPrice, (state, action) => {
      state.gasPrice = action.payload.gasPrice
    }),
)
