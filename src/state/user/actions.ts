import { createAction } from '@reduxjs/toolkit'

export const updateUserDeadline = createAction<{ userDeadline: number }>('user/updateUserDeadline')
export const muteAudio = createAction<void>('user/muteAudio')
export const unmuteAudio = createAction<void>('user/unmuteAudio')
export const toggleTheme = createAction<void>('user/toggleTheme')

export const updateUserPredictionAcceptedRisk = createAction<{ userAcceptedRisk: boolean }>(
  'user/updateUserPredictionAcceptedRisk',
)
export const updateUserPredictionChartDisclaimerShow = createAction<{ userShowDisclaimer: boolean }>(
  'user/updateUserPredictionChartDisclaimerShow',
)
export const updateGasPrice = createAction<{ gasPrice: string }>('user/updateGasPrice')
